/* eslint-env jasmine */

import MovementInteraction from '../../../../src/domain/interactions/movement-interaction'
import Position from '../../../../src/domain/model/position'
import GeographicCoordinates from '../../../../src/domain/graph/geographic-coordinates'

describe('MovementInteraction', () => {
  let startPosition, endPosition, coordinates, context, interaction

  beforeEach(() => {
    coordinates = new GeographicCoordinates()
    context = { coordinates }
    interaction = new MovementInteraction(context)
    startPosition = new Position(50, 50, 50)
    endPosition = new Position(100, 100, 100)
  })

  it('can be created', () => {
    expect(interaction).toBeDefined()
    expect(interaction.interacting).toBeFalsy()
    expect(interaction.startPosition).toBeNull()
  })

  describe('#start', () => {
    it('starts an interaction', () => {
      interaction.start(startPosition)
      expect(interaction.interacting).toBeTruthy()
    })

    it('saves the position for later', () => {
      interaction.start(startPosition)
      expect(interaction.startPosition).toEqual(startPosition)
    })

    it('saves context coordinates for later', () => {
      interaction.start(startPosition)
      expect(interaction.startCoordinates).toEqual(context.coordinates)
    })
  })

  describe('#move', () => {
    it('does nothing if interaction did not started yet', () => {
      interaction.end(startPosition)
      interaction.move(endPosition)

      expect(context.coordinates).toEqual(coordinates)
    })

    it('updates context coordinates', () => {
      interaction.start(startPosition)
      interaction.move(endPosition)

      expect(context.coordinates).not.toEqual(coordinates)
    })
  })

  describe('#end', () => {
    it('ends an interaction', () => {
      interaction.start(startPosition)
      interaction.end(endPosition)
      expect(interaction.interacting).toBeFalsy()
    })
  })
})
