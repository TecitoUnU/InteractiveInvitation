import { motion, useReducedMotion } from 'motion/react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { invitation } from '../config/invitation'
import { cn } from '../lib/cn'
import type { EnvelopeHandle, EnvelopeStage } from '../types'
import { WaxSeal } from './WaxSeal'
import { Daisy } from './illustrations/Daisy'
import { Strawberry } from './illustrations/Strawberry'

interface EnvelopeProps {
  className?: string
  onOpenStart?: () => void
  onOpened?: () => void
  autoOpen?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Sobre rojo con solapa 3D, carta interior y sello de cera.
 * La coreografía completa dura ~2,7 s (menos con reduced motion).
 */
export const Envelope = forwardRef<EnvelopeHandle, EnvelopeProps>(
  function Envelope({ className, onOpenStart, onOpened, autoOpen = false }, ref) {
    const [stage, setStage] = useState<EnvelopeStage>('closed')
    const stageRef = useRef<EnvelopeStage>('closed')
    const timers = useRef<number[]>([])
    const reduceMotion = useReducedMotion()

    const callbacks = useRef({ onOpenStart, onOpened })
    callbacks.current = { onOpenStart, onOpened }

    const open = useCallback(() => {
      if (stageRef.current !== 'closed') return

      const speed = reduceMotion ? 0.3 : 1
      const goTo = (ms: number, next: EnvelopeStage) => {
        timers.current.push(
          window.setTimeout(() => {
            stageRef.current = next
            setStage(next)
          }, ms * speed),
        )
      }

      callbacks.current.onOpenStart?.()
      stageRef.current = 'shake'
      setStage('shake')

      goTo(430, 'break')
      goTo(720, 'open')
      goTo(1280, 'rise')
      goTo(2100, 'zoom')

      timers.current.push(
        window.setTimeout(
          () => callbacks.current.onOpened?.(),
          2780 * speed,
        ),
      )
    }, [reduceMotion])

    useImperativeHandle(ref, () => ({ open }), [open])

    // Reproducción automática al volver a ver la animación.
    useEffect(() => {
      if (!autoOpen) return
      const timer = window.setTimeout(open, 850)
      return () => window.clearTimeout(timer)
    }, [autoOpen, open])

    useEffect(() => {
      const pending = timers.current
      return () => {
        pending.forEach((timer) => window.clearTimeout(timer))
      }
    }, [])

    const isOpening = stage !== 'closed'
    const flapOpen =
      stage === 'open' || stage === 'rise' || stage === 'zoom'
    const letterRising = stage === 'rise' || stage === 'zoom'
    const zooming = stage === 'zoom'

    const letterAnimate = zooming
      ? { y: '-38%', scale: 1.95, rotate: -0.4 }
      : stage === 'rise'
        ? { y: '-58%', scale: 1.04, rotate: -1 }
        : { y: '0%', scale: 1, rotate: 0 }

    return (
      <div
        className={cn('envelope-stage', className)}
        aria-label="Sobre de invitación"
      >
        <motion.div
          className="envelope-shadow"
          animate={{ opacity: zooming ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="envelope-camera"
          animate={zooming ? { scale: 1.18, y: 8 } : { scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: EASE }}
        >
          <motion.div
            className="envelope-float"
            animate={
              isOpening || reduceMotion
                ? { y: 0, rotate: 0 }
                : { y: [0, -7, 0], rotate: [-0.4, 0.5, -0.4] }
            }
            transition={
              isOpening || reduceMotion
                ? { duration: 0.35, ease: EASE }
                : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <div className="envelope">
              {/* Parte trasera e interior */}
              <motion.div
                className="envelope-back"
                animate={{ opacity: zooming ? 0 : 1 }}
                transition={{ duration: 0.35 }}
              />
              <motion.div
                className="envelope-inside"
                animate={{ opacity: zooming ? 0 : 1 }}
                transition={{ duration: 0.35 }}
              />

              {/* Carta */}
              <motion.div
                className="envelope-letter"
                animate={letterAnimate}
                transition={{
                  duration: reduceMotion ? 0.4 : zooming ? 0.8 : 0.9,
                  ease: EASE,
                }}
              >
                <div className="letter-paper">
                  <div className="letter-vichy" />

                  <div className="relative z-10 flex w-full flex-col items-center px-3 text-center">
                    <span className="font-serif text-[7px] font-semibold uppercase tracking-[0.34em] text-strawberry/70 sm:text-[8px]">
                      Estás invitada
                    </span>
                    <p className="mt-0.5 font-script text-[clamp(16px,4.6vw,22px)] leading-none text-ink-soft">
                      Para ti
                    </p>
                    <p className="mt-0.5 font-display text-[clamp(24px,7.2vw,36px)] leading-[1.1] text-strawberry">
                      {invitation.celebrant.name}
                    </p>
                    <div className="dotted-rule my-1.5 w-14" />
                    <p className="font-serif text-[7px] font-semibold uppercase tracking-[0.22em] text-ink-soft sm:text-[8px]">
                      {invitation.event.dateLabel} · {invitation.event.timeLabel}
                    </p>
                    <div className="mt-1 flex items-end justify-center gap-1">
                      <Strawberry className="w-4 sm:w-5" />
                      <Daisy className="w-3.5 sm:w-4" />
                      <Strawberry className="w-3 rotate-[10deg] sm:w-4" />
                    </div>
                  </div>

                  <Daisy className="absolute -bottom-2 -left-2 w-7 opacity-70" />
                  <Daisy className="absolute -right-2 -top-2 w-6 opacity-60" />
                </div>
              </motion.div>

              {/* Bolsillo frontal */}
              <motion.div
                className="envelope-pocket"
                animate={{ opacity: zooming ? 0 : 1 }}
                transition={{ duration: 0.35 }}
              >
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pocket-folds"
                  aria-hidden="true"
                >
                  <path
                    d="M0 0 50 56 100 0"
                    fill="none"
                    stroke="rgba(255,255,255,0.26)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M0 100 50 56 100 100"
                    fill="none"
                    stroke="rgba(94,4,17,0.35)"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M0 0 50 56 100 0"
                    fill="rgba(255,255,255,0.04)"
                  />
                  <path
                    d="M0 100 50 56 100 100"
                    fill="rgba(94,4,17,0.1)"
                  />
                </svg>
                <div className="pocket-shine" />
              </motion.div>

              <motion.div
                className="envelope-stitch"
                animate={{ opacity: zooming ? 0 : 1 }}
                transition={{ duration: 0.35 }}
              />

              {/* Solapa 3D con el sello */}
              <motion.div
                className="envelope-flap"
                style={{ zIndex: letterRising ? 1 : 6 }}
                animate={{
                  rotateX: flapOpen ? -178 : 0,
                  opacity: zooming ? 0 : 1,
                }}
                transition={{
                  rotateX: {
                    duration: reduceMotion ? 0.35 : 0.95,
                    ease: EASE,
                  },
                  opacity: { duration: 0.3 },
                }}
              >
                <div className="flap-shape">
                  <div className="flap-face flap-face--front" />
                  <div className="flap-face flap-face--back">
                    <div className="absolute inset-x-0 top-[34%] flex flex-col items-center text-strawberry-deep/70">
                      <span className="font-script text-[clamp(15px,4vw,20px)] leading-none">
                        con cariño
                      </span>
                      <span className="mt-1 font-serif text-[6px] uppercase tracking-[0.28em]">
                        para {invitation.celebrant.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flap-seal-anchor">
                  <WaxSeal stage={stage} onOpen={open} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <span className="sr-only" role="status" aria-live="polite">
          {isOpening ? 'Abriendo la invitación' : 'Invitación cerrada'}
        </span>
      </div>
    )
  },
)
