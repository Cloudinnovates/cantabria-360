import Context from '../../domain/graph/context'
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import PanoramaMesh from './meshes/panorama-mesh'
import GateMesh from './meshes/gate-mesh'

function createSceneFrom (room) {
  const scene = new Scene()

  const panorama = new PanoramaMesh()
  panorama.create(scene, room.panorama)

  const gateMesh = new GateMesh()
  room.gates.forEach(gate => gateMesh.create(scene, gate))

  return scene
}

export default class ThreeContext extends Context {
  constructor (browser) {
    super()
    this.browser = browser
  }

  init () {
    this.camera = new PerspectiveCamera(70, this.browser.windowAspect(), 1, 1000)
    this.camera.target = new Vector3(0, 0, 0)

    this.renderer = new WebGLRenderer()
    this.renderer.setPixelRatio(this.browser.pixelRatio())
    this.renderer.setSize(this.browser.width(), this.browser.height())
  }

  initTour (tour) {
    this.browser.setTourDescription(tour)
    this.scene = createSceneFrom(tour.startingRoom())
    this.browser.renderScene(this.renderer)

    return this.scene
  }
}
