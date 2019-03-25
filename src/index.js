/* global requestAnimationFrame */

import { firstTour } from './data/tours'
import ThreeContext from './infrastructure/three/three-context'
import Browser from './infrastructure/browser/browser'
import Interaction from './infrastructure/interaction'

let currentTour = firstTour

const interaction = new Interaction()
const browser = new Browser()
const context = new ThreeContext(browser)
context.init()
context.initTour(currentTour)

init()
animate()

function init () {
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
  context.resize()
}

function onPointerStart (event) {
  interaction.start(event, context)
}

function onPointerMove (event) {
  interaction.move(event, context)
}

function onPointerUp (event) {
  interaction.end(event, context)
}

function onDocumentMouseWheel (event) {
  context.zoom(event.deltaY)
}

function update () {
  context.update()
}

function animate () {
  requestAnimationFrame(animate)
  update()
}
