/**
 * Interaction to launch the computation to detect interactions
 */
export default class SwitchRoomsInteraction {
  constructor (context) {
    this.context = context
  }

  start (position) {}
  move (position) {}

  end (position) {
    const intersected = this.context.intersectedGate(position)
    if (intersected) {
      this.context.switchRooms(intersected)
    }
  }
}
