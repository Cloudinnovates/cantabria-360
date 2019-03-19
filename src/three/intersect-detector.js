import {Raycaster, Vector3} from "three"
import GateModel from "../model/gate-model"

function anIntersectedGateModel(intersect) {
  return intersect.object.userData instanceof GateModel
}

export default class IntersectDetector {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
  }

  gateModel(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

    const vector = new Vector3(mouseX, mouseY, 1)
    vector.unproject(this.camera)

    const ray = new Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
    const intersects = ray.intersectObjects(this.scene.children)

    const intersectedSprite = intersects.find(anIntersectedGateModel)
    if (!intersectedSprite) {
      return null
    }

    return intersectedSprite.object.userData
  }
}
