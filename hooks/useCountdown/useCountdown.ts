import { useEffect, useState } from 'react'

import Countdown from './src/Countdown'

export enum STATES {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
  PAUSED = 'PAUSED',
}

export default function useCountdown(initialDuration_: number) {
  const [initialDuration, setInitialDuration] = useState(initialDuration_)
  const [remainingDuration, setRemainingDuration] = useState(initialDuration_)
  const [timerState, setTimerState] = useState(STATES.STOPPED)
  const [countdown] = useState(new Countdown(initialDuration))

  useEffect(() => {
    // mount
    countdown.on('tick', setRemainingDuration)

    return () => {
      // unmount
      countdown.off('tick', setRemainingDuration)
    }
  }, [])

  return {
    setInitialDuration,
    initialDuration,
    remainingDuration,
    timerState,
    startTimer: () => {
      if (countdown.start()) {
        setTimerState(STATES.STARTED)
      }
    },
    cancelTimer: () => {
      if (countdown.cancel()) {
        setTimerState(STATES.STOPPED)
      }
    },
    pauseTimer: () => {
      if (countdown.pause()) {
        setTimerState(STATES.PAUSED)
      }
    },
  }
}
