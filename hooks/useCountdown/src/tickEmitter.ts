import createTickPromise, { TickOptsType, TickPromiseType } from './tickPromise'

import { TinyEmitter as EventEmitter } from 'tiny-emitter'

export default class TickEmitter extends EventEmitter {
  _opts: TickOptsType
  _running: boolean
  _tickPromise: TickPromiseType | null

  constructor(opts: TickOptsType) {
    super()
    console.log('TickEmitter', opts)
    this._opts = { ...opts }
    this._running = false
    this._tickPromise = null
  }

  public start() {
    console.log('TickEmitter.start', this._running)
    if (this._running) return false
    this._running = true
    this._tickLoop()
    return true
  }

  public stop() {
    console.log('TickEmitter.stop', this._running)
    if (!this._running) return false
    this._running = false
    if (this._tickPromise) this._tickPromise.cancel()
    return true
  }

  private _tickLoop = async () => {
    console.log('TickEmitter._tickLoop', this._running)
    this._tickPromise = createTickPromise(this._opts)
    try {
      await this._tickPromise
    } catch (e) {
      return
    }
    this.emit('tick')
    if (!this._running) return
    await this._tickLoop()
  }
}
