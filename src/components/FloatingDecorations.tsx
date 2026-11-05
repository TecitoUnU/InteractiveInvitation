import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Daisy } from './illustrations/Daisy'
import { Strawberry } from './illustrations/Strawberry'
import { Vine } from './illustrations/Vine'

/**
 * Decoración flotante de la página de invitación. Tiene un parallax
 * muy sutil y se oculta parcialmente en móvil para no tapar la tarjeta.
 */
export function FloatingDecorations() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const slow = useTransform(scrollY, [0, 1600], [0, -70])
  const medium = useTransform(scrollY, [0, 1600], [0, -130])
  const fast = useTransform(scrollY, [0, 1600], [0, -190])

  const parallax = (value: typeof slow) => (reduceMotion ? undefined : value)

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ramas del jardín */}
      <motion.div
        style={{ y: parallax(slow) }}
        className="absolute -left-10 top-16 hidden w-32 opacity-70 sm:block lg:-left-4 lg:w-40"
      >
        <Vine className="w-full origin-top animate-sway-slow" />
      </motion.div>
      <motion.div
        style={{ y: parallax(slow) }}
        className="absolute -right-10 top-10 hidden w-28 opacity-70 sm:block lg:-right-2 lg:w-36"
      >
        <Vine mirrored className="w-full origin-top animate-sway-slow" />
      </motion.div>

      {/* Fresas y flores alrededor */}
      <motion.div
        style={{ y: parallax(medium) }}
        className="absolute left-[4%] top-[26%] hidden w-20 opacity-80 md:block lg:left-[10%] lg:w-24"
      >
        <div className="animate-float-soft">
          <Strawberry className="w-full -rotate-12" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: parallax(fast) }}
        className="absolute right-[5%] top-[14%] hidden w-14 opacity-80 md:block lg:right-[12%] lg:w-16"
      >
        <div className="animate-sway-slow">
          <Daisy className="w-full" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: parallax(medium) }}
        className="absolute bottom-[16%] right-[4%] hidden w-24 opacity-75 md:block lg:right-[9%] lg:w-28"
      >
        <div className="animate-float-soft">
          <Strawberry className="w-full rotate-[14deg]" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: parallax(fast) }}
        className="absolute bottom-[22%] left-[3%] hidden w-16 opacity-75 md:block lg:left-[8%] lg:w-20"
      >
        <div className="animate-sway">
          <Daisy className="w-full" />
        </div>
      </motion.div>

      {/* Detalles pequeños visibles en móvil, siempre en los bordes */}
      <div className="absolute left-1 top-[18%] w-8 opacity-60 sm:hidden">
        <Strawberry className="w-full -rotate-12" />
      </div>
      <div className="absolute right-1 top-[38%] w-7 opacity-60 sm:hidden">
        <Daisy className="w-full" />
      </div>
      <div className="absolute bottom-[12%] right-1 w-9 opacity-60 sm:hidden">
        <Strawberry className="w-full rotate-12" />
      </div>

      {/* Destellos */}
      <div className="absolute left-[7%] top-[48%] hidden h-2 w-2 rounded-full bg-white/80 blur-[0.5px] md:block" />
      <div className="absolute right-[8%] top-[58%] hidden h-1.5 w-1.5 rounded-full bg-blush md:block" />
      <div className="absolute left-[13%] top-[72%] hidden h-2 w-2 rounded-full bg-gold/70 md:block" />
    </div>
  )
}
