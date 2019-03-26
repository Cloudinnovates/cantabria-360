import { Math as ThreeMath, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import Context from '../../domain/graph/context'
import PanoramaMesh from './meshes/panorama-mesh'
import GateMesh from './meshes/gate-mesh'
import IntersectDetector from './intersect-detector'
import GeographicCoordinates from '../../domain/graph/geographic-coordinates'

const CAMERA_MOVEMENT_SPEED = 0
const DEFAULT_FOV = 70
const MINIMUM_FOV = 10
const MAXIMUM_FOV = 75

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
    this.geoCoor = new GeographicCoordinates({})
  }

  init () {
    this.camera = new PerspectiveCamera(DEFAULT_FOV, this.browser.windowAspect(), 1, 1000)
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

  coordinates () {
    return this.geoCoor
  }

  setCoordinates (geoCoor) {
    this.geoCoor = geoCoor
  }

  resize () {
    this.camera.aspect = this.browser.windowAspect()
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.browser.width(), this.browser.height())
  }

  zoom (delta) {
    const fov = this.camera.fov + delta * 0.05
    this.camera.fov = ThreeMath.clamp(fov, MINIMUM_FOV, MAXIMUM_FOV)
    this.camera.updateProjectionMatrix()
  }

  update () {
    const updatedCoordinates = this.geoCoor.move(CAMERA_MOVEMENT_SPEED, 0)

    // target MUST be updated this way, `camera.target = position` doesn't work
    const position = updatedCoordinates.position()
    this.camera.target.x = position.x
    this.camera.target.y = position.y
    this.camera.target.z = position.z

    this.camera.lookAt(this.camera.target)
    this.renderer.render(this.scene, this.camera)
    this.setCoordinates(updatedCoordinates)
  }

  detectIntersections (event) {
    const detector = new IntersectDetector(this.scene, this.camera)
    const intersected = detector.gateModel(event)
    if (intersected) {
      this.switchRooms(intersected)
    }
  }

  switchRooms (throughGate) {
    this.setCoordinates(new GeographicCoordinates({}))
    this.scene = createSceneFrom(throughGate.goesTo)
  }
}
