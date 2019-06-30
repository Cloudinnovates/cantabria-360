/* eslint-env jasmine */

import TourBuilder from '../../../../src/domain/builders/tour-builder'

function jsonRoom () {
  return {
    id: 'irrelevant-room-id',
    panorama: 'irrelevant-panorama-url',
    gates: []
  }
}

describe('GeographicCoordinates', () => {
  describe('#fromJSON', () => {
    let definition

    beforeEach(() => {
      definition = {
        id: 'irrelevant id',
        description: 'irrelevant descriptions',
        rooms: [],
        gates: []
      }
    })

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

    it('builds one room without gates', () => {
      definition.rooms = [ jsonRoom() ]
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.rooms.length).toEqual(1)
    })

    it('builds several rooms without gates', () => {
      definition.rooms = [ jsonRoom(), jsonRoom(), jsonRoom() ]
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.rooms.length).toEqual(3)
    })
  })
})
