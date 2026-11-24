import { useEffect } from 'react'
import { onFontsReady } from '../utils/fonts'

// how far into the second name line the water starts, as a share of that line's height
const LINE_OFFSET = 0.15

// Puts the skyline's horizon between the two lines of the name by setting --horizon on the hero.
export function useHorizon(heroRef, titleRef) {
  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const place = () => {
      const line = title.children[1]
      if (!line) return
      const top = line.getBoundingClientRect().top - hero.getBoundingClientRect().top
      hero.style.setProperty('--horizon', `${(top + line.offsetHeight * LINE_OFFSET).toFixed(1)}px`)
    }
    const observer = new ResizeObserver(place)
    observer.observe(hero)
    observer.observe(title)
    const stopFonts = onFontsReady(place)
    return () => {
      observer.disconnect()
      stopFonts()
    }
  }, [heroRef, titleRef])
}
