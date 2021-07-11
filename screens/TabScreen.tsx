import * as COLORS from '~/const/colors'

import { createAppContainer, createBottomTabNavigator } from 'react-navigation'

import ClockScreen from '~/screens/ClockScreen'
import TimerScreen from '~/screens/TimerScreen/TimerScreen'

const TabNavigator = createBottomTabNavigator(
  {
    ClockScreen,
    TimerScreen,
  },
  {
    initialRouteName: 'TimerScreen',
    tabBarOptions: {
      activeTintColor: COLORS.YELLOW,
      inactiveTintColor: COLORS.BLACK,
      labelStyle: {
        fontSize: 30,
      },
      style: {
        backgroundColor: COLORS.BLACK,
      },
    },
  }
)

export default createAppContainer(TabNavigator)
