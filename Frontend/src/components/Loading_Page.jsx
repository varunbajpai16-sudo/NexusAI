import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { NexusLogo } from "./Nexus_Logo";

// Direct health checks wake the Render services without going through the gateway.
// Keep the API gateway for all normal application requests.
const SERVICES = [
  {
    name: "Auth Service",
    url: "https://nexusai-1-k401.onrender.com/api/auth/health",
  },
  {
    name: "Chat Service",
    url: "https://nexusai-2-xypx.onrender.com/api/chat/health",
  },
  {
    name: "Agent Service",
    url: "https://nexusai-3-7nd7.onrender.com/api/agent/health",
  },
];

const SESSION_LOADER_KEY = "nexusai_loader_completed_v1";
const MAX_WARMUP_TIME = 120000;
const REQUEST_TIMEOUT = 15000;
const RETRY_DELAY = 5000;


const sleep = (ms, signal) =>
  new Promise((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }

    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true }
    );
  });

async function wakeService(service, signal) {
  while (!signal.aborted) {
    try {
      const response = await fetch(service.url, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.any([
          signal,
          AbortSignal.timeout(REQUEST_TIMEOUT),
        ]),
      });

      if (response.ok) {
        return { name: service.name, ready: true };
      }
    } catch {
      // Render free services may need time to wake. Retry below.
    }

    await sleep(RETRY_DELAY, signal);
  }

  return { name: service.name, ready: false };
}

// Share only an in-flight warm-up. Once it finishes, a later mount can
// re-check services instead of reusing stale readiness results.
let servicesWarmupPromise = null;
let loaderCompletedForPage = false;

function hasCompletedLoader() {
  if (loaderCompletedForPage) return true;

  try {
    return sessionStorage.getItem(SESSION_LOADER_KEY) === "true";
  } catch {
    return false;
  }
}

function markLoaderCompleted() {
  loaderCompletedForPage = true;

  try {
    sessionStorage.setItem(SESSION_LOADER_KEY, "true");
  } catch {
    // Storage may be unavailable; the in-memory guard still works.
  }
}

function warmServicesOnce() {
  if (servicesWarmupPromise) return servicesWarmupPromise;

  const controller = new AbortController();
  const maxWaitTimer = setTimeout(
    () => controller.abort(),
    MAX_WARMUP_TIME
  );

  const promise = Promise.all(
    SERVICES.map((service) => wakeService(service, controller.signal))
  ).finally(() => {
    clearTimeout(maxWaitTimer);
    if (servicesWarmupPromise === promise) {
      servicesWarmupPromise = null;
    }
  });

  servicesWarmupPromise = promise;
  return promise;
}

export default function NexusHomeLoader({
  onComplete,
  duration = 5000,
}) {
  const [progress, setProgress] = useState(0);
  // Module-level guard keeps the loader from reappearing if this component
  // is mounted again during the same browser page session.
  const [visible, setVisible] = useState(() => !hasCompletedLoader());
  const [warming, setWarming] = useState(true);
  const [serviceStatus, setServiceStatus] = useState(
    SERVICES.map((service) => ({
      name: service.name,
      ready: false,
    }))
  );

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let active = true;
    let animationFrame;
    let completionTimer;
    const alreadyCompleted = hasCompletedLoader();
    const startedAt = performance.now();
    const minimumDuration = Math.max(0, duration);

    // Keep the visual loader hidden if it already ran this session, but still
    // re-check readiness in the background because a service may have slept.
    if (alreadyCompleted) {
      setVisible(false);
      onCompleteRef.current?.();
      setWarming(true);

      warmServicesOnce()
        .then((results) => {
          if (!active) return;
          setServiceStatus(results);
          setWarming(false);
        })
        .catch((error) => {
          console.error("Nexus service warm-up failed:", error);
          if (!active) return;
          setServiceStatus(
            SERVICES.map((service) => ({
              name: service.name,
              ready: false,
            }))
          );
          setWarming(false);
        });

      return () => {
        active = false;
      };
    }

    const updateProgress = (now) => {
      if (!active) return;

      const elapsed = now - startedAt;
      const value =
        minimumDuration === 0
          ? 1
          : Math.min(elapsed / minimumDuration, 1);
      const eased = 1 - Math.pow(1 - value, 3);

      // Hold at 95% until the bounded service warm-up finishes.
      setProgress(Math.min(Math.round(eased * 95), 95));

      if (value < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    const completeLoader = async (results) => {
      if (!active) return;

      setServiceStatus(results);

      const readyCount = results.filter((service) => service.ready).length;
      if (readyCount !== SERVICES.length) {
        console.warn(
          `Nexus warm-up finished with ${readyCount}/${SERVICES.length} services ready.`,
          results
            .filter((service) => !service.ready)
            .map((service) => service.name)
        );
      }

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minimumDuration - elapsed);

      await sleep(remaining);
      if (!active) return;

      // Do not keep the user on the loading screen indefinitely. Partial
      // readiness is reflected in the status text, and the gateway must still
      // handle later cold starts for requests made during the session.
      setWarming(false);
      setProgress(100);

      completionTimer = setTimeout(() => {
        if (!active) return;

        markLoaderCompleted();
        setVisible(false);
        onCompleteRef.current?.();
      }, 400);
    };

    warmServicesOnce()
      .then(completeLoader)
      .catch((error) => {
        console.error("Nexus service warm-up failed:", error);
        return completeLoader(
          SERVICES.map((service) => ({
            name: service.name,
            ready: false,
          }))
        );
      });

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      clearTimeout(completionTimer);
    };
  }, [duration]);

  if (!visible) return null;

  const readyCount = serviceStatus.filter((service) => service.ready).length;
  const allReady = readyCount === SERVICES.length;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-[#030303]
        text-white
        flex items-center justify-center
        overflow-hidden
      "
      role="status"
      aria-live="polite"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[500px] h-[500px]
            rounded-full
            bg-red-600/[0.055]
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute left-[18%] top-[25%]
            w-[220px] h-[220px]
            rounded-full
            bg-pink-600/[0.025]
            blur-[100px]
          "
        />

        <div
          className="
            absolute right-[15%] bottom-[20%]
            w-[250px] h-[250px]
            rounded-full
            bg-red-500/[0.025]
            blur-[100px]
          "
        />

        {/* Very subtle Nexus grid */}
        <div
          className="
            absolute inset-0 opacity-[0.018]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:64px_64px]
          "
        />
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center px-5">
        {/* Logo */}
        <div className="relative mb-8">
          <div
            className="
              absolute inset-[-28px]
              rounded-[42px]
              bg-red-500/15
              blur-3xl
              animate-pulse
            "
          />

          {/* Orbit ring */}
          <div
            className="
              absolute inset-[-15px]
              rounded-[34px]
              border border-red-500/10
              animate-[spin_7s_linear_infinite]
            "
          >
            <span
              className="
                absolute -top-[3px] left-1/2
                -translate-x-1/2
                w-1.5 h-1.5 rounded-full
                bg-pink-400
                shadow-[0_0_12px_rgba(244,114,182,0.9)]
              "
            />
          </div>

          {/* Logo container */}
          <div
            className="
              relative
              w-24 h-24
              rounded-[30px]
              bg-gradient-to-br
              from-zinc-950
              via-[#090909]
              to-red-950/70
              border border-red-500/30
              flex items-center justify-center
              shadow-[0_0_70px_-15px_rgba(244,63,94,0.9)]
              animate-[loaderFloat_2.4s_ease-in-out_infinite]
            "
          >
            <div
              className="
                absolute inset-2.5
                rounded-[23px]
                bg-gradient-to-br
                from-red-600/15
                to-pink-600/5
              "
            />

            <NexusLogo
              size={54}
              className="
                relative z-10
                text-white
                drop-shadow-[0_0_12px_rgba(244,63,94,0.45)]
              "
            />
          </div>
        </div>

        {/* Brand */}
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Nexus<span className="text-red-500">AI</span>
          </h1>

          <Sparkles
            size={14}
            className="text-pink-400 animate-pulse"
          />
        </div>

        <p className="text-xs text-zinc-600 tracking-[0.16em] uppercase text-center">
          Your AI team is getting ready
        </p>

        {/* Progress */}
        <div className="w-[220px] mt-9">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-zinc-700">
              {warming ? "Waking Nexus services" : "Initialization complete"}
            </span>

            <span className="text-[10px] text-zinc-600 tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="h-[2px] w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="
                h-full rounded-full
                bg-gradient-to-r
                from-red-600
                via-red-500
                to-pink-500
                shadow-[0_0_12px_rgba(244,63,94,0.7)]
                transition-[width] duration-75
              "
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Service connection status */}
        <div className="flex items-center gap-2 mt-5">
          <span className="relative flex h-1.5 w-1.5">
            {warming && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60 animate-ping" />
            )}
            <span
              className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                allReady && !warming ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
          </span>

          <span className="text-[10px] text-zinc-400">
            {warming
              ? `Waking services (${readyCount}/${SERVICES.length} ready)`
              : allReady
                ? "All services responded"
                : `${readyCount}/${SERVICES.length} services ready · Some may need a retry`}
          </span>
        </div>
      </div>

      {/* Bottom brand line */}
      <div className="absolute bottom-7 left-0 right-0 text-center">
        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-800">
          Nexus AI Workspace
        </span>
      </div>

      <style>{`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
}
