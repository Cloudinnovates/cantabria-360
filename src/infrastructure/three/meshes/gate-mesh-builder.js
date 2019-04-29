import CrateGateMesh from './crate-gate-mesh'
import ArrowGateMesh from './arrow-gate-mesh'
import CircleArrowGateMesh from './circle-arrow-gate-mesh'
import JustCircleArrowGateMesh from './just-circle-arrow-gate-mesh'

export default class GateMeshBuilder {
  static crate (scene, gate) {
    return new CrateGateMesh().create(scene, gate)
  }

  static arrow (scene, gate) {
    return new ArrowGateMesh().create(scene, gate)
  }

  static circle (scene, gate) {
    return new CircleArrowGateMesh().create(scene, gate)
  }

  static justCircle (scene, gate) {
    return new JustCircleArrowGateMesh().create(scene, gate)
  }
}
