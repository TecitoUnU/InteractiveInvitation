import { motion, useReducedMotion } from 'motion/react'
import { useId } from 'react'
import { cn } from '../lib/cn'
import type { EnvelopeStage } from '../types'

interface WaxSealProps {
  stage: EnvelopeStage
  onOpen: () => void
}

/**
 * Sello de cera con fresa grabada. Vibra, se agrieta y se parte
 * en dos mitades antes de que se abra la solapa.
 */
export function WaxSeal({ stage, onOpen }: WaxSealProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const waxId = `wax-${uid}`
  const rimId = `wax-rim-${uid}`
  const reduceMotion = useReducedMotion()

  const isClosed = stage === 'closed'
  const isShaking = stage === 'shake'
  const isBroken = stage !== 'closed' && stage !== 'shake'
  const showHalo = isClosed

  return (
    <div className="wax-seal">
      {showHalo ? <span className="seal-halo" aria-hidden="true" /> : null}

      <button
        type="button"
        className={cn('wax-seal__button', isShaking && 'seal-shake')}
        onClick={onOpen}
        disabled={!isClosed}
        aria-label="Abrir la invitación"
      >
        <span className="sr-only">Toca el sello para abrir la invitación</span>

        {/* Mitad izquierda */}
        <motion.span
          className="wax-seal__half wax-seal__half--left"
          animate={
            isBroken
              ? {
                  x: -13,
                  y: 4,
                  rotate: -16,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.55,
            delay: isBroken ? 0.16 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SealSvg waxId={waxId} rimId={rimId} />
        </motion.span>

        {/* Mitad derecha */}
        <motion.span
          className="wax-seal__half wax-seal__half--right"
          animate={
            isBroken
              ? {
                  x: 13,
                  y: -3,
                  rotate: 17,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.55,
            delay: isBroken ? 0.16 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SealSvg waxId={waxId} rimId={rimId} />
        </motion.span>

        {/* Grieta que se dibuja al romperse */}
        <svg
          viewBox="0 0 100 100"
          className="wax-seal__crack"
          aria-hidden="true"
        >
          <motion.path
            d="M50 6 45 24l7 12-9 14 8 12-6 15 5 11"
            fill="none"
            stroke="#5E0411"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isBroken
                ? { pathLength: 1, opacity: 0.75 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: reduceMotion ? 0.1 : 0.32, ease: 'easeOut' }}
          />
          <motion.path
            d="M50 6 45 24l7 12-9 14 8 12-6 15 5 11"
            fill="none"
            stroke="#FFD6E5"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isBroken
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: reduceMotion ? 0.1 : 0.32,
              delay: 0.03,
              ease: 'easeOut',
            }}
          />
        </svg>
      </button>
    </div>
  )
}

function SealSvg({
  waxId,
  rimId,
}: {
  waxId: string
  rimId: string
}) {
  return (
    <svg viewBox="0 0 100 100" className="wax-seal__svg" aria-hidden="true">
      <defs>
        <radialGradient id={waxId} cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#F04A62" />
          <stop offset="38%" stopColor="#D01836" />
          <stop offset="100%" stopColor="#920A20" />
        </radialGradient>
        <radialGradient id={rimId} cx="50%" cy="50%" r="55%">
          <stop offset="72%" stopColor="transparent" />
          <stop offset="88%" stopColor="rgba(94,4,17,0.35)" />
          <stop offset="100%" stopColor="rgba(94,4,17,0.05)" />
        </radialGradient>
      </defs>

      {/* Blob irregular de cera */}
      <path
        d="M50 3c9-1 17 1 24 6 8 6 14 14 17 24 3 9 2 19-1 28-3 10-9 18-17 24-8 6-17 9-27 8-10-1-20-5-27-12C12 74 7 65 6 55c-1-11 2-22 8-31C20 15 29 9 39 6c4-1 7-3 11-3Z"
        fill={`url(#${waxId})`}
        stroke="#7E0619"
        strokeWidth="1.4"
      />
      <path
        d="M50 3c9-1 17 1 24 6 8 6 14 14 17 24 3 9 2 19-1 28-3 10-9 18-17 24-8 6-17 9-27 8-10-1-20-5-27-12C12 74 7 65 6 55c-1-11 2-22 8-31C20 15 29 9 39 6c4-1 7-3 11-3Z"
        fill={`url(#${rimId})`}
      />

      {/* Brillo */}
      <ellipse
        cx="35"
        cy="26"
        rx="17"
        ry="9"
        fill="#FFD6E5"
        opacity="0.25"
        transform="rotate(-28 35 26)"
      />
      <path
        d="M27 76c7 7 16 11 26 10"
        fill="none"
        stroke="#FFD6E5"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.2"
      />

      {/* Círculo grabado */}
      <circle
        cx="50"
        cy="51"
        r="30"
        fill="none"
        stroke="#FFB3C6"
        strokeWidth="1.2"
        strokeDasharray="2.5 4"
        opacity="0.45"
      />

      {/* Fresa grabada */}
      <g transform="translate(50 52) scale(.42)">
        <path
          d="M0-8C-19-8-31 3-33 18c-2 18 16 36 33 48 17-12 35-30 33-48C31 3 19-8 0-8Z"
          fill="#FFD6E5"
          opacity="0.92"
        />
        <path
          d="M0-8C-3-18-11-23-19-19c3 10 10 14 19 15Zm0 0C3-18 11-23 19-19c-3 10-10 14-19 15Zm-4 3c-12-8-23-3-24 6 10 4 19 1 24-6Zm8 0c12-8 23-3 24 6-10 4-19 1-24-6Z"
          fill="#7FAF5B"
          opacity="0.95"
        />
        <g fill="#C8102E" opacity="0.55">
          <circle cx="-10" cy="16" r="2.4" />
          <circle cx="10" cy="16" r="2.4" />
          <circle cx="0" cy="28" r="2.4" />
          <circle cx="-16" cy="30" r="2.4" />
          <circle cx="16" cy="30" r="2.4" />
          <circle cx="0" cy="43" r="2.4" />
        </g>
      </g>

      {/* Puntitos del borde */}
      <g fill="#FFB3C6" opacity="0.35">
        <circle cx="50" cy="11" r="1.3" />
        <circle cx="67" cy="17" r="1.3" />
        <circle cx="82" cy="31" r="1.3" />
        <circle cx="87" cy="50" r="1.3" />
        <circle cx="80" cy="69" r="1.3" />
        <circle cx="64" cy="83" r="1.3" />
        <circle cx="44" cy="87" r="1.3" />
        <circle cx="27" cy="79" r="1.3" />
        <circle cx="16" cy="64" r="1.3" />
        <circle cx="13" cy="43" r="1.3" />
        <circle cx="21" cy="25" r="1.3" />
      </g>
    </svg>
  )
}
