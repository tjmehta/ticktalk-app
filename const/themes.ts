import { StyleSheet } from 'react-native'

import * as COLORS from '~/const/colors'

const styles = StyleSheet.create({
  DARK_BG: {
    backgroundColor: COLORS.BLACK,
  },
  DARK_TEXT: {
    color: COLORS.WHITE,
  },
})

export default styles

export const APP_BG = styles.DARK_BG
export const APP_TEXT = styles.DARK_BG
