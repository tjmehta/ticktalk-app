import moment from 'moment'
import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { StyleProp, TextStyle } from 'react-native'

type PropsType = {
  style: StyleProp<TextStyle>
}

type StateType = {
  time: string
}

function getTimeString(): string {
  const date = moment()
  const showColon: boolean = Boolean(date.seconds() % 2)
  const colon = showColon ? ':' : ' '
  return date.format(`h${colon}mm A`)
}

export default class Clock extends PureComponent<PropsType, StateType> {
  state = {
    time: getTimeString(),
  }

  _animationFrameId: number | null = null

  componentDidMount() {
    this._animationFrameId = requestAnimationFrame(this._handleInterval)
  }

  componentWillUnmount() {
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId)
      this._animationFrameId = null
    }
  }

  _handleInterval = () => {
    this.setState({ time: getTimeString() })
    this._animationFrameId = requestAnimationFrame(this._handleInterval)
  }

  render() {
    return <Text style={this.props.style}>{this.state.time}</Text>
  }
}
