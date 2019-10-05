import { TinyEmitter as EventEmitter } from 'tiny-emitter'
import TickEmitter from './tickEmitter'

let genId = 0

export default class Countdown extends EventEmitter {
  _initialRemainingDuration: number
  _remainingDuration: number
  _tickEmitter: TickEmitter
  _startTime: Date | null
  id: number = ++genId

  constructor(duration: number) {
    super()
    this._initialRemainingDuration = duration
    this._remainingDuration = duration
    this._tickEmitter = new TickEmitter({
      cancelTick: cancelAnimationFrame,
      nextTick: requestAnimationFrame,
    })
    this._tickEmitter.on('tick', this._handleTick)
    this._startTime = null
  }

  public cancel() {
    if (this.pause() && this._reset()) {
      this._handleTick()
      return true
    }
    return false
  }

  public pause() {
    if (!this._startTime) return false

    this._tickEmitter.stop()
    this._remainingDuration = this._calculateRemainingDuration()
    this._startTime = null

    return true
  }

  public set(remainingDuration?: number) {
    if (this._startTime) return false

    remainingDuration =
      remainingDuration != null
        ? remainingDuration
        : this._initialRemainingDuration
    this._initialRemainingDuration = remainingDuration
    this._remainingDuration = remainingDuration

    return true
  }

  public start() {
    if (this._startTime) return false

    this._handleTick()
    this._tickEmitter.start()
    this._startTime = new Date()

    return true
  }

  private _reset() {
    return this.set(this._initialRemainingDuration)
  }

  private _calculateRemainingDuration() {
    if (!this._startTime) return this._remainingDuration

    const elapsedDuration = Date.now() - this._startTime.getTime()
    const remainingDuration = Math.max(
      this._remainingDuration - elapsedDuration
    )

    return Math.max(remainingDuration, 0)
  }

  private _handleTick = () => {
    const remainingDuration = this._calculateRemainingDuration()

    if (remainingDuration === 0) this.pause()

    this.emit('tick', remainingDuration)
  }
}
