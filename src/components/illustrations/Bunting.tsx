import { cn } from '../../lib/cn'

interface BuntingProps {
  className?: string
}

/** Banderines de tela con pequeñas fresas, para el jardín de la portada. */
export function Bunting({ className }: BuntingProps) {
  const flags = [
    { x: 34, y: 30, color: '#C8102E', rotate: 4 },
    { x: 82, y: 37, color: '#FFD6E5', rotate: 2 },
    { x: 130, y: 40, color: '#6A994E', rotate: 0 },
    { x: 178, y: 36, color: '#FFF8ED', rotate: -2 },
    { x: 226, y: 27, color: '#E8536C', rotate: -5 },
    { x: 274, y: 20, color: '#FFD6E5', rotate: -4 },
    { x: 322, y: 19, color: '#6A994E', rotate: 1 },
    { x: 370, y: 25, color: '#FFF8ED', rotate: 4 },
  ]

  return (
    <svg
      viewBox="0 0 400 90"
      className={cn('h-auto w-full', className)}
      aria-hidden="true"
      preserveAspectRatio="xMidYMin slice"
    >
      <path
        d="M-8 18C58 42 120 44 200 26 280 8 342 12 408 28"
        fill="none"
        stroke="#8A6262"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {flags.map((flag, index) => (
        <g
          key={index}
          transform={`translate(${flag.x} ${flag.y}) rotate(${flag.rotate})`}
        >
          <path
            d="M0 0h36L18 42Z"
            fill={flag.color}
            stroke="#8A6262"
            strokeWidth="1.2"
            strokeLinejoin="round"
            opacity={flag.color === '#FFF8ED' ? 0.95 : 1}
          />
          {index % 3 === 0 ? (
            <g transform="translate(18 17)">
              <path
                d="M0-4C-4-4-7-1-7 3c0 4 3 8 7 11 4-3 7-7 7-11 0-4-3-7-7-7Z"
                fill="#FFF8ED"
                opacity="0.9"
              />
              <path
                d="M0-4c-1-3-4-4-6-3 1 3 3 4 6 3Zm0 0c1-3 4-4 6-3-1 3-3 4-6 3Z"
                fill="#6A994E"
                opacity="0.9"
              />
            </g>
          ) : null}
        </g>
      ))}
      <g fill="#FFF8ED" stroke="#C8102E" strokeWidth="1.2">
        <circle cx="34" cy="30" r="3.2" />
        <circle cx="130" cy="40" r="3.2" />
        <circle cx="226" cy="27" r="3.2" />
        <circle cx="322" cy="19" r="3.2" />
      </g>
    </svg>
  )
}
