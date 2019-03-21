export default class RoomModel {
  constructor ({ id, panorama, gates }) {
    this.id = id
    this.panorama = panorama
    this.gates = gates
  }

  canVisit(gates) {
    this.gates = gates
  }
}
