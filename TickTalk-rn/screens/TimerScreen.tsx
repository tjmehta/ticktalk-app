import React, { PureComponent } from 'react'
import inflect from 'inflection'
import { StyleSheet, View, Text } from 'react-native'

import CircleButton from '~/components/CircleButton'
import l10n from '~/const/l10n'
import TimerPicker from '~/components/TimerPicker'
import Timer from '~/components/Timer'
import * as COLORS from '~/const/colors'

type PropsType = {}
type StateType = {
  started: boolean
  paused: boolean
}

export default class TimerScreen extends PureComponent<PropsType, StateType> {
  static navigationOptions = {
    title: inflect.capitalize(l10n.timer),
  }

  state = {
    started: false,
    paused: false,
  }
  _pickerRef: TimerPicker | null = null
  _pickerValue: number | null = null
  _timerRef: Timer | null = null

  _handleCancelPress = () => {
    this.setState({ started: false })
  }
  _handlePausePress = () => {
    this.setState({ paused: true })
  }
  _handleResumePress = () => {
    this.setState({ paused: false })
  }
  _handleStartPress = () => {
    this.setState({ started: true })
  }
  _handlePickerRef = (ref: TimerPicker | null) => {
    if (!ref && this._pickerRef) {
      this._pickerValue = this._pickerRef.value
    }
    this._pickerRef = ref
  }
  _handleTimerRef = (ref: Timer | null) => {
    this._timerRef = ref
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          {this.state.started ? (
            <Timer
              ref={this._handleTimerRef}
              style={styles.timer}
              initialDuration={this._pickerValue || 0}
            />
          ) : (
            <TimerPicker ref={this._handlePickerRef} style={styles.timer} />
          )}
        </View>
        <View style={styles.controlsContainer}>
          <CircleButton label="cancel" onPress={this._handleCancelPress} />
          {this._renderRightButton()}
        </View>
      </View>
    )
  }
  _renderRightButton() {
    if (!this.state.started) {
      return <CircleButton label="start" onPress={this._handleStartPress} />
    } else if (!this.state.paused) {
      return <CircleButton label="pause" onPress={this._handlePausePress} />
    } else {
      return <CircleButton label="resume" onPress={this._handleResumePress} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK,
  },

  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: 50,
    paddingRight: 50,
  },
  timer: {
    color: COLORS.WHITE,
  },

  controlsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  pause: {
    color: COLORS.WHITE,
  },
})
