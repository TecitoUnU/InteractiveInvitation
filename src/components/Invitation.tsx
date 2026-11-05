import { ArrowUpRight, MapPin, RotateCcw } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import { invitation } from '../config/invitation'
import { Countdown } from './Countdown'
import { EventDetails } from './EventDetails'
import { FloatingDecorations } from './FloatingDecorations'
import { RSVPButton } from './RSVPButton'
import { StrawberryBorder } from './StrawberryBorder'
import { Daisy } from './illustrations/Daisy'
import { Kitty } from './illustrations/Kitty'
import { Strawberry } from './illustrations/Strawberry'
import { Reveal } from './ui/Reveal'

interface InvitationProps {
  onReplay: () => void
}

/** Tarjeta principal que se revela después de abrir el sobre. */
export function Invitation({ onReplay }: InvitationProps) {
  const reduceMotion = useReducedMotion()

  return (
    <main className="invitation-page relative min-h-[100svh] overflow-x-clip pb-14">
      <FloatingDecorations />

      <div className="relative z-10 px-4 pb-8 pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-6 sm:pt-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.965 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <article className="invitation-card relative overflow-hidden rounded-[36px]">
            {/* Cinta vichy superior + encaje */}
            <div className="vichy absolute inset-x-0 top-0 h-4" aria-hidden="true" />
            <div
              className="scallop-edge absolute inset-x-0 top-[13px] z-10"
              style={{ '--scallop-color': '#FFF8ED' } as CSSProperties}
              aria-hidden="true"
            />

            <div className="relative px-6 pb-7 pt-12 sm:px-9 sm:pb-9 sm:pt-14">
              <StrawberryBorder />

              {/* Encabezado */}
              <header className="relative z-10 text-center">
                <span className="label-tag">
                  <Strawberry className="w-3.5" />
                  {invitation.copy.kicker}
                  <Daisy className="w-3" />
                </span>

                <h1 className="text-outline mt-2 font-display text-[clamp(3.2rem,13vw,4.3rem)] leading-[1.04] text-strawberry">
                  {invitation.celebrant.name}
                </h1>

                <p className="mx-auto mt-2 max-w-[310px] font-script text-[clamp(1.4rem,5.4vw,1.7rem)] leading-[1.08] text-ink-soft">
                  {invitation.copy.welcome}
                </p>

                <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-strawberry/50">
                  <span className="h-px w-10 bg-strawberry/25" />
                  <Strawberry className="w-5" />
                  <Daisy className="w-4" />
                  <Strawberry className="w-5 rotate-[8deg]" />
                  <span className="h-px w-10 bg-strawberry/25" />
                </div>
              </header>

              <Reveal delay={0.05}>
                <EventDetails />
              </Reveal>

              <Reveal delay={0.08}>
                <section className="relative z-10 mt-4" aria-label="Ubicación del evento">
                  <a
                    href={invitation.event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-full border border-leaf-deep/25 bg-[linear-gradient(180deg,#F7FBEE_0%,#EAF4D8_100%)] px-4 py-3.5 text-leaf-deep shadow-[0_12px_24px_-18px_rgba(76,116,55,0.7),inset_0_1px_0_rgba(255,255,255,0.8)] transition-transform active:scale-[0.98]"
                  >
                    <span
                      className="absolute inset-1 rounded-full border border-dashed border-leaf-deep/20"
                      aria-hidden="true"
                    />
                    <span className="relative flex min-w-0 items-center gap-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/80 shadow-[inset_0_0_0_1px_rgba(106,153,78,0.2)]">
                        <MapPin className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="text-left">
                        <span className="block font-serif text-[8px] font-semibold uppercase tracking-[0.2em] text-leaf-deep/70">
                          Ubicación
                        </span>
                        <span className="block font-body text-[13px] font-semibold leading-tight">
                          Ver ubicación
                        </span>
                      </span>
                    </span>
                    <span className="relative flex items-center gap-1.5">
                      <Strawberry className="w-4 opacity-60" />
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                  <p className="mt-1.5 text-center font-serif text-[8px] uppercase tracking-[0.16em] text-ink-soft/70">
                    {invitation.event.venueName}
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.08}>
                <Countdown />
              </Reveal>

              <Reveal delay={0.08}>
                <RSVPButton />
              </Reveal>

              {/* Mensaje final */}
              <Reveal delay={0.08}>
                <footer className="relative z-10 mt-7 text-center">
                  <div className="mx-auto flex items-center justify-center gap-2">
                    <Daisy className="w-6" />
                    <Strawberry className="w-7" />
                    <Daisy className="w-6" />
                  </div>

                  <p className="mx-auto mt-3 max-w-[300px] font-script text-[clamp(1.45rem,5.6vw,1.75rem)] leading-[1.1] text-strawberry-deep">
                    {invitation.copy.finalMessage}
                  </p>

                  <p className="mt-4 font-serif text-[8px] font-semibold uppercase tracking-[0.24em] text-ink-soft/75">
                    {invitation.copy.signature}
                  </p>
                  <p className="font-display text-2xl leading-tight text-strawberry">
                    {invitation.celebrant.name}
                  </p>

                  <div className="mt-3 flex items-end justify-center gap-1.5">
                    <Strawberry className="w-5 -rotate-12 opacity-80" />
                    <Kitty className="w-12" src={invitation.illustrations.kitty || undefined} />
                    <Strawberry className="w-5 rotate-12 opacity-80" />
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-strawberry/45">
                    <Daisy className="w-3.5" />
                    <span className="font-serif text-[7px] uppercase tracking-[0.22em]">
                      {invitation.copy.footerNote}
                    </span>
                    <Daisy className="w-3.5" />
                  </div>
                </footer>
              </Reveal>
            </div>
          </article>

          {/* Cintas de papel en las esquinas de la tarjeta */}
          <div
            className="washi-tape -left-3 top-10 -rotate-[14deg] sm:-left-4"
            aria-hidden="true"
          />
          <div
            className="washi-tape -right-3 top-24 rotate-[12deg] sm:-right-4"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onReplay}
        aria-label="Volver a ver la animación del sobre"
        className="fixed left-4 top-[max(0.85rem,env(safe-area-inset-top))] z-50 flex h-11 items-center gap-2 rounded-full border border-strawberry/20 bg-cream/90 px-3 text-strawberry-deep shadow-soft backdrop-blur-md transition-colors hover:bg-white sm:left-5"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        <span className="hidden font-serif text-[9px] font-semibold uppercase tracking-[0.18em] sm:inline">
          Repetir animación
        </span>
      </button>
    </main>
  )
}
