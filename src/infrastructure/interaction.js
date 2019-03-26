// TODO check event.touches is defined
export default class Interaction {
  constructor () {
    this.interacting = false
  }

  start (event, context) {
    this.interacting = true

    this.startX = event.clientX || event.touches[0].clientX
    this.startY = event.clientY || event.touches[0].clientY

    this.startCoordinates = context.coordinates()
  }

  move (event, context) {
    if (!this.interacting) {
      return
    }

    const clientX = event.clientX || event.touches[0].clientX
    const clientY = event.clientY || event.touches[0].clientY

    const deltaX = (this.startX - clientX) * 0.1
    const deltaY = (clientY - this.startY) * 0.1
    context.setCoordinates(this.startCoordinates.move(deltaX, deltaY))
  }

  end (event, context) {
    this.interacting = false
    context.detectIntersections(event)
  }
}
