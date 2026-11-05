import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useState } from 'react'
import { Invitation } from './components/Invitation'
import { MusicControl } from './components/MusicControl'
import { WelcomeScreen } from './components/WelcomeScreen'

type Screen = 'welcome' | 'invitation'

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [runId, setRunId] = useState(0)
  const [autoOpen, setAutoOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const handleOpened = useCallback(() => {
    setAutoOpen(false)
    setScreen('invitation')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleReplay = useCallback(() => {
    setRunId((id) => id + 1)
    setAutoOpen(true)
    setScreen('welcome')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="relative min-h-[100svh] overflow-x-clip">
      <MusicControl />

      <AnimatePresence mode="wait" initial={false}>
        {screen === 'welcome' ? (
          <motion.div
            key={`welcome-${runId}`}
            exit={{
              opacity: 0,
              scale: reduceMotion ? 1 : 1.025,
            }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.38,
              ease: 'easeInOut',
            }}
          >
            <WelcomeScreen autoOpen={autoOpen} onOpened={handleOpened} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Invitation onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
