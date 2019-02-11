import React, { PureComponent } from 'react'
import inflect from 'i'
import { Platform, StyleSheet, View } from 'react-native'

import Clock from '~/components/Clock'
import l10n from '~/const/l10n'
import * as COLORS from '~/const/colors'

const i = inflect()

export default class ClockScreen extends PureComponent {
  static navigationOptions = {
    title: i.titleize(l10n.clock),
  }

  render() {
    return (
      <View style={styles.container}>
        <Clock style={styles.clock} />
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
  clock: {
    margin: 10,

    color: COLORS.WHITE,
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    fontSize: 50,
    textAlign: 'center',
  },
})
