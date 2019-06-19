import Position from '../model/position'

const DEGREES_BY_PI_RADIANS = 180
const MAX_VISIBLE_DEGREES = 85
const RADIUS = 500

function clamp (value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function degreeToRadian (degree) {
  return degree * Math.PI / DEGREES_BY_PI_RADIANS
}

export default class GeographicCoordinates {
  constructor ({ longitude = 0, latitude = 0 } = {}) {
    this.longitude = longitude
    this.latitude = latitude
  }

  move (deltaX, deltaY) {
    const longitude = deltaX + this.longitude
    const latitude = clamp(this.latitude + deltaY, -MAX_VISIBLE_DEGREES, MAX_VISIBLE_DEGREES)
    return new GeographicCoordinates({ longitude, latitude })
  }

  position () {
    const phi = degreeToRadian((DEGREES_BY_PI_RADIANS / 2) - this.latitude)
    const theta = degreeToRadian(this.longitude)
    return new Position(
      RADIUS * Math.sin(phi) * Math.cos(theta),
      RADIUS * Math.cos(phi),
      RADIUS * Math.sin(phi) * Math.sin(theta)
    )
  }
}
