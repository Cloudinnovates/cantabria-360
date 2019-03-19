import { Vector3 } from 'three'

export default class GateModel {
  static empty () {
    return new GateModel({
      id: 'no-gate-id',
      label: 'no-label',
      position: new Vector3(0, 0, 0)
    })
  }

  constructor ({ id, label, position }) {
    this.id = id
    this.label = label
    this.position = position
  }
}
