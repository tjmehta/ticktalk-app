import * as COLORS from '~/const/colors'

import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import TimerButton, { THEMES } from '~/components/TimerButton'
import switchReturn, { DEFAULT } from '~/utils/switchReturn'
import useCountdown, { STATES } from '~/hooks/useCountdown'
import useDeviceOrientation, {
  ORIENTATIONS,
} from '~/hooks/useDeviceOrientation'

import React from 'react'
import TimerDisplay from '~/components/TimerDisplay'
import TimerScreenDuration from './TimerScreenDuration'
import TimerScreenTimerPicker from './TimerScreenTimerPicker'
import createGetStyles from '~/utils/createGetStyles'

type PropsType = {}

const store = {
  initialDuration: 0,
}

export default function TimerScreen(props: PropsType) {
  const {
    initialDuration,
    setInitialDuration,
    remainingDuration,
    timerState,
    startTimer,
    cancelTimer,
    pauseTimer,
  } = useCountdown(store.initialDuration)
  const orientation = useDeviceOrientation()

  console.log('TimerScreen', { initialDuration, remainingDuration, timerState })

  return (
    <View style={getStyles('container')}>
      {switchReturn(timerState, {
        [STATES.STOPPED]: () => (
          <TimerScreenTimerPicker
            onValueChange={value => setInitialDuration(value)}
            value={initialDuration}
          />
        ),
        [DEFAULT]: () => <TimerScreenDuration value={remainingDuration} />,
      })}
      <View style={getStyles('controlsContainer')}>
        <View style={getStyles('controlsChild')}>
          <TimerButton
            theme={
              timerState === STATES.STOPPED
                ? THEMES.CANCEL_DISABLED
                : THEMES.CANCEL
            }
            onPress={() => cancelTimer()}
          />
        </View>
        <View style={[getStyles('controlsChild', 'timeContainer')]} />
        <View style={getStyles('controlsChild')}>
          {switchReturn(timerState, {
            [STATES.STOPPED]: () => (
              <TimerButton theme={THEMES.START} onPress={() => startTimer()} />
            ),
            [STATES.STARTED]: () => (
              <TimerButton theme={THEMES.PAUSE} onPress={() => pauseTimer()} />
            ),
            [STATES.PAUSED]: () => (
              <TimerButton theme={THEMES.RESUME} onPress={() => startTimer()} />
            ),
          })}
        </View>
      </View>
    </View>
  )
}

TimerScreen.navigationOptions = {
  title: '⏲',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK,
  },

  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 216,
  },

  countdown: {
    color: COLORS.WHITE,
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    fontSize: 40,
  },

  hide: {
    display: 'none',
  },

  timerPicker: {
    color: COLORS.WHITE,
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    fontSize: 24,
  },

  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  controlsChild: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pause: {
    color: COLORS.WHITE,
  },
})

const portraitStyles = StyleSheet.create({
  controlsContainer: {
    paddingLeft: 25,
    paddingRight: 25,
  },

  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 50,
    paddingRight: 50,
  },
})

const landscapeStyles = StyleSheet.create({
  controlsContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  timeContainer: {
    flex: 1.75,
  },
})

const getStyles = createGetStyles({ styles, landscapeStyles, portraitStyles })
