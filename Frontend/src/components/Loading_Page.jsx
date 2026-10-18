import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { NexusLogo } from "./Nexus_Logo";

const SERVICES = [
  {
    name: "Gateway",
    url: "https://nexusai-v0ra.onrender.com/health",
  },
  {
    name: "Auth Service",
    url: "https://nexusai-1-k401.onrender.com/health",
  },
  {
    name: "Chat Service",
    url: "https://nexusai-2-xypx.onrender.com/health",
  },
  {
    name: "Agent Service",
    url: "https://nexusai-3-7nd7.onrender.com/health",
  },
];

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

async function wakeService(service, signal, onStatus) {
  for (let attempt = 1; attempt <= 8 && !signal.aborted; attempt += 1) {
    try {
      const response = await fetch(service.url, {
        method: "GET",
        signal: AbortSignal.any([
          signal,
          AbortSignal.timeout(8000),
        ]),
      });

      if (response.ok) {
        const result = { name: service.name, ready: true };
        onStatus(result);
        return result;
      }
    } catch {
      // The service may still be starting, or the health request may fail.
    }

    if (attempt < 8 && !signal.aborted) {
      await sleep(4000, signal);
    }
  }

  const result = { name: service.name, ready: false };
  onStatus(result);
  return result;
}

export default function NexusHomeLoader({
  onComplete,
  duration = 5000,
}) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
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
    let deadlineTimer;
    const controller = new AbortController();
    const startedAt = performance.now();
    const minimumDuration = Math.max(0, duration);
    const maxWait = 60000;

    const updateProgress = (now) => {
      if (!active) return;

      const elapsed = now - startedAt;
      const value =
        minimumDuration === 0
          ? 1
          : Math.min(elapsed / minimumDuration, 1);
      const eased = 1 - Math.pow(1 - value, 3);

      // Hold at 95% until the service warm-up finishes.
      setProgress(Math.min(Math.round(eased * 95), 95));

      if (value < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    const setOneServiceStatus = (result) => {
      if (!active) return;

      setServiceStatus((previous) =>
        previous.map((service) =>
          service.name === result.name ? result : service
        )
      );
    };

    const warmupPromise = Promise.all(
      SERVICES.map((service) =>
        wakeService(service, controller.signal, setOneServiceStatus)
      )
    );

    const deadlinePromise = new Promise((resolve) => {
      deadlineTimer = setTimeout(() => resolve(null), maxWait);
    });

    Promise.race([warmupPromise, deadlinePromise]).then(async (results) => {
      if (!active) return;

      if (results === null) {
        controller.abort();
      }

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minimumDuration - elapsed);

      await sleep(remaining, controller.signal);
      if (!active) return;

      setWarming(false);
      setProgress(100);

      completionTimer = setTimeout(() => {
        if (!active) return;

        setVisible(false);
        onCompleteRef.current?.();
      }, 400);
    });

    return () => {
      active = false;
      controller.abort();
      cancelAnimationFrame(animationFrame);
      clearTimeout(completionTimer);
      clearTimeout(deadlineTimer);
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
              ? `Waking services (${readyCount}/4 ready)`
              : allReady
                ? "All services connected"
                : `${readyCount}/4 services ready · Some may need a retry`}
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
