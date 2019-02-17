import 'moment-duration-format'

import React, { RefObject, forwardRef, useImperativeHandle } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import useCountdown, { CountdownRefType } from '~/hooks/useCountdown'

import moment from 'moment'

export type CountdownRefType = CountdownRefType

type PropsType = {
  initialDuration: number
  onComplete: () => void
  style?: StyleProp<TextStyle>
}

function Countdown(props: PropsType, ref: RefObject<CountdownRefType>) {
  const remainingDuration = useCountdown(props.initialDuration, ref)

  if (remainingDuration === 0 && props.onComplete) {
    props.onComplete()
  }

  return (
    <Text style={[styles.timer, props.style]}>
      {formatDuration('hh:mm:ss:SS', remainingDuration)}
    </Text>
  )
}
// @ts-ignore - forwardRef expects handle to be an element, but in this case it is custom object
export default forwardRef(Countdown)

function formatDuration(format: string, duration: number): string {
  duration = Math.max(duration, 0)

  return moment.duration(duration, 'milliseconds').format(format, {
    trim: false,
  })
}

const styles = StyleSheet.create({
  timer: {},
})
