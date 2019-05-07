/* global requestAnimationFrame */

import { Math as ThreeMath, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import Context from '../../domain/graph/context'
import PanoramaMesh from './meshes/panorama-mesh'
import IntersectDetector from './intersect-detector'
import GeographicCoordinates from '../../domain/graph/geographic-coordinates'
import GateMeshBuilder from './meshes/gate-mesh-builder'

const CAMERA_MOVEMENT_SPEED = 0
const DEFAULT_FOV = 70
const MINIMUM_FOV = 10
const MAXIMUM_FOV = 75

function createSceneFrom (room) {
  const scene = new Scene()
  const panorama = new PanoramaMesh()

  panorama.loadTexture(room.panorama.path)
    .then(texture => {
      panorama.create(scene, texture)
    })
    .then(() => {
      return room.gates.forEach(gate => GateMeshBuilder.justCircle(scene, gate))
    })

  return scene
}

export default class ThreeContext extends Context {
  constructor (browser) {
    super()
    this.browser = browser
    this.coordinates = new GeographicCoordinates({})
  }

  init (tour) {
    this.camera = new PerspectiveCamera(DEFAULT_FOV, this.browser.windowAspect(), 1, 1000)
    this.camera.target = new Vector3(0, 0, 0)

    this.renderer = new WebGLRenderer()
    this.renderer.setPixelRatio(this.browser.pixelRatio())
    this.renderer.setSize(this.browser.width(), this.browser.height())

    this.browser.showLoadingScene()
      .then(() => {
        return createSceneFrom(tour.startingRoom())
      })
      .then(scene => {
        this.scene = scene
        return scene
      })
      .then(() => {
        this.browser.setTourDescription(tour)
        this.browser.renderScene(this.renderer)
        this.start()
      })
  }

  start () {
    requestAnimationFrame(this.start.bind(this))
    this.update()
  }

  resize () {
    this.camera.aspect = this.browser.windowAspect()
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.browser.width(), this.browser.height())
  }

  zoom (event) {
    const delta = event.deltaY
    const fov = this.camera.fov + delta * 0.05
    this.camera.fov = ThreeMath.clamp(fov, MINIMUM_FOV, MAXIMUM_FOV)
    this.camera.updateProjectionMatrix()
  }

  update () {
    const updatedCoordinates = this.coordinates.move(CAMERA_MOVEMENT_SPEED, 0)

    // target MUST be updated this way, `camera.target = position` doesn't work
    const position = updatedCoordinates.position()
    this.camera.target.x = position.x
    this.camera.target.y = position.y
    this.camera.target.z = position.z

    this.camera.lookAt(this.camera.target)
    this.renderer.render(this.scene, this.camera)
    this.coordinates = updatedCoordinates
  }

  intersectedGate (position) {
    const detector = new IntersectDetector(this.scene, this.camera)
    return detector.gateModel(position)
  }

  switchRooms (throughGate) {
    this.coordinates = new GeographicCoordinates({})
    this.scene = createSceneFrom(throughGate.goesTo)
  }
}
