import { Mesh, MeshBasicMaterial, SphereBufferGeometry, TextureLoader } from 'three'

export default class PanoramaMesh {
  constructor () {
    this.textureLoader = new TextureLoader()
    this.material = null
  }

  create (scene, panorama) {
    const geometry = new SphereBufferGeometry(500, 60, 40)

    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1)

    const texture = this.textureLoader.load(panorama.path)
    const material = new MeshBasicMaterial({map: texture})
    const mesh = new Mesh(geometry, material)
    mesh.name = 'panorama'
    mesh.userData = this

    this.material = material

    scene.add(mesh)
  }
}
