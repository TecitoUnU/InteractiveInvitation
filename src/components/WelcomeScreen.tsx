import { motion, useReducedMotion } from 'motion/react'
import { Sparkles as SparklesIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { invitation } from '../config/invitation'
import type { EnvelopeHandle } from '../types'
import { Envelope } from './Envelope'
import { Sparkles } from './ui/Sparkles'
import { Daisy } from './illustrations/Daisy'
import { GardenArch } from './illustrations/GardenArch'
import { GardenBackground } from './illustrations/GardenBackground'
import { Kitty } from './illustrations/Kitty'
import { Strawberry } from './illustrations/Strawberry'
import { StrawberryGirl } from './illustrations/StrawberryGirl'

interface WelcomeScreenProps {
  autoOpen?: boolean
  onOpened: () => void
}

/**
 * Portada vertical: jardín encantado, nombre ilustrado, personaje
 * y sobre rojo con sello de cera.
 */
export function WelcomeScreen({ autoOpen, onOpened }: WelcomeScreenProps) {
  const [opening, setOpening] = useState(false)
  const envelopeRef = useRef<EnvelopeHandle>(null)
  const reduceMotion = useReducedMotion()

  const fade = {
    opacity: opening ? 0 : 1,
    y: opening ? -14 : 0,
  }

  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <GardenBackground />
      <Sparkles />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
        <motion.header
          className="relative z-30 flex flex-col items-center pt-14 text-center sm:pt-16"
          animate={fade}
          transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-tag">
            <Strawberry className="w-3.5" />
            {invitation.copy.kicker}
            <Daisy className="w-3" />
          </span>

          <h1 className="text-outline-lg mt-1 font-display text-[clamp(3.6rem,16.5vw,5.8rem)] leading-[1.05] text-strawberry">
            {invitation.celebrant.name}
          </h1>

          <p className="mt-1 font-script text-[clamp(1.45rem,5.6vw,2rem)] leading-none text-ink-soft">
            {invitation.celebrant.tagline}
          </p>

          <div className="mt-3 flex items-center gap-2 text-strawberry/60">
            <span className="h-px w-8 bg-strawberry/30" />
            <HeartIcon />
            <span className="h-px w-8 bg-strawberry/30" />
          </div>
        </motion.header>

        <div className="relative flex w-full flex-1 items-center justify-center py-1">
          <motion.div
            className="welcome-scene"
            animate={{ opacity: opening ? 0.92 : 1, scale: opening ? 1.025 : 1 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="welcome-arch">
              <GardenArch />
            </div>

            <div className="welcome-character">
              <motion.div
                animate={{ opacity: opening ? 0 : 1, y: opening ? 12 : 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.5 }}
              >
                <StrawberryGirl
                  className="w-full"
                  src={invitation.illustrations.character || undefined}
                />
              </motion.div>
            </div>

            <div className="welcome-kitty">
              <motion.div
                animate={{ opacity: opening ? 0 : 1, y: opening ? 10 : 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.5 }}
              >
                <Kitty
                  className="w-full"
                  src={invitation.illustrations.kitty || undefined}
                />
              </motion.div>
            </div>

            <div className="welcome-envelope">
              <Envelope
                ref={envelopeRef}
                autoOpen={autoOpen}
                onOpenStart={() => setOpening(true)}
                onOpened={onOpened}
              />
            </div>

            <Daisy className="absolute bottom-[8%] left-[6%] z-20 w-7 animate-sway-slow opacity-90 sm:w-9" />
            <Strawberry className="absolute bottom-[3%] right-[2%] z-20 w-8 rotate-[12deg] opacity-90 sm:w-10" />
            <Daisy className="absolute right-[3%] top-[12%] z-20 w-5 animate-sway opacity-80 sm:w-7" />
          </motion.div>
        </div>

        <motion.footer
          className="flex w-full max-w-[340px] flex-col items-center gap-2 pb-1 text-center"
          animate={fade}
          transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="open-invitation-button"
            onClick={() => envelopeRef.current?.open()}
          >
            <SparklesIcon className="h-4 w-4 shrink-0 animate-twinkle text-strawberry" />
            <span>{invitation.copy.openHint}</span>
          </button>
          <p className="font-script text-lg leading-none text-ink-soft/80">
            {invitation.copy.openHintSub}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-strawberry/40">
            <Daisy className="w-3.5" />
            <span className="font-serif text-[8px] uppercase tracking-[0.24em]">
              {invitation.copy.footerNote}
            </span>
            <Daisy className="w-3.5" />
          </div>
        </motion.footer>
      </div>
    </main>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
      <path
        d="M12 21C5 16 2 12 2 8.2 2 5.4 4.2 3 7 3c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 2.8 0 5 2.4 5 5.2C22 12 19 16 12 21Z"
        fill="currentColor"
      />
    </svg>
  )
}


