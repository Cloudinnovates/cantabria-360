/* global requestAnimationFrame */

import {
  Math as ThreeMath,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three'
import GateMesh from './infrastructure/three/meshes/gate-mesh'
import PanoramaMesh from './infrastructure/three/meshes/panorama-mesh'
import { firstTour } from './data/tours'
import IntersectDetector from './infrastructure/three/intersect-detector'

const CAMERA_MOVEMENT_SPEED = 0

let isUserInteracting = false
let onMouseDownMouseX = 0
let onMouseDownMouseY = 0
let onMouseDownLon = 0
let onMouseDownLat = 0
let lon = 0
let lat = 0

let currentTour = firstTour

const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
camera.target = new Vector3(0, 0, 0)
const renderer = new WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

let scene = createSceneFrom(currentTour.startingRoom())
init()
animate()

function init () {
  const container = document.getElementById('container')
  container.appendChild(renderer.domElement)

  document.addEventListener('mousedown', onPointerStart, false)
  document.addEventListener('mousemove', onPointerMove, false)
  document.addEventListener('mouseup', onPointerUp, false)
  document.addEventListener('touchstart', onPointerStart, false)
  document.addEventListener('touchmove', onPointerMove, false)
  document.addEventListener('touchend', onPointerUp, false)

  document.addEventListener('wheel', onDocumentMouseWheel, false)

  //

  // document.addEventListener('dragover', function (event) {
  //   event.preventDefault()
  //   event.dataTransfer.dropEffect = 'copy'
  // }, false)
  //
  // document.addEventListener('dragenter', function () {
  //   document.body.style.opacity = 0.5
  // }, false)
  //
  // document.addEventListener('dragleave', function () {
  //   document.body.style.opacity = 1
  // }, false)
  //
  // document.addEventListener('drop', function (event) {
  //   event.preventDefault()
  //
  //   const reader = new FileReader()
  //   reader.addEventListener('load', function (event) {
  //     panorama.update(event.target.result)
  //   }, false)
  //   reader.readAsDataURL(event.dataTransfer.files[0])
  //
  //   document.body.style.opacity = 1
  // }, false)

  // document.onkeyup = function (event) {
  //   panoramaIndex = (panoramaIndex + 1) % panoramas.length
  //   panorama.update(panoramas[panoramaIndex])
  // }

  //

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onPointerStart (event) {
  isUserInteracting = true

  var clientX = event.clientX || event.touches[0].clientX
  var clientY = event.clientY || event.touches[0].clientY

  onMouseDownMouseX = clientX
  onMouseDownMouseY = clientY

  onMouseDownLon = lon
  onMouseDownLat = lat
}

function onPointerMove (event) {
  if (isUserInteracting !== true) {
    return
  }

  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY

  lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon
  lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat
}

function onPointerUp (event) {
  isUserInteracting = false

  // detect intersections
  const detector = new IntersectDetector(scene, camera)
  const intersected = detector.gateModel(event)
  if (intersected) {
    switchRooms(intersected)
  }
}

function onDocumentMouseWheel (event) {
  var fov = camera.fov + event.deltaY * 0.05

  camera.fov = ThreeMath.clamp(fov, 10, 75)

  camera.updateProjectionMatrix()
}

function animate () {
  requestAnimationFrame(animate)
  moveLongitude()
  update()
}

function moveLongitude () {
  if (isUserInteracting !== false) {
    return
  }

  lon += CAMERA_MOVEMENT_SPEED
}

function update () {
  lat = Math.max(-85, Math.min(85, lat))
  const phi = ThreeMath.degToRad(90 - lat)
  const theta = ThreeMath.degToRad(lon)

  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta)
  camera.target.y = 500 * Math.cos(phi)
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta)

  camera.lookAt(camera.target)
  renderer.render(scene, camera)
}

function resetCameraCoordinates() {
  lon = 0
  lat = 0
}

function createSceneFrom (room) {
  const scene = new Scene()

  const panorama = new PanoramaMesh()
  panorama.create(scene, room.panorama)

  const gateMesh = new GateMesh()
  room.gates.forEach(gate => gateMesh.create(scene, gate))

  return scene
}

function switchRooms (throughGate) {
  resetCameraCoordinates()
  scene = createSceneFrom(throughGate.goesTo)
}
