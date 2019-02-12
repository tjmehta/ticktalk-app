import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  View,
} from 'react-native'

import * as COLORS from '~/const/colors'

type PropsType = {
  label: string
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
}

export default class CircleButton extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          color={COLORS.WHITE}
          title={this.props.label}
          onPress={this.props.onPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0.5,
    backgroundColor: 'red',
  },
})
