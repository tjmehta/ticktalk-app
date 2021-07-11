import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

type Style = StyleProp<ViewStyle | TextStyle | ImageStyle>

export default function createGetThemeStyles<
  Styles,
  ThemeStyleSheets,
  T extends keyof ThemeStyleSheets
>(styles: Styles, themeStyleSheets: ThemeStyleSheets) {
  return function getThemeStyles(theme: T): Styles & ThemeStyleSheets[T] {
    return {
      ...styles,
      ...themeStyleSheets[theme],
    }
  }
}
