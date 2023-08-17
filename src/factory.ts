import { Entity, engine, Transform, MeshRenderer, MeshCollider, GltfContainer, TransformType, ColliderLayer, Material, VideoPlayer } from '@dcl/sdk/ecs'
import { Color3, Quaternion } from '@dcl/sdk/math'

// Cube factory
export function createGLTF(transform: Partial<TransformType>, src: string): Entity {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, transform)

  // set gltf
  GltfContainer.create(meshEntity, { src })

  return meshEntity
}

// Use this component to fetch the screen entity
export const ScreenComponent = engine.defineComponent('screen-component', {})
export function screen(transform: Partial<TransformType>) {
  const screenBody = createGLTF(transform, 'models/screen.glb')

  // Screen
  const screenDisplay = engine.addEntity()
  Transform.create(screenDisplay, {
    parent: screenBody,
    position: { x: 0, y: 6.15, z: 5 },
    scale: { x: 0.625, y: 0.625, z: 0.625 }
  })

  // Screen video
  const screen = engine.addEntity()
  ScreenComponent.create(screen)
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
    roughness: 1.0,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
  })
}
