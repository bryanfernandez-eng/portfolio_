import { useSyncExternalStore } from 'react'
import { getTheme, subscribeTheme } from '../utils/theme'

const getServerSnapshot = () => 'dark'

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, getTheme, getServerSnapshot)
}
