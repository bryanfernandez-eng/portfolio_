import { useEffect } from 'react'
import { createSceneKit } from '../utils/room/sceneKit'
import { buildRoom } from '../utils/room/roomBuild'
import { buildWorkstation } from '../utils/room/roomDesk'
import { createBallView } from '../utils/ball/ballView'

export function useRoomBuild(sceneRef, ballViewRef, isReduced, skyPhase) {
  useEffect(() => {
    const scene = sceneRef.current
    const kit = createSceneKit(scene)
    buildRoom(kit, skyPhase)
    buildWorkstation(kit)
    ballViewRef.current = createBallView(kit, isReduced)
    return () => {
      ballViewRef.current = null
      scene.replaceChildren()
    }
  }, [sceneRef, ballViewRef, isReduced, skyPhase])
}
