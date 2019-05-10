import {Raycaster, Vector3} from 'three'
import Gate from '../../domain/model/gate'

function anIntersectedGateModel (intersect) {
  return intersect.object.userData instanceof Gate
}

export default class IntersectDetector {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
  }

  gateModel (position) {
    const mouseX = (position.x / window.innerWidth) * 2 - 1
    const mouseY = -(position.y / window.innerHeight) * 2 + 1

    const vector = new Vector3(mouseX, mouseY, 1)
      .unproject(this.camera)
      .sub(this.camera.position)
      .normalize()

    const ray = new Raycaster(this.camera.position, vector, 1, 1000)
    const intersects = ray.intersectObjects(this.scene.children)

    const intersectedSprite = intersects.find(anIntersectedGateModel)
    if (!intersectedSprite) {
      return null
    }

    return intersectedSprite.object.userData
  }
}
