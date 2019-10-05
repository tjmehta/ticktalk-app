import React, { useEffect, useState } from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'

import NumberPicker from '../NumberPicker'
import createGetThemeStyles from '~/utils/createGetThemeStyles'
import quickStyle from '~/utils/quickStyle'

export type PropsType = {
  label: string
  minValue: number
  maxValue: number
  onValueChange: (value: number) => void
  styles: {
    container: StyleProp<ViewStyle>
    font: StyleProp<TextStyle>
    label: StyleProp<TextStyle>
    picker: StyleProp<ViewStyle>
    item: StyleProp<ViewStyle>
  }
  value: number
  pluralLabel?: string
}

export default function NumberFormGroup(props: PropsType) {
  const [label, setLabel] = useState<string>(getLabel(props.value))
  const styles = props.styles

  function getLabel(value: number) {
    if (!props.pluralLabel) return props.label
    const isPlural = value === 0 || value > 1
    return isPlural ? props.pluralLabel : props.label
  }

  function handleValueChange(value: number) {
    setLabel(getLabel(value))
    if (!props.onValueChange) return
    props.onValueChange(value)
  }

  return (
    <View style={styles.container}>
      <NumberPicker
        style={[styles.picker]}
        itemStyle={[styles.font, styles.item]}
        minValue={props.minValue}
        maxValue={props.maxValue}
        onValueChange={handleValueChange}
        value={props.value}
      />
      <Text style={[styles.font, styles.label]}>{label}</Text>
    </View>
  )
}
