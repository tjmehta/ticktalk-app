import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import ClockScreen from '~/screens/ClockScreen'
import TimerScreen from '~/screens/TimerScreen'

const TabNavigator = createBottomTabNavigator({
  ClockScreen,
  TimerScreen,
})

export default createAppContainer(TabNavigator)
