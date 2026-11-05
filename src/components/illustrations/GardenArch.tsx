import { Daisy } from './Daisy'
import { Strawberry } from './Strawberry'

/** Arco de jardín que enmarca al personaje y al sobre. */
export function GardenArch() {
  return (
    <div className="relative aspect-[400/460] w-full">
      <svg
        viewBox="0 0 400 460"
        className="h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="arch-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.78" />
            <stop offset="55%" stopColor="#FFF0F5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD6E5" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="arch-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A7C957" />
            <stop offset="100%" stopColor="#5C8A42" />
          </linearGradient>
        </defs>

        <path
          d="M30 456V206C30 101 106 25 200 25s170 76 170 181v250Z"
          fill="url(#arch-fill)"
          stroke="#E9A9BE"
          strokeWidth="2.5"
          strokeDasharray="1 9"
          strokeLinecap="round"
        />
        <path
          d="M46 456V210C46 112 116 43 200 43s154 69 154 167v246"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M46 456V210C46 112 116 43 200 43s154 69 154 167v246"
          fill="none"
          stroke="#E9A9BE"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Enredadera del arco */}
        <g
          fill="url(#arch-leaf)"
          stroke="#4C7437"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.9"
        >
          <path d="M52 214c-16-2-25-12-23-24 15 2 24 12 23 24Z" />
          <path d="M49 260c15-5 26 2 28 13-14 4-24-2-28-13Z" />
          <path d="M45 314c-16-2-24-12-22-24 14 2 23 12 22 24Z" />
          <path d="M44 366c14-5 25 1 27 12-13 4-23-1-27-12Z" />
          <path d="M348 214c16-2 25-12 23-24-15 2-24 12-23 24Z" />
          <path d="M351 260c-15-5-26 2-28 13 14 4 24-2 28-13Z" />
          <path d="M355 314c16-2 24-12 22-24-14 2-23 12-22 24Z" />
          <path d="M356 366c-14-5-25 1-27 12 13 4 23-1 27-12Z" />
        </g>
        <path
          d="M52 214c0 50-5 100-4 150M348 214c0 50 5 100 4 150"
          fill="none"
          stroke="#5C8A42"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      <Daisy className="absolute left-[2%] top-[20%] w-9 animate-sway-slow sm:w-11" />
      <Daisy className="absolute right-[3%] top-[28%] w-7 animate-sway sm:w-9" />
      <Daisy className="absolute left-[7%] top-[55%] w-6 sm:w-8" />
      <Daisy className="absolute right-[1%] top-[62%] w-8 sm:w-10" />
      <Strawberry className="absolute -left-1 top-[38%] w-7 rotate-[-12deg] sm:w-9" />
      <Strawberry className="absolute -right-1 top-[48%] w-6 rotate-[14deg] sm:w-8" />
    </div>
  )
}
