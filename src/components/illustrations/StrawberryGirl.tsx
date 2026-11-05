import { useId } from 'react'
import { cn } from '../../lib/cn'

interface StrawberryGirlProps {
  className?: string
  /** Si se indica, se muestra una ilustración propia en lugar del SVG. */
  src?: string
}

/**
 * Ilustración original inspirada en el universo de una niña del jardín
 * de fresas: sombrero de fresa, vestido rosa y delantal blanco.
 */
export function StrawberryGirl({ className, src }: StrawberryGirlProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const skinId = `girl-skin-${uid}`
  const hairId = `girl-hair-${uid}`
  const dressId = `girl-dress-${uid}`
  const hatId = `girl-hat-${uid}`
  const leafId = `girl-leaf-${uid}`

  if (src) {
    return (
      <img
        src={src}
        alt="Niña del jardín de fresas sosteniendo una invitación"
        className={cn(className)}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 240 330"
      className={cn(className)}
      aria-label="Niña del jardín de fresas"
      role="img"
    >
      <defs>
        <linearGradient id={skinId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE7D7" />
          <stop offset="100%" stopColor="#F9C9AF" />
        </linearGradient>
        <linearGradient id={hairId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BE5B3E" />
          <stop offset="100%" stopColor="#8F3B2A" />
        </linearGradient>
        <linearGradient id={dressId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9B6CE" />
          <stop offset="100%" stopColor="#EC7DA6" />
        </linearGradient>
        <linearGradient id={hatId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EA3B57" />
          <stop offset="100%" stopColor="#B00C26" />
        </linearGradient>
        <linearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A7C957" />
          <stop offset="100%" stopColor="#5C8A42" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="320" rx="72" ry="9" fill="#5D3A3A" opacity="0.14" />

      {/* Cabello trasero */}
      <path
        d="M64 110C57 66 84 40 120 40s63 26 56 70l4 46c-3 12-15 16-23 8l-5-40H88l-5 40c-8 8-20 4-23-8Z"
        fill={`url(#${hairId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Trenzas */}
      <path
        d="M68 126c-13 14-16 40-11 60 3 11 14 12 18 2 4-11 0-32 4-48"
        fill={`url(#${hairId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M172 126c13 14 16 40 11 60-3 11-14 12-18 2-4-11 0-32-4-48"
        fill={`url(#${hairId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#7A3B3B" strokeWidth="1.6" opacity="0.55">
        <path d="M62 146c7 1 10 5 10 9M64 162c7 1 10 5 9 9M66 178c6 1 8 4 8 8" />
        <path d="M178 146c-7 1-10 5-10 9M176 162c-7 1-10 5-9 9M174 178c-6 1-8 4-8 8" />
      </g>

      {/* Piernas y zapatos */}
      <path
        d="M102 262v30M138 262v30"
        fill="none"
        stroke="#7A3B3B"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M102 262v30M138 262v30"
        fill="none"
        stroke="#FFF8ED"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <g fill="#C8102E" stroke="#7A3B3B" strokeWidth="2.3" strokeLinejoin="round">
        <path d="M93 297c0-5 4-8 9-8h9c4 0 6 3 6 7 0 5-4 8-11 8h-7c-4 0-6-3-6-7Z" />
        <path d="M147 297c0-5 4-8 9-8h9c4 0 6 3 6 7 0 5-4 8-11 8h-7c-4 0-6-3-6-7Z" />
      </g>
      <g fill="#FFD6E5" opacity="0.8">
        <circle cx="104" cy="295" r="1.5" />
        <circle cx="158" cy="295" r="1.5" />
      </g>

      {/* Falda */}
      <path
        d="M86 204c-8 26-18 54-26 76 30 10 90 10 120 0-8-22-18-50-26-76Z"
        fill={`url(#${dressId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 280q6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0 6 9 12 0"
        fill="none"
        stroke="#FFFDF7"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Delantal */}
      <path
        d="M94 205h52l8 68c-18 8-50 8-68 0Z"
        fill="#FFFDF7"
        stroke="#E9A9BE"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M102 214c-2 18-4 38-5 53M138 214c2 18 4 38 5 53"
        fill="none"
        stroke="#F3C4D4"
        strokeWidth="1.6"
        strokeDasharray="3 4"
      />
      <g transform="translate(120 252) scale(.28)">
        <path
          d="M0 0C-13 0-23 8-24 20c-2 14 11 29 24 43 13-14 26-29 24-43C23 8 13 0 0 0Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="3"
        />
        <path
          d="M0 2C-3-9-11-13-18-10c3 8 9 11 18 12Zm0 0C3-9 11-13 18-10c-3 8-9 11-18 12Z"
          fill="#6A994E"
          stroke="#4C7437"
          strokeWidth="2.4"
        />
        <circle cx="-8" cy="20" r="2.2" fill="#FFE7B0" />
        <circle cx="8" cy="20" r="2.2" fill="#FFE7B0" />
        <circle cx="0" cy="33" r="2.2" fill="#FFE7B0" />
      </g>

      {/* Corpiño */}
      <path
        d="M88 158c12 8 52 8 64 0l6 52c-18 8-58 8-76 0Z"
        fill={`url(#${dressId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Cinturón y moño */}
      <path
        d="M82 207c24 8 52 8 76 0"
        fill="none"
        stroke="#C8102E"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g transform="translate(120 211)">
        <path
          d="M-2 0C-9-8-20-6-20 1c0 7 11 9 18 2Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.6"
        />
        <path
          d="M2 0C9-8 20-6 20 1c0 7-11 9-18 2Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.6"
        />
        <circle r="4.5" fill="#E8536C" stroke="#8C0A21" strokeWidth="1.4" />
      </g>

      {/* Mangas y brazos */}
      <g stroke="#7A3B3B" strokeLinecap="round">
        <path
          d="M76 180c-8 18-15 37-18 52"
          fill="none"
          strokeWidth="15"
        />
        <path
          d="M164 180c8 18 15 37 18 52"
          fill="none"
          strokeWidth="15"
        />
        <path
          d="M76 180c-8 18-15 37-18 52"
          fill="none"
          stroke={`url(#${skinId})`}
          strokeWidth="11"
        />
        <path
          d="M164 180c8 18 15 37 18 52"
          fill="none"
          stroke={`url(#${skinId})`}
          strokeWidth="11"
        />
      </g>
      <circle
        cx="81"
        cy="173"
        r="17"
        fill={`url(#${dressId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
      />
      <circle
        cx="159"
        cy="173"
        r="17"
        fill={`url(#${dressId})`}
        stroke="#7A3B3B"
        strokeWidth="2.5"
      />
      <path
        d="M70 184q11 6 22 0M148 184q11 6 22 0"
        fill="none"
        stroke="#FFFDF7"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle
        cx="57"
        cy="235"
        r="9"
        fill={`url(#${skinId})`}
        stroke="#7A3B3B"
        strokeWidth="2.3"
      />
      <circle
        cx="183"
        cy="235"
        r="9"
        fill={`url(#${skinId})`}
        stroke="#7A3B3B"
        strokeWidth="2.3"
      />

      {/* Cuello y encaje */}
      <rect
        x="111"
        y="144"
        width="18"
        height="20"
        rx="8"
        fill={`url(#${skinId})`}
        stroke="#7A3B3B"
        strokeWidth="2.2"
      />
      <path
        d="M91 156c5 12 53 12 58 0 3 10-3 17-11 19l-4 7c-7 6-21 6-28 0l-4-7c-8-2-14-9-11-19Z"
        fill="#FFFDF7"
        stroke="#E9A9BE"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g fill="#FFFDF7" stroke="#E9A9BE" strokeWidth="1.4">
        <circle cx="98" cy="174" r="4" />
        <circle cx="109" cy="179" r="4" />
        <circle cx="120" cy="181" r="4" />
        <circle cx="131" cy="179" r="4" />
        <circle cx="142" cy="174" r="4" />
      </g>

      {/* Orejas */}
      <circle
        cx="70"
        cy="110"
        r="8"
        fill={`url(#${skinId})`}
        stroke="#7A3B3B"
        strokeWidth="2.3"
      />
      <circle
        cx="170"
        cy="110"
        r="8"
        fill={`url(#${skinId})`}
        stroke="#7A3B3B"
        strokeWidth="2.3"
      />

      {/* Cabeza */}
      <circle
        cx="120"
        cy="106"
        r="50"
        fill={`url(#${skinId})`}
        stroke="#7A3B3B"
        strokeWidth="2.6"
      />

      {/* Mejillas */}
      <ellipse cx="90" cy="128" rx="10" ry="5.5" fill="#F48FAF" opacity="0.5" />
      <ellipse cx="150" cy="128" rx="10" ry="5.5" fill="#F48FAF" opacity="0.5" />

      {/* Ojos */}
      <ellipse cx="101" cy="115" rx="6.8" ry="9" fill="#4B2727" />
      <ellipse cx="139" cy="115" rx="6.8" ry="9" fill="#4B2727" />
      <circle cx="99.2" cy="112.5" r="2.4" fill="#FFFFFF" />
      <circle cx="137.2" cy="112.5" r="2.4" fill="#FFFFFF" />
      <circle cx="103.3" cy="118" r="1.3" fill="#FFFFFF" opacity="0.85" />
      <circle cx="141.3" cy="118" r="1.3" fill="#FFFFFF" opacity="0.85" />
      <g stroke="#4B2727" strokeWidth="1.8" strokeLinecap="round">
        <path d="M93 107l-3-2M147 107l3-2" />
        <path d="M94 101q7-4 14-1M132 100q7-3 14 1" fill="none" />
      </g>

      {/* Nariz y boca */}
      <path
        d="M120 122c-1 2 0 3 2 3"
        fill="none"
        stroke="#C98C7A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M112 132q8 8 16 0"
        fill="none"
        stroke="#A34A4A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M116 136q4 3 8 0"
        fill="#F48FAF"
        stroke="#A34A4A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Pecas */}
      <g fill="#C97B5E" opacity="0.6">
        <circle cx="91" cy="121" r="1" />
        <circle cx="96" cy="119" r="1" />
        <circle cx="149" cy="121" r="1" />
        <circle cx="144" cy="119" r="1" />
      </g>

      {/* Flequillo */}
      <path
        d="M72 84c8 19 20 21 28 8 6 15 14 15 20 2 6 13 14 13 20-2 8 13 20 11 28-8-18 10-78 10-96 0Z"
        fill={`url(#${hairId})`}
        stroke="#7A3B3B"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Sombrero de fresa */}
      <path
        d="M68 82C64 51 88 31 120 31s56 20 52 51c-20 12-84 12-104 0Z"
        fill={`url(#${hatId})`}
        stroke="#8C0A21"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M68 82c20 12 84 12 104 0"
        fill="none"
        stroke="#FFF8ED"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M70 84q5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0"
        fill="none"
        stroke="#FFF8ED"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <g fill="#FFE7B0" stroke="#E7B75C" strokeWidth="0.7">
        <ellipse cx="91" cy="54" rx="2.2" ry="3" transform="rotate(-15 91 54)" />
        <ellipse cx="108" cy="45" rx="2.2" ry="3" />
        <ellipse cx="128" cy="45" rx="2.2" ry="3" />
        <ellipse cx="146" cy="54" rx="2.2" ry="3" transform="rotate(15 146 54)" />
        <ellipse cx="84" cy="68" rx="2.1" ry="2.8" transform="rotate(-20 84 68)" />
        <ellipse cx="103" cy="61" rx="2.1" ry="2.8" />
        <ellipse cx="120" cy="58" rx="2.1" ry="2.8" />
        <ellipse cx="137" cy="61" rx="2.1" ry="2.8" />
        <ellipse cx="156" cy="68" rx="2.1" ry="2.8" transform="rotate(20 156 68)" />
      </g>
      <g
        fill={`url(#${leafId})`}
        stroke="#4C7437"
        strokeWidth="2.2"
        strokeLinejoin="round"
      >
        <path d="M120 33c-3-13-12-19-21-14 4 10 11 15 21 14Z" />
        <path d="M120 33c3-13 12-19 21-14-4 10-11 15-21 14Z" />
        <path d="M116 34c-10-9-21-6-23 3 8 6 17 5 23-3Z" />
        <path d="M124 34c10-9 21-6 23 3-8 6-17 5-23-3Z" />
      </g>
      <path
        d="M120 31c0-8 3-13 8-16"
        fill="none"
        stroke="#4C7437"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Moños de las trenzas */}
      <g transform="translate(64 190)">
        <path
          d="M-2 0C-8-7-16-5-16 1c0 6 8 8 14 2Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.4"
        />
        <path
          d="M2 0C8-7 16-5 16 1c0 6-8 8-14 2Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.4"
        />
        <circle r="3.5" fill="#E8536C" stroke="#8C0A21" strokeWidth="1.2" />
      </g>
      <g transform="translate(176 190)">
        <path
          d="M-2 0C-8-7-16-5-16 1c0 6 8 8 14 2Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.4"
        />
        <path
          d="M2 0C8-7 16-5 16 1c0 6-8 8-14 2Z"
          fill="#C8102E"
          stroke="#8C0A21"
          strokeWidth="1.4"
        />
        <circle r="3.5" fill="#E8536C" stroke="#8C0A21" strokeWidth="1.2" />
      </g>
    </svg>
  )
}
