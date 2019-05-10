/* eslint-env jasmine */

import Tour from '../../../../src/domain/model/tour'

function buildTour () {
  const id = 'tour-id'
  const description = 'tour-desc'
  const rooms = [ 'first-room-id', 2, 3.3 ]
  return new Tour({ id, description, rooms })
}

describe('Tour', () => {
  it('can be created', () => {
    const tour = buildTour()

    expect(tour).toBeDefined()
    expect(tour.id).toBeDefined()
    expect(tour.description).toBeDefined()
    expect(tour.rooms).toBeDefined()
  })

  describe('#startingRoom', () => {
    it('gets the first room in the tour', () => {
      const tour = buildTour()
      expect(tour.startingRoom()).toEqual('first-room-id')
    })
  })
})
