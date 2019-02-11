import { StyleSheet, ViewStyle } from 'react-native'

module.exports = function quickStyle(obj: ViewStyle) {
  return StyleSheet.create({ foo: obj }).foo
}
