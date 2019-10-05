type TickIdType = number | void | null
type CancelTickType = (tickId: number) => void
type NextTickType = (handleTick: () => void) => TickIdType

export type TickOptsType = {
  cancelTick?: CancelTickType
  nextTick: NextTickType
}

export type TickPromiseType = Promise<void> & { cancel: () => void }

export default function createTickPromise({
  cancelTick,
  nextTick,
}: TickOptsType): TickPromiseType {
  let _reject = (err: Error) => {}
  let cancelled = false
  let tickId: TickIdType
  const p = new Promise(function(resolve, reject) {
    _reject = reject
    tickId = nextTick(() => {
      if (cancelled) return
      resolve()
    })
  })
  // @ts-ignore
  p.cancel = () => {
    cancelled = true
    if (cancelTick && tickId != null) cancelTick(tickId)
    _reject(new Error('cancel'))
  }
  // @ts-ignore
  return p
}
