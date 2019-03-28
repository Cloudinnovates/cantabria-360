import CrateGateMesh from './crate-gate-mesh'
import ArrowGateMesh from './arrow-gate-mesh'

export default class GateMeshBuilder {
  static crate (scene, gate) {
    return new CrateGateMesh().create(scene, gate)
  }

  static arrow (scene, gate) {
    return new ArrowGateMesh().create(scene, gate)
  }
}
