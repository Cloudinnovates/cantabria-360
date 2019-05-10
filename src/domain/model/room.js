export default class Room {
  constructor ({ id, panorama }) {
    this.id = id
    this.panorama = panorama
    this.gates = []
  }

  allowsGoingTo (gates) {
    this.gates = gates
  }
}
