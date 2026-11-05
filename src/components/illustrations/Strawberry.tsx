import { useId } from 'react'
import { cn } from '../../lib/cn'

interface StrawberryProps {
  className?: string
  size?: number
  title?: string
}

/**
 * Fresa ilustrada original. Se usa suelta o dentro de los ramos
 * decorativos. No requiere archivos externos.
 */
export function Strawberry({ className, size, title }: StrawberryProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const bodyId = `strawberry-body-${uid}`
  const leafId = `strawberry-leaf-${uid}`

  return (
    <svg
      viewBox="0 0 100 122"
      className={cn(className)}
      style={size ? { width: size } : undefined}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <radialGradient id={bodyId} cx="34%" cy="24%" r="78%">
          <stop offset="0%" stopColor="#F2455F" />
          <stop offset="45%" stopColor="#DD1D3D" />
          <stop offset="100%" stopColor="#B00C26" />
        </radialGradient>
        <linearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9BC46B" />
          <stop offset="100%" stopColor="#5C8A42" />
        </linearGradient>
      </defs>

      {/* Cuerpo */}
      <path
        d="M50 20C32 20 18 30 16 47c-3 20 15 42 34 62 19-20 37-42 34-62-2-17-16-27-34-27Z"
        fill={`url(#${bodyId})`}
        stroke="#8C0A21"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Sombra inferior */}
      <path
        d="M24 70c8 17 21 31 26 39 5-8 18-22 26-39-14 8-38 8-52 0Z"
        fill="#8C0A21"
        opacity="0.18"
      />

      {/* Brillo */}
      <ellipse
        cx="36"
        cy="43"
        rx="9"
        ry="15"
        fill="#FFFFFF"
        opacity="0.28"
        transform="rotate(-18 36 43)"
      />

      {/* Semillas */}
      <g fill="#FFE7B0" stroke="#E7B75C" strokeWidth="0.6">
        <ellipse cx="35" cy="40" rx="2.2" ry="3" transform="rotate(-18 35 40)" />
        <ellipse cx="50" cy="34" rx="2.2" ry="3" />
        <ellipse cx="65" cy="41" rx="2.2" ry="3" transform="rotate(18 65 41)" />
        <ellipse cx="27" cy="56" rx="2.2" ry="3" transform="rotate(-22 27 56)" />
        <ellipse cx="44" cy="53" rx="2.2" ry="3" transform="rotate(-8 44 53)" />
        <ellipse cx="59" cy="55" rx="2.2" ry="3" transform="rotate(8 59 55)" />
        <ellipse cx="74" cy="57" rx="2.2" ry="3" transform="rotate(22 74 57)" />
        <ellipse cx="35" cy="68" rx="2.2" ry="3" transform="rotate(-15 35 68)" />
        <ellipse cx="50" cy="70" rx="2.2" ry="3" />
        <ellipse cx="65" cy="68" rx="2.2" ry="3" transform="rotate(15 65 68)" />
        <ellipse cx="43" cy="84" rx="2.1" ry="2.9" transform="rotate(-10 43 84)" />
        <ellipse cx="57" cy="84" rx="2.1" ry="2.9" transform="rotate(10 57 84)" />
        <ellipse cx="50" cy="96" rx="2" ry="2.7" />
      </g>

      {/* Hojas */}
      <g
        fill={`url(#${leafId})`}
        stroke="#4C7437"
        strokeWidth="2.2"
        strokeLinejoin="round"
      >
        <path d="M50 23C47 9 38 3 29 8c4 10 11 15 21 15Z" />
        <path d="M50 23c3-14 12-20 21-15-4 10-11 15-21 15Z" />
        <path d="M47 25C38 14 26 16 23 24c7 7 16 7 24 1Z" />
        <path d="M53 25c9-11 21-9 24-1-7 7-16 7-24 1Z" />
      </g>

      {/* Tallo */}
      <path
        d="M50 20c-1-8 1-13 5-16"
        fill="none"
        stroke="#4C7437"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* Florecita */}
      <g transform="translate(66 17)">
        <circle r="4.4" fill="#FFFDF7" stroke="#FFD6E5" strokeWidth="1" />
        <circle r="1.7" fill="#E7B75C" />
      </g>
    </svg>
  )
}
