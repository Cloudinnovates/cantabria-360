/* eslint-env jasmine */

import GeographicCoordinates from '../../../../src/domain/graph/geographic-coordinates'
import Position from '../../../../src/domain/model/position'

describe('GeographicCoordinates', () => {
  let coordinates

  beforeEach(() => {
    coordinates = new GeographicCoordinates()
  })

  it('can be created', () => {
    expect(coordinates).toBeDefined()
  })

  describe('#move', () => {
    it('does not mutate the original coordinates', () => {
      const oldCoordinates = coordinates
      coordinates.move(123, 321)
      expect(oldCoordinates).toEqual(coordinates)
    })

    it('creates a new coordinates object', () => {
      const newCoordinates = coordinates.move(123, 321)
      expect(newCoordinates).not.toEqual(coordinates)
    })
  })

  describe('#position', () => {
    it('creates a 3D position', () => {
      const position = coordinates.position()
      expect(position instanceof Position).toBeTruthy()
      expect(position.x).toBeDefined()
      expect(position.y).toBeDefined()
      expect(position.z).toBeDefined()
    })
  })
})
