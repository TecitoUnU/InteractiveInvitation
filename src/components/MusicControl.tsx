import { Music2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { invitation } from '../config/invitation'
import { cn } from '../lib/cn'

/**
 * Control de música ambiental. El audio sólo se reproduce después
 * de un clic del visitante, respetando las restricciones del navegador.
 */
export function MusicControl() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.loop = invitation.music.loop

    return () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current)
      audio.pause()
    }
  }, [])

  const fadeTo = (target: number) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) window.clearInterval(fadeRef.current)

    fadeRef.current = window.setInterval(() => {
      const step = 0.04
      if (Math.abs(audio.volume - target) <= step) {
        audio.volume = target
        if (fadeRef.current) window.clearInterval(fadeRef.current)
        fadeRef.current = null
        return
      }
      audio.volume =
        audio.volume < target
          ? Math.min(target, audio.volume + step)
          : Math.max(target, audio.volume - step)
    }, 70)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      fadeTo(0)
      window.setTimeout(() => audio.pause(), 350)
      setPlaying(false)
      return
    }

    try {
      audio.volume = 0
      await audio.play()
      setFailed(false)
      setPlaying(true)
      fadeTo(invitation.music.volume)
    } catch {
      setFailed(true)
      setPlaying(false)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={invitation.music.src}
        preload="none"
        loop={invitation.music.loop}
      />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={
          failed
            ? 'No se pudo cargar la música'
            : playing
              ? 'Pausar música ambiental'
              : 'Activar música ambiental'
        }
        title={failed ? 'No se pudo cargar el audio' : invitation.music.title}
        className={cn(
          'group fixed right-4 z-50 flex h-11 items-center gap-2 rounded-full border border-strawberry/20 bg-cream/90 px-3 text-strawberry-deep shadow-soft backdrop-blur-md transition-colors hover:bg-white sm:right-5',
          'top-[max(0.85rem,env(safe-area-inset-top))]',
          playing && 'border-strawberry/45 bg-white',
        )}
      >
        {failed ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Music2
            className={cn('h-4 w-4', playing && 'text-strawberry')}
            aria-hidden="true"
          />
        )}

        <span className="flex h-4 w-4 items-end justify-center gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className={cn(
                'w-[2.5px] origin-bottom rounded-full bg-strawberry/80 transition-opacity',
                playing ? 'opacity-100' : 'h-1 opacity-40',
              )}
              style={
                playing
                  ? {
                      height: `${6 + bar * 3}px`,
                      animation: `equalize ${0.7 + bar * 0.18}s ease-in-out infinite`,
                      animationDelay: `${bar * 0.12}s`,
                    }
                  : undefined
              }
            />
          ))}
        </span>

        <span className="hidden font-serif text-[9px] font-semibold uppercase tracking-[0.18em] sm:inline">
          {failed ? 'Sin audio' : 'Música'}
        </span>
      </button>
    </>
  )
}
