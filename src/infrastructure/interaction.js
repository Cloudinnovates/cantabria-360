import GeographicCoordinates from './three/geographic-coordinates'

// TODO check event.touches is defined
export default class Interaction {
  constructor () {
    this.interacting = false
  }

  start (event, context) {
    this.interacting = true

    this.startX = event.clientX || event.touches[0].clientX
    this.startY = event.clientY || event.touches[0].clientY

    const coordinates = context.coordinates()
    this.startLongitude = coordinates.longitude
    this.startLatitude = coordinates.latitude
  }

  move (event, context) {
    if (!this.interacting) {
      return
    }

    const clientX = event.clientX || event.touches[0].clientX
    const clientY = event.clientY || event.touches[0].clientY

    // TODO coordinates seems to have their own entity and logic
    const longitude = (this.startX - clientX) * 0.1 + this.startLongitude
    const latitude = (clientY - this.startY) * 0.1 + this.startLatitude
    const coordinates = new GeographicCoordinates({ longitude, latitude })
    context.setCoordinates(coordinates)
  }

  end (event, context) {
    this.interacting = false
    context.detectIntersections(event)
  }
}
