import React, { useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import NumberFormGroup from '../NumberFormGroup'
import l10n from '~/const/l10n'

type PropsType = {
  value: number
  onValueChange?: (selectedValue: number) => void
  digitStyles: {
    container: StyleProp<ViewStyle>
    font: StyleProp<ViewStyle>
    label: StyleProp<ViewStyle>
    picker: StyleProp<ViewStyle>
    item: StyleProp<ViewStyle>
  }
  style: StyleProp<ViewStyle>
}

export default function TimerPicker(props: PropsType) {
  console.log('TimerPicker', { value: props.value })
  const [hours, setHours] = useState<number>(
    Math.floor(props.value / 60 / 60 / 1000)
  )
  const [minutes, setMinutes] = useState<number>(props.value % (60 * 60 * 1000))
  const [seconds, setSeconds] = useState<number>(props.value % (60 * 1000))

  const handleValueChange = (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    if (!props.onValueChange) return
    const value = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
    props.onValueChange(value)
  }

  return (
    <View style={props.style}>
      <NumberFormGroup
        label={l10n('hour')}
        minValue={0}
        maxValue={23}
        onValueChange={hours => {
          setHours(hours)
          handleValueChange(hours, minutes, seconds)
        }}
        value={hours}
        styles={props.digitStyles}
        pluralLabel={l10n('hours')}
      />
      <NumberFormGroup
        label={l10n('min')}
        minValue={0}
        maxValue={60}
        onValueChange={minutes => {
          setMinutes(minutes)
          handleValueChange(hours, minutes, seconds)
        }}
        value={hours}
        styles={props.digitStyles}
      />
      <NumberFormGroup
        label={l10n('sec')}
        minValue={0}
        maxValue={60}
        onValueChange={seconds => {
          setSeconds(seconds)
          handleValueChange(hours, minutes, seconds)
        }}
        value={hours}
        styles={props.digitStyles}
      />
    </View>
  )
}
