
function extract (event, prop) {
  if (event[prop]) {
    return event[prop]
  }

  if (!event.touches) {
    return 0
  }

  return event.touches[0][prop]
}

export default class Interaction {
  constructor (context) {
    this.interacting = false
    this.context = context
  }

  start (event) {
    this.interacting = true

    this.startX = extract(event, 'clientX')
    this.startY = extract(event, 'clientY')

    this.startCoordinates = this.context.coordinates()
  }

  move (event) {
    if (!this.interacting) {
      return
    }

    const clientX = extract(event, 'clientX')
    const clientY = extract(event, 'clientY')

    const deltaX = (this.startX - clientX) * 0.1
    const deltaY = (clientY - this.startY) * 0.1
    this.context.setCoordinates(this.startCoordinates.move(deltaX, deltaY))
  }

  end (event) {
    this.interacting = false
    this.context.detectIntersections(event)
  }
}
