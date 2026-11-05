import { cn } from '../../lib/cn'

interface SparklesProps {
  className?: string
  count?: number
}

const SPARKLES = [
  { x: 8, y: 22, size: 12, delay: 0, duration: 3.4, color: '#FFFFFF' },
  { x: 16, y: 64, size: 9, delay: 1.2, duration: 4.1, color: '#E7B75C' },
  { x: 24, y: 38, size: 7, delay: 2.4, duration: 3.8, color: '#FFD6E5' },
  { x: 31, y: 14, size: 11, delay: 0.6, duration: 4.6, color: '#FFFFFF' },
  { x: 39, y: 72, size: 8, delay: 1.8, duration: 3.2, color: '#FFFFFF' },
  { x: 47, y: 30, size: 6, delay: 3.1, duration: 4.3, color: '#E7B75C' },
  { x: 54, y: 8, size: 9, delay: 2.2, duration: 3.7, color: '#FFD6E5' },
  { x: 63, y: 58, size: 12, delay: 0.9, duration: 4.9, color: '#FFFFFF' },
  { x: 71, y: 26, size: 8, delay: 3.4, duration: 3.3, color: '#E7B75C' },
  { x: 79, y: 76, size: 10, delay: 1.4, duration: 4.2, color: '#FFFFFF' },
  { x: 86, y: 42, size: 7, delay: 2.8, duration: 3.9, color: '#FFD6E5' },
  { x: 92, y: 18, size: 11, delay: 0.3, duration: 4.5, color: '#FFFFFF' },
  { x: 12, y: 88, size: 8, delay: 2, duration: 3.6, color: '#FFFFFF' },
  { x: 68, y: 90, size: 7, delay: 0.5, duration: 4.8, color: '#E7B75C' },
  { x: 42, y: 50, size: 5, delay: 3.7, duration: 3.1, color: '#FFFFFF' },
  { x: 90, y: 66, size: 6, delay: 1.1, duration: 4, color: '#FFFFFF' },
]

/** Partículas brillantes que flotan en el jardín. */
export function Sparkles({ className, count = 16 }: SparklesProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      aria-hidden="true"
    >
      {SPARKLES.slice(0, count).map((sparkle, index) => (
        <span
          key={index}
          className="sparkle absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            color: sparkle.color,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full">
            <path
              d="M12 0c1.3 8.2 3.8 10.7 12 12-8.2 1.3-10.7 3.8-12 12-1.3-8.2-3.8-10.7-12-12 8.2-1.3 10.7-3.8 12-12Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
