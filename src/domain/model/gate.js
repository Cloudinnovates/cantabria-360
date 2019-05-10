import Position from './position'

export default class Gate {
  static empty () {
    return new Gate({
      id: 'no-gate-id',
      label: 'no-label',
      position: new Position(0, 0, 0),
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
