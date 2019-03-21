import GateModel from '../domain/model/gate-model'
import { Vector3 } from 'three'
import RoomModel from '../domain/model/room-model'
import TourModel from '../domain/model/tour-model'

const fromEntranceToBedroom = new GateModel({
  id: 'from-entrance-to-bedroom',
  label: 'Habitación',
  position: new Vector3(100, 0, -300),
  goesTo: 'bedroom'
})

const fromEntranceToKitchen = new GateModel({
  id: 'from-entrance-to-kitchen',
  label: 'Cocina',
  position: new Vector3(300, 0, 0),
  goesTo: 'kitchen'
})

const fromEntranceToBethroom = new GateModel({
  id: 'from-entrance-to-bathroom',
  label: 'Baño',
  position: new Vector3(300, 0, -200),
  goesTo: 'bathroom'
})

const entranceRoom = new RoomModel({
  id: 'entrance',
  panorama: 'assets/images/entrance.jpg',
  gates: [
    fromEntranceToBedroom,
    fromEntranceToKitchen,
    fromEntranceToBethroom
  ]
})

const fromBedroomToEntrance = new GateModel({
  id: 'from-bedroom-to-entrance',
  label: 'Entrada',
  position: new Vector3(250, 0, -300),
  goesTo: 'entrance'
})

const bedroomRoom = new RoomModel({
  id: 'bedroom',
  panorama: 'assets/images/bedroom.jpg',
  gates: [
    fromBedroomToEntrance
  ]
})

const fromKitchenToEntrance = new GateModel({
  id: 'from-kitchen-to-entrance',
  label: 'Entrada',
  position: new Vector3(-200, 0, 0),
  goesTo: 'entrance'
})

const fromKitchenToBathroom = new GateModel({
  id: 'from-kitchen-to-bathroom',
  label: 'Baño',
  position: new Vector3(50, 0, -200),
  goesTo: 'bathroom'
})

const kitchenRoom = new RoomModel({
  id: 'kitchen',
  panorama: 'assets/images/kitchen.jpg',
  gates: [
    fromKitchenToEntrance,
    fromKitchenToBathroom
  ]
})

const fromBathroomToKitchen = new GateModel({
  id: 'from-bathroom-to-kitchen',
  label: 'Cocina',
  position: new Vector3(200, 0, -300),
  goesTo: 'kitchen'
})

const bathroomRoom = new RoomModel({
  id: 'bathroom',
  panorama: 'assets/images/bathroom.jpg',
  gates: [
    fromBathroomToKitchen
  ]
})

const firstTour = new TourModel({
  id: 'first-tour',
  rooms: [
    entranceRoom,
    bedroomRoom,
    kitchenRoom,
    bathroomRoom
  ]
})

export { firstTour, entranceRoom }
