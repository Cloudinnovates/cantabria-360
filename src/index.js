import ThreeContext from './infrastructure/three/three-context'
import Browser from './infrastructure/browser/browser'
import MovementInteraction from './infrastructure/interactions/movement-interaction'
import TourBuilder from './domain/builders/tour-builder'
import TourRepository from './infrastructure/tour-repository'
import ShowError from './infrastructure/show-error'
import IntersectionInteraction from './infrastructure/interactions/intersection-interaction'

const browser = new Browser()
const context = new ThreeContext(browser)
const mover = new MovementInteraction(context)
const intersectioner = new IntersectionInteraction(context)

function tooltipInteraction (event) {
  const tooltip = document.getElementById('tooltip')
  tooltip.className = 'active'
  tooltip.innerText = `x: ${event.clientX}, y: ${event.clientY}`
  tooltip.style.top = (event.clientY + 20) + 'px'
  tooltip.style.left = event.clientX + 'px'
}

function tooltipInteractionStop () {
  const tooltip = document.getElementById('tooltip')
  tooltip.className = 'inactive'
}

function configureEventListeners () {
  document.addEventListener('mousedown', mover.start.bind(mover), false)
  document.addEventListener('mousemove', mover.move.bind(mover), false)
  document.addEventListener('mouseup', mover.end.bind(mover), false)
  document.addEventListener('touchstart', mover.start.bind(mover), false)
  document.addEventListener('touchmove', mover.move.bind(mover), false)
  document.addEventListener('touchend', mover.end.bind(mover), false)
  document.addEventListener('wheel', context.zoom.bind(context), false)

  document.addEventListener('mousedown', intersectioner.start.bind(intersectioner), false)
  document.addEventListener('mouseup', intersectioner.end.bind(intersectioner), false)
  document.addEventListener('touchstart', intersectioner.start.bind(intersectioner), false)
  document.addEventListener('touchend', intersectioner.end.bind(intersectioner), false)

  document.addEventListener('mousemove', tooltipInteraction, false)
  document.addEventListener('mouseup', tooltipInteractionStop, false)

  window.addEventListener('resize', context.resize.bind(context), false)
}

const tourId = browser.tourId()
if (tourId) {
  TourRepository.find(tourId)
    .then(jsonTour => {
      context.init(TourBuilder.fromJSON(jsonTour))
      configureEventListeners()
    })
} else {
  ShowError.tourIdNotFound()
}
