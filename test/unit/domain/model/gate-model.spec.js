/* eslint-env jasmine */

import Gate from '../../../../src/domain/model/gate'

describe('Gate', () => {
  describe('#emtpy', () => {
    it('creates and empty gate', () => {
      const gate = Gate.empty()
      expect(gate.id).toEqual('no-gate-id')
      expect(gate.label).toEqual('no-label')
      expect(gate.position.x).toEqual(0)
      expect(gate.position.y).toEqual(0)
      expect(gate.position.z).toEqual(0)
      expect(gate.goesTo).toEqual('no-room')
    })
  })
})
