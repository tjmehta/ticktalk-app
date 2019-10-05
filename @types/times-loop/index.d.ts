declare module 'times-loop' {
  type CallbackType = <T>(i: number, cb?: (err: Error, data: T) => void) => T
  declare function times<T>(count: number, callback: CallbackType<T>): Array<T>
  export default times
}
