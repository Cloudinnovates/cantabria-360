/* eslint-env jasmine */

import TourBuilder from '../../../../src/domain/builders/tour-builder'

function jsonRoom () {
  return {
    id: 'irrelevant-room-id',
    panorama: 'irrelevant-panorama-url',
    gates: []
  }
}

function jsonGate () {
  return {
    id: 'irrelevant-gate-id',
    position: { x: 1, y: 2, z: 3 }
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
      definition.rooms.push(jsonRoom())
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.rooms.length).toEqual(1)
    })

    it('builds several rooms without gates', () => {
      definition.rooms.push(jsonRoom())
      definition.rooms.push(jsonRoom())
      definition.rooms.push(jsonRoom())
      const tour = TourBuilder.fromJSON(definition)
      expect(tour.rooms.length).toEqual(3)
    })

    it('builds one room with one gate', () => {
      const gate = jsonGate()
      definition.gates.push(gate)

      const room = jsonRoom()
      room.gates.push(gate.id) // room's gates are linked by id
      definition.rooms.push(room)

      const tour = TourBuilder.fromJSON(definition)

      expect(tour.rooms[0].gates.length).toEqual(1)
      expect(tour.rooms[0].gates[0].id).toEqual(gate.id)
    })
  })
})
