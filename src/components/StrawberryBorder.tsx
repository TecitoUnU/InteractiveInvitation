import { Daisy } from './illustrations/Daisy'
import { Strawberry } from './illustrations/Strawberry'
import { Vine } from './illustrations/Vine'

/**
 * Marco decorativo de la tarjeta: doble filete, fresas y margaritas
 * en las esquinas, y pequeñas enredaderas laterales.
 */
export function StrawberryBorder() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
      aria-hidden="true"
    >
      <div className="absolute inset-[9px] rounded-[28px] border border-strawberry/20" />
      <div className="absolute inset-[14px] rounded-[24px] border border-dashed border-strawberry/15" />

      {/* Esquina superior izquierda */}
      <div className="absolute left-1.5 top-1.5 flex items-start">
        <Strawberry className="w-7 -rotate-12 drop-shadow-[0_2px_3px_rgba(93,58,58,0.2)] sm:w-8" />
        <Daisy className="mt-2 -ml-1 w-4 animate-sway-slow sm:w-5" />
      </div>

      {/* Esquina superior derecha */}
      <div className="absolute right-1.5 top-1.5 flex items-start">
        <Daisy className="mt-2 -mr-1 w-4 animate-sway sm:w-5" />
        <Strawberry className="w-7 rotate-12 drop-shadow-[0_2px_3px_rgba(93,58,58,0.2)] sm:w-8" />
      </div>

      {/* Esquina inferior izquierda */}
      <div className="absolute bottom-1.5 left-1.5 flex items-end">
        <Daisy className="mb-2 -mr-1 w-4 sm:w-5" />
        <Strawberry className="w-6 -rotate-12 sm:w-7" />
      </div>

      {/* Esquina inferior derecha */}
      <div className="absolute bottom-1.5 right-1.5 flex items-end">
        <Strawberry className="w-6 rotate-12 sm:w-7" />
        <Daisy className="mb-2 -ml-1 w-4 sm:w-5" />
      </div>

      <Vine className="absolute -left-2 top-[32%] w-6 opacity-45 sm:w-7" />
      <Vine mirrored className="absolute -right-2 top-[48%] w-6 opacity-45 sm:w-7" />
    </div>
  )
}
