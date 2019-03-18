import {Mesh, MeshBasicMaterial, SphereBufferGeometry, TextureLoader} from "three"

export default class PanoramaMesh {
  constructor() {
    this.textureLoader = new TextureLoader()
    this.material = null
  }

  create(scene, imagePath) {
    const geometry = new SphereBufferGeometry(500, 60, 40)

    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1)

    const texture = this.textureLoader.load(imagePath)
    const material = new MeshBasicMaterial({ map: texture})
    const mesh = new Mesh(geometry, material)
    mesh.name = 'panorama'

    this.material = material
    scene.add(mesh)
  }

  update(newImagePath) {
    this.material.map = this.textureLoader.load(newImagePath)
  }
}