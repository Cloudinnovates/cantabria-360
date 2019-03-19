import GateModel from './gate-model'

export default class TourModel {
  constructor ({ id, rooms }) {
    this.id = id
    this.rooms = rooms
  }

  startingRoom () {
    if (!this.rooms) {
      return GateModel.empty()
    }

    return this.rooms[0]
  }
}
