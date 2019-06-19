/* eslint-env jasmine */

import TooltipInteraction from '../../../../src/domain/interactions/tooltip-interaction'

describe('TooltipInteraction', () => {
  let context, $tooltip, position, intersected, interaction

  beforeEach(() => {
    context = {}
    $tooltip = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide')
    }
    position = {}
    intersected = {}
    interaction = new TooltipInteraction(context, $tooltip)
  })

  it('can be created', () => {
    expect(interaction).toBeDefined()
  })

  describe('#move', () => {
    it('shows tooltip', () => {
      context.intersectedGate = jasmine
        .createSpy('intersectedGate')
        .and.returnValue(intersected)
      interaction.move(position)
      expect($tooltip.show).toHaveBeenCalled()
      expect($tooltip.hide).not.toHaveBeenCalled()
    })

    it('hides tooltip', () => {
      context.intersectedGate = jasmine.createSpy('intersectedGate')
      interaction.move(position)
      expect($tooltip.show).not.toHaveBeenCalled()
      expect($tooltip.hide).toHaveBeenCalled()
    })
  })

  describe('unused methods', () => {
    it('#start', () => {
      interaction.start()
    })

    it('#end', () => {
      interaction.end()
    })
  })
})
