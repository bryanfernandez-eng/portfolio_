import { useRef } from 'react'
import CursorTrail from '../components/CursorTrail'
import HeroScene from '../components/HeroScene'
import { useHeroIntro } from '../hooks/useHeroIntro'
import { useInView } from '../hooks/useInView'
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
  const { isPlaying, isDimmed, isFlipped, isInstant } = useHeroIntro({ heroRef, sceneRef, wipeRef })

  return (
    <header className={classNames('hero', isFlipped && 'flipped')} id="hero" ref={heroRef}>
      <CursorTrail />
      <HeroScene
        sceneRef={sceneRef}
        heroRef={heroRef}
        titleRef={titleRef}
        isPlaying={isPlaying}
        isDimmed={isDimmed}
        isInstant={isInstant}
        isActive={isHeroVisible}
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
