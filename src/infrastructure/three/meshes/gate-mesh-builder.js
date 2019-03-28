import CrateGateMesh from './crate-gate-mesh'

export default class GateMeshBuilder {
  static crate (scene, gate) {
    return new CrateGateMesh().create(scene, gate)
  }
}
