import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

import { ORIENTATIONS } from '~/hooks/useDeviceOrientation'
import getOrientation from '~/utils/getOrientation'

type AllStylesTypes<S, L, P> = {
  styles: { [K in keyof S]: ViewStyle | TextStyle | ImageStyle }
  landscapeStyles: { [K in keyof L]: ViewStyle | TextStyle | ImageStyle }
  portraitStyles: { [K in keyof P]: ViewStyle | TextStyle | ImageStyle }
}

export default function createGetStyles<S, L, P>({
  styles,
  landscapeStyles,
  portraitStyles,
}: AllStylesTypes<S, L, P>) {
  return function getStyles(...names: string[]): StyleProp<ViewStyle>[] {
    const composedStyles: StyleProp<ViewStyle>[] = []
    const orientation = getOrientation()

    names.forEach(name => {
      if (name in styles) {
        const key = name as keyof typeof styles
        composedStyles.push(styles[key] as StyleProp<ViewStyle>)
      }
      if (orientation === ORIENTATIONS.PORTRAIT) {
        if (name in portraitStyles) {
          const key = name as keyof typeof portraitStyles
          composedStyles.push(portraitStyles[key] as StyleProp<ViewStyle>)
        }
      }
      if (orientation === ORIENTATIONS.LANDSCAPE) {
        if (name in landscapeStyles) {
          const key = name as keyof typeof landscapeStyles
          composedStyles.push(landscapeStyles[key] as StyleProp<ViewStyle>)
        }
      }
    })

    return composedStyles
  }
}
