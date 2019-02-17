import * as COLORS from '~/const/colors'

import Countdown, { CountdownRefType } from '~/components/Countdown'
import { Platform, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'

import CircleButton from '~/components/CircleButton'
import TimerPicker from '~/components/TimerPicker'
import l10n from '~/const/l10n'
import switchReturn from '~/utils/switch_return'

enum STATES {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
  PAUSED = 'PAUSED',
}

type PropsType = {}

export default function TimerScreen(props: PropsType) {
  const countdownRef = useRef<CountdownRefType>(null)
  const [timerValue, setTimerValue] = useState<number>(0)
  const [timerState, setTimerState] = useState<STATES>(STATES.STOPPED)

  const timerIsStopped = timerState === STATES.STOPPED
  console.log('TIMER_STATE', timerState, timerValue, countdownRef.current)
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <TimerPicker
          onValueChange={value => {
            console.log('VALUE', value)
            setTimerValue(value)
          }}
          style={[styles.timer, timerIsStopped ? null : styles.hide]}
          value={timerValue}
        />
        <Countdown
          initialDuration={timerValue}
          onComplete={() => setTimerState(STATES.STOPPED)}
          ref={countdownRef}
          style={[styles.timer, timerIsStopped ? styles.hide : null]}
        />
      </View>
      <View style={styles.controlsContainer}>
        <CircleButton
          label="cancel"
          onPress={() => {
            const countdown = countdownRef.current
            console.log('CANCEL PRESS', countdown)
            if (!countdown) return
            countdown.cancel()
            setTimerState(STATES.STOPPED)
          }}
        />
        {switchReturn(timerState, {
          [STATES.STOPPED]: () => (
            <CircleButton
              label="start"
              onPress={() => {
                const countdown = countdownRef.current
                console.log('START PRESS', countdown, timerValue)
                if (!countdown) return
                countdown.set(timerValue)
                countdown.start()
                setTimerState(STATES.STARTED)
              }}
            />
          ),
          [STATES.STARTED]: () => (
            <CircleButton
              label="pause"
              onPress={() => {
                const countdown = countdownRef.current
                console.log('PAUSE PRESS', countdown)
                if (!countdown) return
                countdown.pause()
                setTimerState(STATES.PAUSED)
              }}
            />
          ),
          [STATES.PAUSED]: () => (
            <CircleButton
              label="resume"
              onPress={() => {
                const countdown = countdownRef.current
                console.log('RESUME PRESS', countdown)
                if (!countdown) return
                countdown.start()
                setTimerState(STATES.STARTED)
              }}
            />
          ),
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK,
  },

  hide: {
    display: 'none',
  },

  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: 50,
    paddingRight: 50,
  },

  timer: {
    color: COLORS.WHITE,
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    fontSize: 24,
  },

  controlsContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  pause: {
    color: COLORS.WHITE,
  },
})
