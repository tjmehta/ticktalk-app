import * as COLORS from '~/const/colors'

import CircleButton from '~/components/CircleButton'
import React from 'react'
import keyMirror from 'keymirror'
import { title } from '~/const/l10n'

const SIZE = 86

const themes = {
  CANCEL: {
    backgroundColor: COLORS.BTN_GREY,
    color: COLORS.WHITE,
    title: title('cancel'),
  },
  CANCEL_DISABLED: {
    backgroundColor: COLORS.BTN_DK_GREY,
    color: COLORS.DM_WHITE,
    disabled: true,
    title: title('cancel'),
  },
  PAUSE: {
    backgroundColor: COLORS.BTN_DK_ORANGE,
    color: COLORS.TXT_ORANGE,
    title: title('pause'),
  },
  RESUME: {
    backgroundColor: COLORS.BTN_GREEN,
    color: COLORS.TXT_LT_GREEN,
    title: title('resume'),
  },
  START: {
    backgroundColor: COLORS.BTN_GREEN,
    color: COLORS.TXT_LT_GREEN,
    title: title('start'),
  },
}

type ThemeType = keyof typeof themes

export const THEMES = keyMirror(themes)

type PropsType = {
  theme: ThemeType
  onPress: () => void
}

export default function TimerButton(props: PropsType) {
  return (
    <CircleButton
      size={SIZE}
      onPress={props.onPress}
      {...themes[props.theme]}
    />
  )
}
