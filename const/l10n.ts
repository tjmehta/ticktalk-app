import inflect from 'inflection'

const strings = {
  hour: 'hour',
  hours: 'hours',
  min: 'min',
  sec: 'sec',
  clock: 'clock',
  timer: 'timer',
  start: 'start',
  pause: 'pause',
  resume: 'resume',
  cancel: 'cancel',
}

type KeyType = keyof typeof strings

export default function l10n(key: KeyType): string {
  return strings[key]
}

export const title = (key: KeyType) => inflect.titleize(l10n(key))
