import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { onFontsReady } from '../utils/fonts'
import { getTheme } from '../utils/theme'

const STORAGE_KEY = 'lensIntro'
const DIM_DELAY_MS = 3300
const WIPE_MS = 1900

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function wipeScale(hero, screen, wipe) {
  const h = hero.getBoundingClientRect()
  const s = screen.getBoundingClientRect()
  const x = s.left + s.width / 2 - h.left
  const y = s.top + s.height / 2 - h.top
  const radius = Math.hypot(Math.max(x, h.width - x), Math.max(y, h.height - y))
  wipe.style.left = `${x}px`
  wipe.style.top = `${y}px`
  return (radius * 2) / 10 + 2
}

function rememberIntro() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    return
  }
}

export function useHeroIntro({ heroRef, sceneRef, wipeRef }) {
  const isReduced = useReducedMotion()
  const [shouldPlay] = useState(() => !isReduced && !hasSeenIntro() && getTheme() === 'dark')
  const [phase, setPhase] = useState(shouldPlay ? 'idle' : 'instant')

  useEffect(() => {
    if (!shouldPlay) return
    let timer = 0
    let animation = null
    const play = () => {
      setPhase('playing')
      timer = setTimeout(() => {
        setPhase('dimmed')
        const wipe = wipeRef.current
        const screen = sceneRef.current.querySelector('#screen')
        const scale = wipeScale(heroRef.current, screen, wipe)
        animation = wipe.animate([{ transform: 'scale(0)' }, { transform: `scale(${scale})` }], { duration: WIPE_MS, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' })
        animation.onfinish = () => {
          setPhase('flipped')
          rememberIntro()
        }
      }, DIM_DELAY_MS)
    }
    const stopFonts = onFontsReady(play)
    return () => {
      stopFonts()
      clearTimeout(timer)
      animation?.cancel()
    }
  }, [shouldPlay, heroRef, sceneRef, wipeRef])

  return {
    isPlaying: phase !== 'idle',
    isDimmed: phase === 'dimmed' || phase === 'flipped' || phase === 'instant',
    isFlipped: phase === 'flipped' || phase === 'instant',
    isInstant: phase === 'instant',
    isReady: phase === 'flipped' || phase === 'instant',
  }
}
