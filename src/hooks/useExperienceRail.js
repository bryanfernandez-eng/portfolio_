import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { useScrollFrame } from './useScrollFrame'
import { updateExperience } from '../utils/page/experienceRail'
import { onFontsReady } from '../utils/fonts'

export function useExperienceRail(listRef) {
  const isReduced = useReducedMotion()
  const update = () => updateExperience(listRef.current, isReduced)

  useScrollFrame(update, { isListening: !isReduced, shouldRunOnMount: true, shouldRunOnResize: true })

  useEffect(() => onFontsReady(() => updateExperience(listRef.current, isReduced)), [listRef, isReduced])
}
