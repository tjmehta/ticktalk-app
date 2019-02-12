import 'moment-duration-format'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'

type PropsType = {
  initialDuration: number
  style?: StyleProp<TextStyle>
}

type StateType = {
  timeLeft: string
}

function getDurationString(_duration: number): string {
  const duration = Math.max(_duration, 0)
  return moment.duration(duration, 'milliseconds').format('hh:mm:ss:SS', {
    trim: false,
  })
}

export default class Timer extends PureComponent<PropsType, StateType> {
  state = {
    timeLeft: 'hello',
  }

  _animationFrameId: number | null
  _startDate: Date
  _timerDuration: number

  constructor(props: PropsType) {
    super(props)
    this._animationFrameId = null
    this._startDate = new Date()
    this._timerDuration = props.initialDuration
    this.state = {
      timeLeft: getDurationString(this._timerDuration),
    }
  }

  componentDidMount() {
    this.play()
  }

  pause() {
    if (this._animationFrameId) {
      // stop tick and print one last time
      cancelAnimationFrame(this._animationFrameId)
      this._setTime()
      // adjust timer duration
      const timePassedDuration = Date.now() - this._startDate.getTime()
      this._timerDuration -= timePassedDuration
    }
  }

  play() {
    // reset start time
    this._startDate = new Date()
    // start tick
    this._animationFrameId = requestAnimationFrame(this._handleInterval)
  }

  _handleInterval = () => {
    const duration = this._setTime()
    // schedule next update
    this._animationFrameId =
      duration > 0 ? requestAnimationFrame(this._handleInterval) : null
  }

  _setTime(): number {
    const timePassedDuration = Date.now() - this._startDate.getTime()
    const timerDuration = this._timerDuration
    const duration = timerDuration - timePassedDuration

    // update display
    this.setState({
      timeLeft: getDurationString(duration),
    })

    return duration
  }

  render() {
    return (
      <Text style={[styles.timer, this.props.style]}>
        {this.state.timeLeft}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  timer: {},
})
