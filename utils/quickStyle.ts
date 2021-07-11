import { StyleSheet, ViewStyle } from 'react-native'

export default function quickStyle(obj: ViewStyle) {
  return StyleSheet.create({ foo: obj }).foo
}
