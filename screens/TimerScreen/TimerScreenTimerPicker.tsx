import * as COLORS from '~/const/colors'

import { Platform, StyleProp, StyleSheet, TextStyle } from 'react-native'

import TimerPicker from '~/components/TimerPicker'
import createGetStyles from '~/utils/createGetStyles'

type PropsType = {
  value: number
  onValueChange: (value: number) => void
  style?: StyleProp<TextStyle>
}

export default function TimerScreenTimerPicker(props: PropsType) {
  return (
    <TimerPicker
      onValueChange={props.onValueChange}
      style={[styles.timerPicker, props.style]}
      digitStyles={{
        container: getDigitStyles('container'),
        font: getDigitStyles('font'),
        label: getDigitStyles('label'),
        picker: getDigitStyles('picker'),
        item: getDigitStyles('item'),
      }}
      value={props.value}
    />
  )
}

const styles = StyleSheet.create({
  timerPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})

/*
 * digitStyles
 */

const digitStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  picker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    paddingRight: 3,
  },

  item: {
    flex: 1,
    textAlign: 'right',
  },

  label: {
    textAlign: 'left',
    width: 61,
  },

  font: {
    color: COLORS.WHITE,
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
  },
})
const digitPortraitStyles = StyleSheet.create({
  container: {
    ...digitStyles.container,
  },
  item: {
    ...digitStyles.item,
    fontSize: 24,
  },
  font: {
    ...digitStyles.font,
    fontSize: 20,
  },
})
const digitLandscapeStyles = StyleSheet.create({
  container: {
    ...digitStyles.container,
    justifyContent: 'flex-start',
  },
  item: {
    ...digitStyles.item,
    fontSize: 24,
  },
  font: {
    ...digitStyles.font,
    fontSize: 20,
  },
})

const getDigitStyles = createGetStyles({
  styles: digitStyles,
  landscapeStyles: digitLandscapeStyles,
  portraitStyles: digitPortraitStyles,
})
