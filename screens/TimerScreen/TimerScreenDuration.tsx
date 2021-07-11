import * as COLORS from '~/const/colors'

import { Platform, StyleProp, StyleSheet, TextStyle } from 'react-native'

import Duration from '~/components/Duration'
import createGetStyles from '~/utils/createGetStyles'

type PropsType = {
  value: number
  style?: StyleProp<TextStyle>
}

export default function TimerScreenDuration(props: PropsType) {
  return <Duration value={props.value} style={getStyles('countdown')} />
}

const styles = StyleSheet.create({
  countdown: {
    color: COLORS.WHITE,
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
  },
})
const landscapeStyles = StyleSheet.create({
  countdown: {
    ...styles.countdown,
    fontSize: 40,
  },
})
const portraitStyles = StyleSheet.create({
  countdown: {
    ...styles.countdown,
    fontSize: 40,
  },
})

const getStyles = createGetStyles({
  styles: styles,
  landscapeStyles,
  portraitStyles,
})
