import { useId } from 'react'
import { cn } from '../../lib/cn'

interface KittyProps {
  className?: string
  /** Si se indica, se muestra una ilustración propia en lugar del SVG. */
  src?: string
}

/** Gatito rosado original, sentado y con moño de fresa. */
export function Kitty({ className, src }: KittyProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const furId = `kitty-fur-${uid}`
  const lightId = `kitty-light-${uid}`

  if (src) {
    return (
      <img
        src={src}
        alt="Gatito rosado del jardín"
        className={cn(className)}
        loading="lazy"
      />
    )
  }

  return (
    <svg
      viewBox="0 0 120 140"
      className={cn(className)}
      aria-label="Gatito rosado"
      role="img"
    >
      <defs>
        <linearGradient id={furId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBD0DF" />
          <stop offset="100%" stopColor="#F2A9C4" />
        </linearGradient>
        <linearGradient id={lightId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF5F8" />
          <stop offset="100%" stopColor="#FFE3ED" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="133" rx="34" ry="6" fill="#5D3A3A" opacity="0.14" />

      {/* Cola */}
      <path
        d="M85 116c18 4 27-7 24-21-3-13-16-16-20-8"
        fill="none"
        stroke="#7A3B3B"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M85 116c18 4 27-7 24-21-3-13-16-16-20-8"
        fill="none"
        stroke={`url(#${furId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
      />

      {/* Cuerpo */}
      <path
        d="M60 54c-24 0-33 20-31 42 2 22 14 33 31 33s29-11 31-33c2-22-7-42-31-42Z"
        fill={`url(#${furId})`}
        stroke="#7A3B3B"
        strokeWidth="2.4"
      />
      <ellipse cx="60" cy="107" rx="16" ry="19" fill={`url(#${lightId})`} />
      <ellipse cx="44" cy="125" rx="10" ry="6" fill="#FFE3ED" stroke="#7A3B3B" strokeWidth="2" />
      <ellipse cx="76" cy="125" rx="10" ry="6" fill="#FFE3ED" stroke="#7A3B3B" strokeWidth="2" />

      {/* Orejas */}
      <path
        d="M36 38 31 9l25 17Z"
        fill={`url(#${furId})`}
        stroke="#7A3B3B"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M84 38 89 9 64 26Z"
        fill={`url(#${furId})`}
        stroke="#7A3B3B"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M39 33 37 19l13 9Z" fill="#EE8BAF" />
      <path d="M81 33 83 19 70 28Z" fill="#EE8BAF" />

      {/* Cabeza */}
      <circle cx="60" cy="52" r="31" fill={`url(#${lightId})`} stroke="#7A3B3B" strokeWidth="2.4" />

      {/* Rayitas */}
      <g stroke="#E38BAE" strokeWidth="2.4" strokeLinecap="round" opacity="0.8">
        <path d="M52 26c1 4 2 6 3 7" />
        <path d="M60 24v8" />
        <path d="M68 26c-1 4-2 6-3 7" />
      </g>

      {/* Ojos */}
      <ellipse cx="49" cy="52" rx="4" ry="5.6" fill="#4B2727" />
      <ellipse cx="71" cy="52" rx="4" ry="5.6" fill="#4B2727" />
      <circle cx="47.8" cy="50" r="1.4" fill="#FFFFFF" />
      <circle cx="69.8" cy="50" r="1.4" fill="#FFFFFF" />

      {/* Nariz y boca */}
      <path d="M60 59l-2.6 2.4h5.2Z" fill="#C8102E" />
      <path
        d="M60 61.5c0 2-2.5 3-4 1.6M60 61.5c0 2 2.5 3 4 1.6"
        fill="none"
        stroke="#7A3B3B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Bigotes */}
      <g stroke="#7A3B3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
        <path d="M38 58h-8M39 63l-7 3M82 58h8M81 63l7 3" />
      </g>

      {/* Mejillas */}
      <ellipse cx="40" cy="60" rx="5" ry="3" fill="#F28BB0" opacity="0.55" />
      <ellipse cx="80" cy="60" rx="5" ry="3" fill="#F28BB0" opacity="0.55" />

      {/* Moño */}
      <g transform="translate(60 82)">
        <path
          d="M-2 0C-8-8-18-6-18 1c0 7 10 9 16 3Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.6"
        />
        <path
          d="M2 0C8-8 18-6 18 1c0 7-10 9-16 3Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.6"
        />
        <circle r="4" fill="#E8536C" stroke="#8C0A21" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
