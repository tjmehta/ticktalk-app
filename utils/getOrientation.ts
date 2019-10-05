import { Dimensions } from 'react-native'

export enum ORIENTATIONS {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

export default function getOrientation() {
  const { height, width } = Dimensions.get('window')
  return height >= width ? ORIENTATIONS.PORTRAIT : ORIENTATIONS.LANDSCAPE
}
