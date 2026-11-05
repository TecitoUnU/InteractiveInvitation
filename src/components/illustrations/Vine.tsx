import { useId } from 'react'
import { cn } from '../../lib/cn'

interface VineProps {
  className?: string
  mirrored?: boolean
}

/** Enredadera con hojas y pequeñas bayas. */
export function Vine({ className, mirrored = false }: VineProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const leafId = `vine-leaf-${uid}`
  const berryId = `vine-berry-${uid}`

  return (
    <svg
      viewBox="0 0 120 260"
      className={cn(className)}
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A7C957" />
          <stop offset="100%" stopColor="#5C8A42" />
        </linearGradient>
        <radialGradient id={berryId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#EE3A55" />
          <stop offset="100%" stopColor="#B00C26" />
        </radialGradient>
      </defs>

      <path
        d="M22 0c18 22 8 44 22 62 15 19 42 22 40 49-2 25-31 30-30 55 1 24 28 38 20 66"
        fill="none"
        stroke="#5C8A42"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <g fill={`url(#${leafId})`} stroke="#4C7437" strokeWidth="1.6">
        <path d="M31 24c-13-9-25-4-27 6 12 7 23 5 27-6Z" />
        <path d="M40 44c12-11 25-8 28 2-11 8-22 7-28-2Z" />
        <path d="M57 76c-14-6-24 1-24 11 13 4 22 0 24-11Z" />
        <path d="M79 103c13-7 24 0 25 10-12 5-22 1-25-10Z" />
        <path d="M55 129c-14-6-24 2-23 12 13 3 22-1 23-12Z" />
        <path d="M36 158c12-10 24-7 27 3-11 7-22 6-27-3Z" />
        <path d="M40 196c-13-7-24 0-24 10 12 5 22 1 24-10Z" />
        <path d="M58 226c12-8 23-3 24 7-11 6-21 3-24-7Z" />
      </g>

      <g fill={`url(#${berryId})`} stroke="#8C0A21" strokeWidth="1.2">
        <circle cx="61" cy="64" r="5" />
        <circle cx="68" cy="150" r="4.4" />
        <circle cx="45" cy="216" r="4.8" />
      </g>
    </svg>
  )
}
