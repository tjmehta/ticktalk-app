import React, { Component, useState } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'

import NumberPicker from '~/components/NumberPicker'
import l10n from '~/const/l10n'

type PropsType = {
  style?: StyleProp<TextStyle>
  value: number
  onValueChange?: (selectedValue: number) => void
}

export default function TimerPicker(props: PropsType) {
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
    <View style={styles.container}>
      <View style={styles.input}>
        <NumberPicker
          style={[styles.picker, props.style]}
          itemStyle={props.style}
          minValue={0}
          maxValue={23}
          onValueChange={hours => {
            setHours(hours)
            handleValueChange(hours, minutes, seconds)
          }}
          value={hours}
        />
        <Text style={[styles.text, props.style]}>{l10n.hours}</Text>
      </View>
      <View style={styles.input}>
        <NumberPicker
          style={[styles.picker, props.style]}
          itemStyle={props.style}
          minValue={0}
          maxValue={60}
          onValueChange={minutes => {
            setMinutes(minutes)
            handleValueChange(hours, minutes, seconds)
          }}
          value={minutes}
        />
        <Text style={[styles.text, props.style]}>{l10n.min}</Text>
      </View>
      <View style={styles.input}>
        <NumberPicker
          style={[styles.picker, props.style]}
          itemStyle={props.style}
          minValue={0}
          maxValue={60}
          onValueChange={seconds => {
            setSeconds(seconds)
            handleValueChange(hours, minutes, seconds)
          }}
          value={seconds}
        />
        <Text style={[styles.text, props.style]}>{l10n.sec}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 35,
  },
  text: {
    textAlign: 'left',
  },
})
