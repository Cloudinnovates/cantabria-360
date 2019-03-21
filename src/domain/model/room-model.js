export default class RoomModel {
  constructor ({ id, panorama, gates }) {
    this.id = id
    this.panorama = panorama
    this.gates = gates
  }

  allowsGoingTo(gates) {
    this.gates = gates
  }
}
