import createTickPromise, {
  TickOptsType,
  TickPromiseType,
} from './tick_promise'

import { TinyEmitter as EventEmitter } from 'tiny-emitter'

export default class TickEmitter extends EventEmitter {
  _opts: TickOptsType
  _started: boolean
  _tickPromise: TickPromiseType | null

  constructor(opts: TickOptsType) {
    super()
    console.log('TICK EMITTER', opts)
    this._opts = { ...opts }
    this._started = false
    this._tickPromise = null
  }

  public start() {
    if (this._started) return false
    this._started = true
    this._tickLoop()
    return true
  }

  public stop() {
    if (!this._started) return false
    this._started = false
    if (this._tickPromise) this._tickPromise.cancel()
    return true
  }

  private _tickLoop = async () => {
    this._tickPromise = createTickPromise(this._opts)
    console.log('TICK LOOP')
    try {
      await this._tickPromise
    } catch (e) {
      return
    }
    this.emit('tick')
    if (!this._started) return
    await this._tickLoop()
  }
}
