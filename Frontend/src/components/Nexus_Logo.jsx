 export const NexusLogo = ({ size = 42 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nexusGradient" x1="15" y1="85" x2="85" y2="15">
          <stop offset="0%" stopColor="#ff1744" />
          <stop offset="100%" stopColor="#ff2bd6" />
        </linearGradient>
      </defs>

      {/* N */}
      <path
        d="M20 80V20L80 80V20"
        stroke="url(#nexusGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Agent nodes */}
      <circle cx="20" cy="20" r="5" fill="#ff1744" />
      <circle cx="80" cy="20" r="5" fill="#ff2bd6" />
      <circle cx="80" cy="80" r="5" fill="#ff1744" />
    </svg>
  );
};