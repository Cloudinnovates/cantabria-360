import GateModel from '../domain/model/gate-model'
import RoomModel from '../domain/model/room-model'
import TourModel from '../domain/model/tour-model'
import Position from '../domain/model/position'

const entranceRoom = new RoomModel({
  id: 'entrance',
  panorama: 'assets/images/entrance.jpg'
})

const bedroomRoom = new RoomModel({
  id: 'bedroom',
  panorama: 'assets/images/bedroom.jpg'
})

const kitchenRoom = new RoomModel({
  id: 'kitchen',
  panorama: 'assets/images/kitchen.jpg'
})

const bathroomRoom = new RoomModel({
  id: 'bathroom',
  panorama: 'assets/images/bathroom.jpg'
})

const fromEntranceToBedroom = new GateModel({
  id: 'from-entrance-to-bedroom',
  label: 'Habitación',
  position: new Position(100, 0, -300),
  goesTo: bedroomRoom
})

const fromEntranceToKitchen = new GateModel({
  id: 'from-entrance-to-kitchen',
  label: 'Cocina',
  position: new Position(300, 0, 0),
  goesTo: kitchenRoom
})

const fromEntranceToBathroom = new GateModel({
  id: 'from-entrance-to-bathroom',
  label: 'Baño',
  position: new Position(300, 0, -200),
  goesTo: bathroomRoom
})

const fromBedroomToEntrance = new GateModel({
  id: 'from-bedroom-to-entrance',
  label: 'Entrada',
  position: new Position(250, 0, -300),
  goesTo: entranceRoom
})

const fromKitchenToEntrance = new GateModel({
  id: 'from-kitchen-to-entrance',
  label: 'Entrada',
  position: new Position(-200, 0, 0),
  goesTo: entranceRoom
})

const fromKitchenToBathroom = new GateModel({
  id: 'from-kitchen-to-bathroom',
  label: 'Baño',
  position: new Position(50, 0, -200),
  goesTo: bathroomRoom
})

const fromBathroomToKitchen = new GateModel({
  id: 'from-bathroom-to-kitchen',
  label: 'Cocina',
  position: new Position(200, 0, -300),
  goesTo: kitchenRoom
})

entranceRoom.allowsGoingTo([
  fromEntranceToKitchen,
  fromEntranceToBedroom,
  fromEntranceToBathroom
])

bedroomRoom.allowsGoingTo([
  fromBedroomToEntrance
])

kitchenRoom.allowsGoingTo([
  fromKitchenToEntrance,
  fromKitchenToBathroom
])

bathroomRoom.allowsGoingTo([
  fromBathroomToKitchen
])

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
