import {
  ColliderLayer,
  engine,
  Material,
  MeshCollider,
  MeshRenderer,
  Transform,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import { createGLTF } from './factory'
import { setupUi, updateTracks } from './ui'
import { getActiveVideoStreams } from '~system/CommsApi'

export function main() {
  // Base
  createGLTF({ scale: { x: 2, y: 1, z: 2 } }, 'models/baseDarkWithCollider.glb')

  // Seating
  createGLTF({ position: { x: 16, y: 0.05, z: 10 } }, 'models/seats.glb')

  const screenBody = createGLTF({ position: { x: 16, y: 0.05, z: 16 } }, 'models/screen.glb')

  // Screen
  const screenDisplay = engine.addEntity()
  Transform.create(screenDisplay, {
    parent: screenBody,
    position: { x: 0, y: 6.15, z: 5 },
    scale: { x: 0.625, y: 0.625, z: 0.625 }
  })

  const screen = engine.addEntity()
  MeshRenderer.setPlane(screen)
  MeshCollider.setPlane(screen, ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS)
  Transform.create(screen, {
    parent: screenDisplay,
    scale: { x: 19.2, y: 10.8, z: 1 },
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })


  const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

  Material.setPbrMaterial(screen, {
    texture: videoTexture,
    emissiveTexture: videoTexture,
    emissiveIntensity: 0.6,
    roughness: 1.0
  })


  let refreshInterval = 0
  engine.addSystem((dt) => {
    refreshInterval -= dt
    if (refreshInterval <= 0) {
      getActiveVideoStreams({}).then(result => {
        updateTracks(result.streams)
      })
      refreshInterval = 5
    }
  })

  setupUi(scr => {
    if (scr === "" && VideoPlayer.has(screen)) {
      VideoPlayer.deleteFrom(screen)
      return
    }

    VideoPlayer.createOrReplace(screen, {
      src: scr,
      playing: true
    })
    console.log(`playing ${scr}`)
  })
}
