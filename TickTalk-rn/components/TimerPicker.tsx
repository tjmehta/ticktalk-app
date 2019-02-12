import React, { Component } from 'react'
import { View, StyleProp, StyleSheet, Text, TextStyle } from 'react-native'

import l10n from '~/const/l10n'
import NumberPicker from '~/components/NumberPicker'

type PropsType = {
  style?: StyleProp<TextStyle>
  onValueChange?: (selectedValue: number) => void
}

export default class TimerPicker extends Component<PropsType> {
  _hours: number = 0
  _minutes: number = 0
  _seconds: number = 0
  value: number = this._getValue()

  shouldComponentUpdate() {
    return false
  }

  _getValue(): number {
    return (
      this._hours * 60 * 60 * 1000 +
      this._minutes * 60 * 1000 +
      this._seconds * 1000
    )
  }

  _handleHoursChange = (selectedValue: number) => {
    this._hours = selectedValue
    this._handleValueChange()
  }
  _handleMinutesChange = (selectedValue: number) => {
    this._minutes = selectedValue
    this._handleValueChange()
  }
  _handleSecondsChange = (selectedValue: number) => {
    this._seconds = selectedValue
    this._handleValueChange()
  }
  _handleValueChange() {
    this.value = this._getValue()
    if (!this.props.onValueChange) return
    this.props.onValueChange(this.value)
  }

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
