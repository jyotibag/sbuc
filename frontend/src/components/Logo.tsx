const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SBUC logo"
    >
      <defs>
        <linearGradient id="sbucGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#008080" />
          <stop offset="55%" stopColor="#00b3a4" />
          <stop offset="100%" stopColor="#bdfcc9" />
        </linearGradient>
      </defs>

      {/* Loom + leaf motif */}
      <g transform="translate(10 10)">
        <rect x="0" y="4" width="48" height="48" rx="12" fill="url(#sbucGradient)" opacity="0.15" />
        <path
          d="M6 18 C14 6, 34 6, 42 18 C34 30, 14 30, 6 18"
          fill="url(#sbucGradient)"
          opacity="0.9"
        />
        <path
          d="M18 18 C22 12, 30 12, 34 18 C30 24, 22 24, 18 18"
          fill="#e6fffb"
          opacity="0.8"
        />
        <path
          d="M8 34 H40"
          stroke="url(#sbucGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="12" cy="34" r="2" fill="url(#sbucGradient)" />
        <circle cx="20" cy="34" r="2" fill="url(#sbucGradient)" />
        <circle cx="28" cy="34" r="2" fill="url(#sbucGradient)" />
        <circle cx="36" cy="34" r="2" fill="url(#sbucGradient)" />
      </g>

      {/* Brand text */}
      <text
        x="72"
        y="38"
        fontSize="28"
        fontWeight="700"
        fill="url(#sbucGradient)"
        fontFamily="Cormorant Garamond, serif"
        letterSpacing="1.5"
      >
        SBUC
      </text>
      <text
        x="72"
        y="54"
        fontSize="10.5"
        fill="#0b6b66"
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
        letterSpacing="0.6"
      >
        Shibani Banerjee's Unique Collection
      </text>
    </svg>
  )
}

export default Logo
