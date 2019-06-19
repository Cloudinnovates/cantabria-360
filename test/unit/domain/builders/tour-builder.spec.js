/* eslint-env jasmine */

import TourBuilder from '../../../../src/domain/builders/tour-builder'

describe('GeographicCoordinates', () => {
  describe('#fromJSON', () => {
    const definition = {
      id: 'irrelevant id',
      description: 'irrelevant descriptions',
      rooms: []
    }

    it('copies id from definition', () => {
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.id).toEqual(definition.id)
    })

    it('copies description from definition', () => {
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.description).toEqual(definition.description)
    })

    it('builds tour without rooms', () => {
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.rooms.length).toEqual(0)
    })
  })
})
