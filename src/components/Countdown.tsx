import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { getEventTimestamp, invitation } from '../config/invitation'
import { Daisy } from './illustrations/Daisy'
import { Strawberry } from './illustrations/Strawberry'

interface RemainingTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getRemaining(target: number, now: number): RemainingTime {
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const UNITS: Array<{ key: keyof RemainingTime; label: string }> = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
]

/** Cuenta regresiva en vivo basada en la fecha real del evento. */
export function Countdown() {
  const target = useMemo(() => getEventTimestamp(), [])
  const [now, setNow] = useState(() => Date.now())
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!target) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [target])

  if (!target) {
    return (
      <section className="relative z-10 mt-5" aria-label="Cuenta regresiva">
        <div className="rounded-[26px] border border-strawberry/25 bg-blush-light px-5 py-6 text-center">
          <p className="font-script text-2xl text-strawberry-deep">
            La fecha está por confirmar
          </p>
        </div>
      </section>
    )
  }

  const remaining = getRemaining(target, now)
  const isCelebration = target - now <= 0

  return (
    <section className="relative z-10 mt-5" aria-labelledby="cuenta-regresiva">
      <div className="relative overflow-hidden rounded-[28px] border border-strawberry/25 bg-blush-light px-3.5 py-4 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.55),0_14px_30px_-22px_rgba(93,58,58,0.5)]">
        <div className="vichy-soft absolute inset-0 opacity-55" aria-hidden="true" />
        <div
          className="absolute inset-2 rounded-[22px] border border-dashed border-strawberry/20"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-5 bg-strawberry/30" />
            <Daisy className="w-4" />
            <p className="font-script text-[1.45rem] leading-none text-strawberry-deep">
              {isCelebration
                ? invitation.copy.countdownDone
                : invitation.copy.countdownLabel}
            </p>
            <Daisy className="w-4" />
            <span className="h-px w-5 bg-strawberry/30" />
          </div>

          <h2 id="cuenta-regresiva" className="sr-only">
            Cuenta regresiva para el evento
          </h2>

          {isCelebration ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center pb-1 pt-3 text-center"
            >
              <div className="flex items-end justify-center gap-2">
                <Strawberry className="w-6 -rotate-12" />
                <Strawberry className="w-8" />
                <Strawberry className="w-6 rotate-12" />
              </div>
              <p className="mt-2 font-script text-lg leading-tight text-ink-soft">
                {invitation.copy.countdownDoneSub}
              </p>
            </motion.div>
          ) : (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {UNITS.map((unit) => (
                <div
                  key={unit.key}
                  className="relative rounded-2xl border border-strawberry/25 bg-cream px-1 pb-2 pt-2.5 text-center shadow-[inset_0_0_0_3px_rgba(255,255,255,0.65),0_6px_12px_-10px_rgba(93,58,58,0.5)]"
                >
                  <span className="relative block h-[1.15em] overflow-hidden font-display text-[clamp(1.45rem,6.6vw,1.9rem)] leading-[1.15] text-strawberry [font-variant-numeric:tabular-nums]">
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.span
                        key={remaining[unit.key]}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={reduceMotion ? false : { y: '55%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={reduceMotion ? undefined : { y: '-55%', opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        {String(remaining[unit.key]).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="mt-0.5 block font-serif text-[7px] font-semibold uppercase tracking-[0.18em] text-ink-soft/80">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
