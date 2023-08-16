import { engine } from '@dcl/sdk/ecs'
import { createGLTF, screen } from './factory'
import { setupUi } from './ui'
import { fetchStreamsSystem } from './systems'
import { Quaternion } from '@dcl/sdk/math'

export function main() {
  // Base
  createGLTF({ position: { x: -16, y: 0, z: -16 }, scale: { x: 4, y: 1, z: 3 }, rotation: Quaternion.fromEulerDegrees(0, 0 ,0) }, 'models/baseDarkWithCollider.glb')

  // Seating
  createGLTF({ position: { x: 16, y: 0.05, z: 10 } }, 'models/seats.glb')

  // Screen
  screen({ position: { x: 16, y: 0.05, z: 16 } })

  setupUi()

  engine.addSystem(fetchStreamsSystem)
}
