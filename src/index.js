/* global fetch, requestAnimationFrame */

import ThreeContext from './infrastructure/three/three-context'
import Browser from './infrastructure/browser/browser'
import Interaction from './infrastructure/interaction'
import TourBuilder from './domain/model/tour-builder'

const browser = new Browser()
const context = new ThreeContext(browser)
const interaction = new Interaction(context)

function configureEventListeners () {
  document.addEventListener('mousedown', interaction.start.bind(interaction), false)
  document.addEventListener('mousemove', interaction.move.bind(interaction), false)
  document.addEventListener('mouseup', interaction.end.bind(interaction), false)
  document.addEventListener('touchstart', interaction.start.bind(interaction), false)
  document.addEventListener('touchmove', interaction.move.bind(interaction), false)
  document.addEventListener('touchend', interaction.end.bind(interaction), false)
  document.addEventListener('wheel', context.zoom.bind(context), false)

  window.addEventListener('resize', context.resize.bind(context), false)
}

function animate () {
  requestAnimationFrame(animate)
  context.update()
}

const tourId = browser.tourId()
if (!tourId) {
  const info = document.getElementById('info')
  info.innerHTML = '<h1>No he podido encontrar un tour</h1>'
} else {
  fetch(`src/data/tour-${tourId}.json`)
    .then(response => response.json())
    .then(jsonTour => {
      context.init(TourBuilder.fromJSON(jsonTour))
      configureEventListeners()
      animate()
    })
}
