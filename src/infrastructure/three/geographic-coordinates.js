import Position from '../../domain/model/position'

function clamp (value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function degreeToRadian (degree) {
  return degree * Math.PI / 180
}

export default class GeographicCoordinates {
  constructor ({ longitude = 0, latitude = 0 }) {
    this.longitude = longitude
    this.latitude = latitude
  }

  move (deltaX, deltaY) {
    const longitude = deltaX + this.longitude
    const latitude = clamp(this.latitude + deltaY, -85, 85)
    return new GeographicCoordinates({ longitude, latitude })
  }

  position () {
    const phi = degreeToRadian(90 - this.latitude)
    const theta = degreeToRadian(this.longitude)
    return new Position(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta)
    )
  }
}
