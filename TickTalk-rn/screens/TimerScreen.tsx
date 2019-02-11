import React, { PureComponent } from 'react'
import inflect from 'i'
import { StyleSheet, View, Text } from 'react-native'

import l10n from '~/const/l10n'
import TimerPicker from '~/components/TimerPicker'
import * as COLORS from '~/const/colors'

const i = inflect()

export default class TimerScreen extends PureComponent {
  static navigationOptions = {
    title: i.titleize(l10n.timer),
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <TimerPicker style={styles.picker} />
        </View>
        <View style={styles.controlsContainer}>
          <Text style={styles.todo}>todo...</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK,
  },
  controlsContainer: {
    flex: 5,
  },
  pickerContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    color: COLORS.WHITE,
  },
  todo: {
    color: COLORS.WHITE,
  },
})
