import { Mesh, MeshBasicMaterial, SphereBufferGeometry, TextureLoader } from 'three'

export default class PanoramaMesh {
  create (scene, texture) {
    const material = new MeshBasicMaterial({ map: texture })

    // invert the geometry on the x-axis so that all of the faces point inward
    const geometry = new SphereBufferGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1)

    const mesh = new Mesh(geometry, material)
    mesh.name = 'panorama'
    mesh.userData = this

    return scene.add(mesh)
  }

  loadTexture (path) {
    return new Promise(function (resolve, reject) {
      const loader = new TextureLoader()
      loader.load(path, texture => {
        resolve(texture)
      })
    })
  }
}
