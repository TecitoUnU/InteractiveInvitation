import { CalendarDays, Clock, MapPin, Shirt ,UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { invitation } from '../config/invitation'
import { Daisy } from './illustrations/Daisy'
import { Strawberry } from './illustrations/Strawberry'

interface DetailRow {
  icon: LucideIcon
  label: string
  value: string
  note?: string
}

/** Marco ornamental con los datos editables del evento. */
export function EventDetails() {
  const rows: DetailRow[] = [
    {
      icon: UserRound,
      label: 'Con mucho cariño te invito a celebrar mi primer añito',
      value: invitation.celebrant.name,
    },
    {
      icon: CalendarDays,
      label: 'Fecha',
      value: invitation.event.dateLabel,
      note: invitation.event.dateYear,
    },
    {
      icon: Clock,
      label: 'Hora',
      value: invitation.event.timeLabel,
    },
    {
      icon: MapPin,
      label: 'Lugar',
      value: invitation.event.venueName,
      note: invitation.event.venueAddress || undefined,
    },
    {
  icon: Shirt,
  label: 'Código de vestimenta',
  value: invitation.event.dressCode,
},
  ]

  return (
    <section className="relative z-10 mt-6" aria-labelledby="detalles-evento">
      <div className="ornate-frame px-5 pb-4 pt-7 sm:px-6">
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-strawberry/30 bg-cream px-4 py-1 font-serif text-[9px] font-semibold uppercase tracking-[0.24em] text-strawberry-deep shadow-[0_6px_14px_-10px_rgba(93,58,58,0.6)]">
          <span className="mr-1.5 inline-block align-[-1px]">
            <Strawberry className="inline w-3" />
          </span>
          {invitation.copy.detailsLabel}
          <span className="ml-1.5 inline-block align-[-1px]">
            <Daisy className="inline w-3" />
          </span>
        </span>

        <h2 id="detalles-evento" className="sr-only">
          Datos del evento
        </h2>

        <ul className="relative z-10">
          {rows.map((row, index) => {
            const Icon = row.icon
            return (
              <li
                key={row.label}
                className={
                  index === 0
                    ? 'flex items-center gap-3 py-2.5'
                    : 'flex items-center gap-3 border-t border-dashed border-strawberry/15 py-2.5'
                }
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-strawberry/20 bg-blush-light text-strawberry shadow-[inset_0_0_0_3px_rgba(255,255,255,0.6)]">
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[8px] font-semibold uppercase tracking-[0.22em] text-ink-soft/75">
                    {row.label}
                  </p>
                  <p className="font-body text-[15px] font-semibold leading-snug text-ink">
                    {row.value}
                  </p>
                  {row.note ? (
                    <p className="font-body text-[11px] leading-snug text-ink-soft/85">
                      {row.note}
                    </p>
                  ) : null}
                </div>
                <Strawberry className="w-4 shrink-0 rotate-[8deg] opacity-35" />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
