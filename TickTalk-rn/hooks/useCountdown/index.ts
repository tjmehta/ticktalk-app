import {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import Countdown from './src/countdown'
import { CountdownRefType } from '~/hooks/useCountdown'

export type CountdownRefType = Countdown | null

export default function useCountdown(
  duration: number,
  ref: RefObject<CountdownRefType>
) {
  const countdownRef = useRef(ref.current)
  const [remainingDuration, setRemainingDuration] = useState(duration)

  useEffect(() => {
    console.log('useCountdown', 'MOUNT', countdownRef.current)
    if (!countdownRef.current) {
      countdownRef.current = new Countdown(duration)
      countdownRef.current.on('tick', setRemainingDuration)
    } else {
      countdownRef.current.set(duration)
      countdownRef.current.off('tick', setRemainingDuration)
    }
    return () => {
      console.log('useCountdown', 'UN_MOUNT', countdownRef.current)
      if (countdownRef.current) {
        countdownRef.current.cancel()
        countdownRef.current.off('tick', setRemainingDuration)
      }
    }
  }, [])

  useImperativeHandle(ref, () => countdownRef.current)

  return remainingDuration
}
