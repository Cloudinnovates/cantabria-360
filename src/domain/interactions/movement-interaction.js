
export default class MovementInteraction {
  constructor (context) {
    this.interacting = false
    this.context = context
    this.startPosition = null
  }

  start (position) {
    this.interacting = true
    this.startPosition = position
    this.startCoordinates = this.context.coordinates
  }

  move (position) {
    if (!this.interacting) {
      return
    }

    const deltaX = (this.startPosition.x - position.x) * 0.1
    const deltaY = (position.y - this.startPosition.y) * 0.1
    this.context.coordinates = this.startCoordinates.move(deltaX, deltaY)
  }

  end (position) {
    this.interacting = false
  }
}
