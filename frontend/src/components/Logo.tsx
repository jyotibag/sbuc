const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      
      {/* Decorative leaf/jewelry motif */}
      <path
        d="M20 30 Q30 10 40 30 Q30 50 20 30"
        fill="url(#logoGradient)"
        opacity="0.8"
      />
      <circle cx="30" cy="30" r="8" fill="url(#logoGradient)" />
      
      {/* SBUC Text */}
      <text
        x="55"
        y="35"
        fontSize="24"
        fontWeight="700"
        fill="url(#logoGradient)"
        fontFamily="Inter, sans-serif"
      >
        SBUC
      </text>
      
      {/* Subtitle */}
      <text
        x="55"
        y="48"
        fontSize="10"
        fill="#0d9488"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
      >
        Shibani Banerjee's Unique Collection
      </text>
    </svg>
  )
}

export default Logo
