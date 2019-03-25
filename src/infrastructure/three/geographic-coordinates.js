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
}
