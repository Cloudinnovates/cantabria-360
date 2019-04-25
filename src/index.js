import ThreeContext from './infrastructure/three/three-context'
import Browser from './infrastructure/browser/browser'
import Interaction from './infrastructure/interactions/interaction'
import TourBuilder from './domain/builders/tour-builder'
import TourRepository from './infrastructure/tour-repository'
import ShowError from './infrastructure/show-error'

const browser = new Browser()
const context = new ThreeContext(browser)
const interaction = new Interaction(context)

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
  document.addEventListener('mousedown', interaction.start.bind(interaction), false)
  document.addEventListener('mousemove', interaction.move.bind(interaction), false)
  document.addEventListener('mouseup', interaction.end.bind(interaction), false)
  document.addEventListener('touchstart', interaction.start.bind(interaction), false)
  document.addEventListener('touchmove', interaction.move.bind(interaction), false)
  document.addEventListener('touchend', interaction.end.bind(interaction), false)
  document.addEventListener('wheel', context.zoom.bind(context), false)

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
