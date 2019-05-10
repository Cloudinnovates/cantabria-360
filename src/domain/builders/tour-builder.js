import Room from '../model/room'
import Position from '../model/position'
import Gate from '../model/gate'
import Tour from '../model/tour'
import Panorama from '../model/panorama'

function buildRoom (room) {
  const id = room.id
  const panorama = new Panorama(room.panorama)
  return new Room({ id, panorama })
}

function buildGate (gate, roomsById) {
  const { id, label } = gate
  const { x, y, z } = gate.position
  const position = new Position(x, y, z)
  const goesTo = roomsById[gate.goesTo]

  return new Gate({ id, label, position, goesTo })
}

export default class TourBuilder {
  static fromJSON (jsonTour) {
    const roomsById = jsonTour.rooms.reduce((byId, room) => {
      byId[room.id] = buildRoom(room)
      return byId
    }, {})

    const gatesById = jsonTour.gates.reduce((byId, gate) => {
      byId[gate.id] = buildGate(gate, roomsById)
      return byId
    }, {})

    const rooms = jsonTour.rooms.map(jsonRoom => {
      const room = roomsById[jsonRoom.id]
      const gates = jsonRoom.gates.map(gateId => gatesById[gateId])
      room.allowsGoingTo(gates)
      return room
    })

    const { id, description } = jsonTour
    return new Tour({ id, description, rooms })
  }
}
