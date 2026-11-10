import { useSyncExternalStore } from 'react'
import { getIdle, subscribeIdle } from '../utils/idle'

const getServerSnapshot = () => false

export function useIdle() {
  return useSyncExternalStore(subscribeIdle, getIdle, getServerSnapshot)
}