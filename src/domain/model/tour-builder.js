import RoomModel from './room-model'
import Position from './position'
import GateModel from './gate-model'
import TourModel from './tour-model'
import Panorama from './panorama'

export default class TourBuilder {
  static fromJSON (jsonTour) {
    const roomsById = jsonTour.rooms.reduce((byId, room) => {
      const id = room.id
      const panorama = new Panorama(room.panorama)
      byId[room.id] = new RoomModel({ id, panorama })

      return byId
    }, {})

    const gatesById = jsonTour.gates.reduce((byId, gate) => {
      const { id, label } = gate
      const goesTo = roomsById[gate.goesTo]
      const { x, y, z } = gate.position
      const position = new Position(x, y, z)
      byId[gate.id] = new GateModel({ id, label, position, goesTo })

      return byId
    }, {})

    const rooms = jsonTour.rooms.map(jsonRoom => {
      const room = roomsById[jsonRoom.id]
      const gates = jsonRoom.gates.map(gateId => gatesById[gateId])
      room.allowsGoingTo(gates)
      return room
    })

    const { id, description } = jsonTour
    return new TourModel({ id, description, rooms })
  }
}
