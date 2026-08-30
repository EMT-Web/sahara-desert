import Image from 'next/image'

// ─────────────────────────────────────────────────────────────────────────────
// ICON
// ─────────────────────────────────────────────────────────────────────────────
export function LogoIcon({ className = 'w-9 h-9' }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <defs>
        <radialGradient id="lg-sky" cx="50%" cy="60%" r="60%">
          <stop offset="0%"   stopColor="#fde68a" />
          <stop offset="28%"  stopColor="#f59e0b" />
          <stop offset="62%"  stopColor="#b45309" />
          <stop offset="100%" stopColor="#7c2d12" />
        </radialGradient>
        <clipPath id="lg-clip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>

      {/* Gold ring border */}
      <circle cx="50" cy="50" r="49" fill="#d97706" />
      <circle cx="50" cy="50" r="47" fill="url(#lg-sky)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.55" />

      <g clipPath="url(#lg-clip)">
        {/* Stars */}
        <circle cx="18" cy="20" r="1.2" fill="#fef3c7" opacity="0.9" />
        <circle cx="32" cy="13" r="0.9" fill="#fef3c7" opacity="0.8" />
        <circle cx="50" cy="17" r="1.4" fill="#fef3c7" />
        <circle cx="68" cy="13" r="0.9" fill="#fef3c7" opacity="0.8" />
        <circle cx="82" cy="22" r="1.2" fill="#fef3c7" opacity="0.9" />
        <circle cx="88" cy="36" r="0.8" fill="#fef3c7" opacity="0.65" />
        <circle cx="12" cy="36" r="0.8" fill="#fef3c7" opacity="0.65" />

        {/* Sun glow halo */}
        <ellipse cx="50" cy="56" rx="22" ry="9" fill="#fef9c3" opacity="0.35" />
        {/* Sun */}
        <circle cx="50" cy="54" r="19" fill="#fef3c7" opacity="0.95" />

        {/* Dune layer 1: back */}
        <path d="M 3 72 Q 20 58 38 65 Q 50 71 64 61 Q 76 53 97 63 L 97 100 L 3 100 Z"
          fill="#92400e" opacity="0.65" />
        {/* Dune layer 2: mid */}
        <path d="M 3 81 Q 22 67 44 75 Q 60 81 76 70 Q 88 63 97 70 L 97 100 L 3 100 Z"
          fill="#78350f" />
        {/* Dune layer 3: front */}
        <path d="M 3 90 Q 28 78 52 86 Q 76 93 97 82 L 97 100 L 3 100 Z"
          fill="#3b1208" />
      </g>

      {/* Outer ring final stroke */}
      <circle cx="50" cy="50" r="49" fill="none" stroke="#c2410c" strokeWidth="0.6" />
    </svg>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// WORDMARK
// ─────────────────────────────────────────────────────────────────────────────
export function LogoWordmark({ variant = 'dark', className = '' }) {
  const accent = variant === 'light' ? '#fde68a'                  : '#c2410c'
  const main   = variant === 'light' ? '#ffffff'                  : '#3c1509'
  const rule   = variant === 'light' ? 'rgba(253,230,138,0.38)'  : 'rgba(194,65,12,0.28)'
  const sub    = variant === 'light' ? 'rgba(253,230,138,0.52)'  : 'rgba(92,26,4,0.58)'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50"
      className={className} aria-label="Visit Sahara Desert" role="img">

      {/* Pre-heading */}
      <text x="2" y="16"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="10" fontWeight="600" letterSpacing="5" fill={accent}>
        VISIT
      </text>

      {/* Divider with Amazigh diamond accents */}
      <line x1="2" y1="21" x2="218" y2="21" stroke={rule} strokeWidth="0.8" />
      <polygon points="109,19.5 111,21 109,22.5 107,21" fill={accent} opacity="0.55" />
      <polygon points="55,19.5  57,21  55,22.5  53,21"  fill={accent} opacity="0.38" />
      <polygon points="163,19.5 165,21 163,22.5 161,21" fill={accent} opacity="0.38" />

      {/* Main logotype */}
      <text x="0" y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="20" fontWeight="700" letterSpacing="1.5" fill={main}>
        SAHARA DESERT
      </text>

      {/* Cultural tagline */}
      <text x="2" y="48"
        fontFamily="'Segoe UI', Arial, sans-serif"
        fontSize="6.5" fontWeight="400" letterSpacing="2.5" fill={sub}>
        MOROCCO · AMAZIGH HERITAGE
      </text>
    </svg>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// COMBINED (default export): full horizontal logo image
// ─────────────────────────────────────────────────────────────────────────────
export default function Logo({ className = 'h-14 w-auto' }) {
  return (
    <Image src="/logo.png" alt="Visit Sahara Desert" width={96} height={95} className={className} />
  )
}
