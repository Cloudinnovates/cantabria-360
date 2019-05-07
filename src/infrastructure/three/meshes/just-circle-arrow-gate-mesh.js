import { Sprite, SpriteMaterial, TextureLoader } from 'three'

export default class CircleArrowGateMesh {
  create (scene, gate) {
    const { x, y, z } = gate.position

    // square with some texture
    const texture = new TextureLoader().load('assets/images/circle-arrow.png')
    const crateMaterial = new SpriteMaterial({ map: texture })
    const sprite = new Sprite(crateMaterial)
    sprite.position.set(x, y, z)
    sprite.scale.set(50, 50, 1.0)
    sprite.name = `gate-${gate.id}`
    sprite.userData = gate

    scene.add(sprite)
  }
}
