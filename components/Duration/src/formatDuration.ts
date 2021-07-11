import 'moment-duration-format'

import moment from 'moment'

export default function formatDuration(
  format: string,
  duration: number
): string {
  duration = Math.max(duration, 0)

  return moment.duration(duration, 'milliseconds').format(format, {
    trim: false,
  })
}
