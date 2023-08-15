import { engine } from '@dcl/sdk/ecs'
import { createGLTF, screen } from './factory'
import { setupUi } from './ui'
import { fetchStreamsSystem } from './systems'

export function main() {
  // Base
  createGLTF({ scale: { x: 2, y: 1, z: 2 } }, 'models/baseDarkWithCollider.glb')

  // Seating
  createGLTF({ position: { x: 16, y: 0.05, z: 10 } }, 'models/seats.glb')

  // Screen
  screen({ position: { x: 16, y: 0.05, z: 16 } })

  setupUi()

  engine.addSystem(fetchStreamsSystem)
}
