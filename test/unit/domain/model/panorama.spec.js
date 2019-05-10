/* eslint-env jasmine */

import Panorama from '../../../../src/domain/model/panorama'

describe('Panorama', () => {
  it('can be created', () => {
    const panorama = new Panorama('irrelevant-path')

    expect(panorama).toBeDefined()
    expect(panorama.path).toBeDefined()
  })
})
