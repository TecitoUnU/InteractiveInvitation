import { useId } from 'react'
import { cn } from '../../lib/cn'

interface DaisyProps {
  className?: string
  petals?: number
}

/** Margarita blanca ilustrada, con centro dorado. */
export function Daisy({ className, petals = 9 }: DaisyProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const petalId = `daisy-petal-${uid}`
  const centerId = `daisy-center-${uid}`

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={petalId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFE3ED" />
        </linearGradient>
        <radialGradient id={centerId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFE49A" />
          <stop offset="100%" stopColor="#E7B75C" />
        </radialGradient>
      </defs>

      <g stroke="#E9A9BE" strokeWidth="1.4">
        {Array.from({ length: petals }).map((_, index) => (
          <ellipse
            key={index}
            cx="50"
            cy="27"
            rx="9.5"
            ry="21"
            fill={`url(#${petalId})`}
            transform={`rotate(${(360 / petals) * index} 50 50)`}
          />
        ))}
      </g>

      <circle
        cx="50"
        cy="50"
        r="14.5"
        fill={`url(#${centerId})`}
        stroke="#C98C32"
        strokeWidth="1.8"
      />
      <g fill="#C98C32" opacity="0.65">
        <circle cx="45" cy="46" r="1.6" />
        <circle cx="54" cy="45" r="1.4" />
        <circle cx="57" cy="52" r="1.6" />
        <circle cx="49" cy="55" r="1.4" />
        <circle cx="43" cy="52" r="1.2" />
      </g>
    </svg>
  )
}
