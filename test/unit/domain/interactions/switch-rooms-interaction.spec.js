/* eslint-env jasmine */

import Position from '../../../../src/domain/model/position'
import SwitchRoomsInteraction from '../../../../src/domain/interactions/switch-rooms-interaction'

describe('SwitchRoomsInteraction', () => {
  let position, context, interaction

  beforeEach(() => {
    context = {
      intersectedGate: jasmine.createSpy('intersectedGateSpy'),
      switchRooms: jasmine.createSpy('switchGates')
    }
    interaction = new SwitchRoomsInteraction(context)
    position = new Position(100, 100, 100)
  })

  it('can be created', () => {
    expect(interaction).toBeDefined()
  })

  describe('#end', () => {
    it('checks for an intersected gate', () => {
      interaction.end(position)

      expect(context.intersectedGate).toHaveBeenCalledWith(position)
      expect(context.switchRooms).not.toHaveBeenCalled()
    })

    it('switches to intersected room', () => {
      const intersected = 'irrelevant gate'
      context.intersectedGate.and.returnValue(intersected)

      interaction.end(position)

      expect(context.switchRooms).toHaveBeenCalledWith(intersected)
    })
  })

  describe('unused methods', () => {
    it('#start', () => {
      interaction.start()
    })

    it('#move', () => {
      interaction.move()
    })
  })
})
