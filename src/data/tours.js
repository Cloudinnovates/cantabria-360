import GateModel from '../model/gate-model'
import { Vector3 } from 'three'
import RoomModel from '../model/room-model'
import TourModel from '../model/tour-model'

const bedroomGate = new GateModel({
  id: 'from-entrance-to-bedroom',
  label: 'Habitación',
  position: new Vector3(175, 0, -300)
})

const kitchenGate = new GateModel({
  id: 'from-entrance-to-kitchen',
  label: 'Cocina',
  position: new Vector3(300, 0, 0)
})

const bathroomGate = new GateModel({
  id: 'from-entrance-to-bathroom',
  label: 'Baño',
  position: new Vector3(300, 0, -200)
})

const entranceRoom = new RoomModel({
  id: 'entrance',
  gates: [
    bedroomGate,
    kitchenGate,
    bathroomGate
  ]
})

const firstTour = new TourModel({
  id: 'first-tour',
  rooms: [
    entranceRoom
  ]
})

export { firstTour, entranceRoom }
