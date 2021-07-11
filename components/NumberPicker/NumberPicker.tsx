import { Picker, StyleProp, TextStyle } from 'react-native'
import React, { useState } from 'react'

import times from 'times-loop'

type PropsType = {
  value: number
  maxValue: number
  minValue: number
  onValueChange?: (value: number) => void
  itemStyle?: StyleProp<TextStyle>
  style?: StyleProp<TextStyle>
}

export default function NumberPicker(props: PropsType) {
  const [value, setValue] = useState<number>(props.value)

  function handleValueChange(value: number) {
    setValue(value)
    if (!props.onValueChange) return
    props.onValueChange(value)
  }

  return (
    <Picker
      onValueChange={handleValueChange}
      selectedValue={value}
      style={props.style}
      itemStyle={props.itemStyle}
    >
      {times(props.maxValue - props.minValue + 1, (i: number) => (
        <Picker.Item key={i} label={i.toString()} value={i} />
      ))}
    </Picker>
  )
}
