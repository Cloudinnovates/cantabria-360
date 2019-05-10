/* eslint-env jasmine */

import Room from '../../../../src/domain/model/room'

describe('Room', () => {
  it('is created with no gates', () => {
    const room = new Room({ id: 'id', panorama: 'panorama' })
    expect(room.gates.length).toEqual(0)
  })

  describe('allowsGoingTo', () => {
    it('sets the gates within the room', () => {
      const gates = [ 1, 'two', 3.3 ]
      const room = new Room({ id: 'id', panorama: 'panorama' })
      room.allowsGoingTo(gates)
    })
  })
})
