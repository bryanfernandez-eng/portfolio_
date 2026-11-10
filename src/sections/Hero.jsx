import { useRef } from 'react'
import CursorTrail from '../components/CursorTrail'
import HeroScene from '../components/HeroScene'
import { useHeroIntro } from '../hooks/useHeroIntro'
import { useIdle } from '../hooks/useIdle'
import { useInView } from '../hooks/useInView'
import { useTheme } from '../hooks/useTheme'
import { classNames } from '../utils/classNames'
import { PROFILE, HERO_LINES } from '../data'
import './Hero.css'

const NAME_PARTS = PROFILE.name.split(' ')

function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const sceneRef = useRef(null)
  const wipeRef = useRef(null)
  const isHeroVisible = useInView(heroRef, { isInitiallyInView: true })
  const isIdle = useIdle()
  const isAnimating = isHeroVisible && !isIdle
  const isDark = useTheme() === 'dark'
  const { isPlaying, isDimmed, isFlipped, isInstant, isReady } = useHeroIntro({ heroRef, sceneRef, wipeRef })

  return (
    <header className={classNames('hero', isFlipped && isDark && 'flipped')} id="hero" ref={heroRef}>
      <CursorTrail isActive={isAnimating} />
      <HeroScene
        sceneRef={sceneRef}
        heroRef={heroRef}
        titleRef={titleRef}
        isPlaying={isPlaying}
        isDimmed={isDimmed && isDark}
        isReady={isReady}
        isInstant={isInstant}
        isActive={isAnimating}
      />
      <h1 className="wide" ref={titleRef}>
        {NAME_PARTS.map(part => <span key={part}>{part}</span>)}
      </h1>
      <p className="sub">
        {HERO_LINES.map(line => <span key={line}>{line}</span>)}
      </p>
      <div className="wipe" ref={wipeRef} aria-hidden="true" />
    </header>
  )
}

export default Hero
