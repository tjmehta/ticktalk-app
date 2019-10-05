import * as COLORS from '~/const/colors'

import { Platform, StyleSheet, View } from 'react-native'
import React, { Ref, forwardRef } from 'react'

import Duration from '~/components/Duration'
import TimerPicker from '~/components/TimerPicker'
import createGetStyles from '~/utils/createGetStyles'

type PropsType = {
  state: STATES
  value: number
  onComplete: () => void
  onValueChange: (value: number) => void
}

export default function TimerDisplay(props: PropsType) {
  const isStopped = props.state === STATES.STOPPED

  return (
    <View style={getStyles('container')}>
      <TimerPicker
        onValueChange={props.onValueChange}
        style={[getStyles('pickerContainer'), isStopped ? null : styles.hide]}
        digitStyles={{
          container: getDigitStyles('container'),
          font: getDigitStyles('font'),
          label: getDigitStyles('label'),
          picker: getDigitStyles('picker'),
          item: getDigitStyles('item'),
        }}
        value={props.value}
      />
      <View
        style={[
          getStyles('countdownContainer'),
          isStopped ? styles.hide : null,
        ]}
      >
        <Duration duration={props.value} style={getStyles('countdown')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  },

  hide: {
    display: 'none',
  },

  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})
const landscapeStyles = StyleSheet.create({
  container: {
    ...styles.container,
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  countdown: {
    ...styles.countdown,
    fontSize: 40,
  },
})
const portraitStyles = StyleSheet.create({
  container: {
    ...styles.container,
    paddingLeft: 25,
    paddingRight: 25,
  },
  countdown: {
    ...styles.countdown,
    fontSize: 40,
  },
})

const getStyles = createGetStyles({
  styles: styles,
  landscapeStyles,
  portraitStyles,
})
