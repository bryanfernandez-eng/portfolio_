import { useEffect, useRef } from 'react'
import { THEME_SWITCH_LABEL } from '../data'
import { useTheme } from './useTheme'
import { getTheme, setTheme } from '../utils/theme'
import { playThemeWipe } from '../utils/themeWipe'

const SVG_NS = 'http://www.w3.org/2000/svg'

export function useThemeSwitch(sceneRef, isReady, isReduced) {
  const theme = useTheme()
  const isBusy = useRef(false)

  useEffect(() => {
    const scene = sceneRef.current
    const target = scene.querySelector('[data-k="switch"]')
    const tip = document.createElementNS(SVG_NS, 'title')
    tip.textContent = THEME_SWITCH_LABEL
    target.prepend(tip)
    target.setAttribute('tabindex', '0')
    target.setAttribute('role', 'switch')
    target.setAttribute('aria-label', THEME_SWITCH_LABEL)
    const flip = () => {
      if (!isReady || isBusy.current) return
      isBusy.current = true
      const swap = () => {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark')
        isBusy.current = false
      }
      playThemeWipe(target, swap, isReduced)
    }
    const handlePointerDown = event => {
      if (event.target.closest('[data-k="switch"]')) event.stopPropagation()
    }
    const handleKeyDown = event => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      flip()
    }
    scene.addEventListener('pointerdown', handlePointerDown, true)
    target.addEventListener('click', flip)
    target.addEventListener('keydown', handleKeyDown)
    return () => {
      scene.removeEventListener('pointerdown', handlePointerDown, true)
      target.removeEventListener('click', flip)
      target.removeEventListener('keydown', handleKeyDown)
      tip.remove()
    }
  }, [sceneRef, isReady, isReduced])

  useEffect(() => {
    sceneRef.current.querySelector('[data-k="switch"]').setAttribute('aria-checked', String(theme === 'light'))
  }, [sceneRef, theme])
}
