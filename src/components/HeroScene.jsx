import { useRef, useState } from 'react'
import { useBallPhysics } from '../hooks/useBallPhysics'
import { useLampToggle } from '../hooks/useLampToggle'
import { useShotInput } from '../hooks/useShotInput'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRoomBuild } from '../hooks/useRoomBuild'
import { useSceneLayout } from '../hooks/useSceneLayout'
import { useSceneScrollFade } from '../hooks/useSceneScrollFade'
import { LANE } from '../utils/ballPhysics'
import { classNames } from '../utils/classNames'
import { getSkyPhase } from '../utils/skyPhase'
import { PROFILE } from '../data'
import './HeroScene.css'

function HeroScene({ sceneRef, heroRef, titleRef, isPlaying, isDimmed, isInstant, isActive }) {
  const isReduced = useReducedMotion()
  const [skyPhase] = useState(getSkyPhase)
  const minDRef = useRef(LANE)
  const ballViewRef = useRef(null)
  const engineRef = useRef(null)
  const meterRef = useRef(null)

  useRoomBuild(sceneRef, ballViewRef, isReduced, skyPhase)
  const { isLampOff, hasToggledLamp } = useLampToggle(sceneRef)
  useSceneLayout({ sceneRef, heroRef, titleRef, minDRef })
  useBallPhysics({ sceneRef, engineRef, ballViewRef, meterRef, minDRef, isActive, isReduced })
  useShotInput({ sceneRef, engineRef, meterRef, isReduced })
  useSceneScrollFade(sceneRef, heroRef, isReduced)

  const className = classNames(
    isPlaying && 'play', isDimmed && 'dim', isInstant && 'instant', !isActive && 'paused',
    `tod-${skyPhase}`, isLampOff && 'lamp-off', hasToggledLamp && 'lamp-used',
  )
  return (
    <div className="scene-wrap">
      <svg
        id="scene"
        className={className}
        ref={sceneRef}
        viewBox="-213 -100 946 545"
        role="img"
        aria-label={PROFILE.sceneLabel}
      />
      <div className="shot-meter" ref={meterRef} aria-hidden="true">
        <i className="meter-window" />
        <i className="meter-fill" />
      </div>
    </div>
  )
}

export default HeroScene
