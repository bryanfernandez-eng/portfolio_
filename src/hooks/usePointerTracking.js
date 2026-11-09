import { useEffect } from 'react'
import { trackPointer } from '../utils/pointer'

export function usePointerTracking() {
  useEffect(() => trackPointer(), [])
}
