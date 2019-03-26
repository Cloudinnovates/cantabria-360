import { Math as ThreeMath } from 'three'
import Position from '../../domain/model/position'

export default class GeographicCoordinates {
  constructor ({ longitude = 0, latitude = 0 }) {
    this.longitude = longitude
    this.latitude = latitude
  }

  moveLongitude (delta) {
    const longitude = this.longitude + delta
    const latitude = Math.max(-85, Math.min(85, this.latitude))
    return new GeographicCoordinates({ longitude, latitude })
  }

  moveDelta (deltaX, deltaY) {
    const longitude = deltaX + this.longitude
    const latitude = deltaY + this.latitude
    return new GeographicCoordinates({ longitude, latitude })
  }

  position () {
    const phi = ThreeMath.degToRad(90 - this.latitude)
    const theta = ThreeMath.degToRad(this.longitude)
    return new Position(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta)
    )
  }
}
