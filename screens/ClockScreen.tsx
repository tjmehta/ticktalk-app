import * as COLORS from '~/const/colors'

import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { PureComponent } from 'react'

import Clock from '~/components/Clock/Clock'
import { title } from '~/const/l10n'

export default function ClockScreen() {
  return (
    <View style={styles.container}>
      <Clock style={styles.clock} />
    </View>
  )
}

ClockScreen.navigationOptions = {
  title: '🕒',
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  tabText: {
    color: COLORS.WHITE,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

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
