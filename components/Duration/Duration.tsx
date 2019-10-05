import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'

import React from 'react'
import formatDuration from './src/formatDuration'

type PropsType = {
  value: number
  format?: string
  style?: StyleProp<TextStyle>
}

const defaultProps = {
  format: 'hh:mm:ss:SS',
}

export default function Duration(props: PropsType) {
  const { value, format, style } = {
    ...defaultProps,
    ...props,
  }

  return <Text style={style}>{formatDuration(format, value)}</Text>
}
