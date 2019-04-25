/**
 * Interaction to launch the computation to detect interactions
 */
export default class SwitchRoomsInteraction {
  constructor (context) {
    this.context = context
  }

  start (event) {}
  move (event) {}

  end (event) {
    const intersected = this.context.intersectedGate(event)
    if (intersected) {
      this.context.switchRooms(intersected)
    }
  }
}
