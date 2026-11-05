import { Bunting } from './Bunting'
import { Daisy } from './Daisy'
import { Strawberry } from './Strawberry'
import { Vine } from './Vine'

/**
 * Fondo del jardín encantado: cielo cremoso, colinas, banderines,
 * enredaderas y fresas gigantes en las esquinas.
 */
export function GardenBackground() {
  return (
    <div className="garden-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="garden-sky absolute inset-0" />
      <div className="garden-sun absolute left-1/2 top-[6%] h-[46vmin] w-[46vmin] -translate-x-1/2 rounded-full" />

      <svg
        viewBox="0 0 1440 620"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[46%] w-full"
      >
        <defs>
          <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDEBC6" />
            <stop offset="100%" stopColor="#C4DDA4" />
          </linearGradient>
          <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4DDA4" />
            <stop offset="100%" stopColor="#A7C957" />
          </linearGradient>
          <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7C957" />
            <stop offset="100%" stopColor="#7FAF5B" />
          </linearGradient>
        </defs>
        <path
          d="M0 250C160 130 300 150 440 230 580 310 660 200 800 180c150-22 230 90 360 80 110-8 190-80 280-70v430H0Z"
          fill="url(#hill-back)"
        />
        <path
          d="M0 360c130-90 260-70 400 0s240 40 380-20 300-20 400 40c100 60 180 60 260 30v210H0Z"
          fill="url(#hill-mid)"
        />
        <path
          d="M0 470c170-60 330-40 480 20s300 50 450 0 320-40 510 20v110H0Z"
          fill="url(#hill-front)"
        />
      </svg>

      <div className="absolute inset-x-0 top-0 opacity-95">
        <Bunting />
      </div>

      <Vine className="absolute -left-8 top-0 w-20 origin-top animate-sway-slow opacity-90 sm:-left-4 sm:w-28" />
      <Vine
        mirrored
        className="absolute -right-8 top-0 w-20 origin-top animate-sway-slow opacity-90 sm:-right-4 sm:w-28"
      />

      <Strawberry className="absolute bottom-[10%] left-[-2%] w-16 rotate-[-14deg] animate-sway-slow opacity-95 sm:bottom-[8%] sm:left-[2%] sm:w-24" />
      <Strawberry className="absolute bottom-[6%] right-[-3%] w-14 rotate-[16deg] animate-sway-slow opacity-95 sm:right-[2%] sm:w-20" />
      <Strawberry className="absolute bottom-[22%] left-[3%] w-9 rotate-[10deg] opacity-80 sm:w-12" />

      <Daisy className="absolute bottom-[16%] left-[13%] w-8 animate-sway sm:w-10" />
      <Daisy className="absolute bottom-[26%] right-[10%] w-9 animate-sway-slow sm:w-12" />
      <Daisy className="absolute bottom-[6%] right-[22%] w-6 opacity-80 sm:w-8" />
      <Daisy className="absolute bottom-[4%] left-[30%] w-5 opacity-70 sm:w-7" />

      <div className="garden-grain absolute inset-0" />
    </div>
  )
}
