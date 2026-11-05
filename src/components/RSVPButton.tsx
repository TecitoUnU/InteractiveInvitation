import { MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { getWhatsAppUrl, invitation } from '../config/invitation'
import { Daisy } from './illustrations/Daisy'
import { Strawberry } from './illustrations/Strawberry'

/** Botón decorativo que abre WhatsApp con el mensaje de confirmación. */
export function RSVPButton() {
  const reduceMotion = useReducedMotion()
  const href = getWhatsAppUrl()

  return (
    <section className="relative z-10 mt-5 text-center" aria-label="Confirmar asistencia">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        whileHover={reduceMotion ? undefined : { scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        className="button-shine group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white/70 bg-[linear-gradient(180deg,#DD1E3F_0%,#C8102E_48%,#A30A24_100%)] px-4 py-4 text-cream shadow-[0_16px_30px_-14px_rgba(200,16,46,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] sm:gap-2.5 sm:px-6"
      >
        <span
          className="pointer-events-none absolute inset-1 rounded-full border border-dashed border-cream/40"
          aria-hidden="true"
        />
        <Strawberry className="h-5 w-auto shrink-0 opacity-95" />
        <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
        <span className="whitespace-nowrap font-serif text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[12px] sm:tracking-[0.17em]">
          {invitation.rsvp.buttonLabel}
        </span>
        <Daisy className="h-4 w-auto shrink-0 opacity-90" />
      </motion.a>

      <p className="mx-auto mt-2 max-w-[300px] font-script text-base leading-tight text-ink-soft/80">
        {invitation.rsvp.hint}
      </p>
    </section>
  )
}
