import React, { PureComponent } from 'react'
import {
  View,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'

import l10n from '~/const/l10n'
import NumberPicker from '~/components/NumberPicker'

type PropsType = {
  style?: StyleProp<TextStyle>
}

export default class TimerPicker extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <NumberPicker
            style={[styles.picker, this.props.style]}
            itemStyle={this.props.style}
            minValue={0}
            maxValue={23}
            initialValue={0}
          />
          <Text style={[styles.text, this.props.style]}>{l10n.hours}</Text>
        </View>
        <View style={styles.input}>
          <NumberPicker
            style={[styles.picker, this.props.style]}
            itemStyle={this.props.style}
            minValue={0}
            maxValue={60}
            initialValue={0}
          />
          <Text style={[styles.text, this.props.style]}>{l10n.min}</Text>
        </View>
        <View style={styles.input}>
          <NumberPicker
            style={[styles.picker, this.props.style]}
            itemStyle={this.props.style}
            minValue={0}
            maxValue={60}
            initialValue={0}
          />
          <Text style={[styles.text, this.props.style]}>{l10n.sec}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
