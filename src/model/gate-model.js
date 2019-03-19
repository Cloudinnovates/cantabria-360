import { Vector3 } from 'three'

export default class GateModel {
  static empty () {
    return new GateModel({
      id: 'no-gate-id',
      label: 'no-label',
      position: new Vector3(0, 0, 0),
      goesTo: 'no-room'
    })
  }

  constructor ({ id, label, position, goesTo }) {
    this.id = id
    this.label = label
    this.position = position
    this.goesTo = goesTo
  }
}
