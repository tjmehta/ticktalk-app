import * as COLORS from '~/const/colors'

import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import React, { PureComponent } from 'react'

type PropsType = {
  accessibilityLabel?: string
  color?: string
  backgroundColor?: string
  disabled?: boolean
  size: number
  title: string
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
}

export default function CircleButton(props: PropsType) {
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: props.backgroundColor,
    borderRadius: props.size,
    height: props.size,
    width: props.size,
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <View style={containerStyle}>
      <Button
        accessibilityLabel={props.accessibilityLabel || props.title}
        color={props.color}
        disabled={props.disabled}
        onPress={props.onPress}
        title={props.title}
      />
    </View>
  )
}
