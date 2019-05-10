/* eslint-env jasmine */

import GateModel from '../../../../src/domain/model/gate-model'

describe('GateModel', () => {
  describe('#emtpy', () => {
    it('creates and empty gate', () => {
      const gate = GateModel.empty()
      expect(gate.id).toEqual('no-gate-id')
      expect(gate.label).toEqual('no-label')
      expect(gate.position.x).toEqual(0)
      expect(gate.position.y).toEqual(0)
      expect(gate.position.z).toEqual(0)
      expect(gate.goesTo).toEqual('no-room')
    })
  })
})
