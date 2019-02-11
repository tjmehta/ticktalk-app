import React, { PureComponent, ReactChild } from 'react'
import times from 'times-loop'
import { Picker, StyleSheet, StyleProp, TextStyle } from 'react-native'

type PropsType = {
  initialValue: number
  maxValue: number
  minValue: number
  style?: StyleProp<TextStyle>
  itemStyle?: StyleProp<TextStyle>
}

type StateType = {
  selectedValue: number
}

export default class NumberPicker extends PureComponent<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      selectedValue: props.initialValue,
    }
  }

  _handleValueChange = (selectedValue: number) => {
    this.setState({ selectedValue })
  }

  render() {
    return (
      <Picker
        onValueChange={this._handleValueChange}
        selectedValue={this.state.selectedValue}
        style={this.props.style}
        itemStyle={this.props.itemStyle}
      >
        {this._renderItems()}
      </Picker>
    )
  }

  _renderItems(): Array<ReactChild> {
    const { maxValue, minValue } = this.props
    return times(maxValue - minValue + 1, (i: number) => (
      <Picker.Item key={i} label={i.toString()} value={i} />
    ))
  }
}
