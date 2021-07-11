import { useEffect, useState } from 'react'

import { Dimensions } from 'react-native'
import getOrientation from '~/utils/getOrientation'

export { ORIENTATIONS } from '~/utils/getOrientation'

export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState(getOrientation())

  useEffect(() => {
    const handleDimensionChange = () => {
      setOrientation(getOrientation())
    }

    Dimensions.addEventListener('change', handleDimensionChange)

    return () => {
      Dimensions.removeEventListener('change', handleDimensionChange)
    }
  }, [])

  return orientation
}
