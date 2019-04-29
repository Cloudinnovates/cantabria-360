import ThreeContext from './infrastructure/three/three-context'
import Browser from './infrastructure/browser/browser'
import MovementInteraction from './infrastructure/interactions/movement-interaction'
import TourBuilder from './domain/builders/tour-builder'
import TourRepository from './infrastructure/tour-repository'
import ShowError from './infrastructure/show-error'
import SwitchRoomsInteraction from './infrastructure/interactions/switch-rooms-interaction'
import TooltipInteraction from './infrastructure/interactions/tooltip-interaction'
import InteractionAdapter from './infrastructure/interactions/interaction-adapter'

const browser = new Browser()
const context = new ThreeContext(browser)
const mover = new InteractionAdapter(new MovementInteraction(context))
const switcher = new SwitchRoomsInteraction(context)
const tooltiper = new TooltipInteraction(context)

function configureEventListeners () {
  document.addEventListener('mousedown', mover.start.bind(mover), false)
  document.addEventListener('mousemove', mover.move.bind(mover), false)
  document.addEventListener('mouseup', mover.end.bind(mover), false)
  document.addEventListener('touchstart', mover.start.bind(mover), false)
  document.addEventListener('touchmove', mover.move.bind(mover), false)
  document.addEventListener('touchend', mover.end.bind(mover), false)
  document.addEventListener('wheel', context.zoom.bind(context), false)

  document.addEventListener('mousedown', switcher.start.bind(switcher), false)
  document.addEventListener('mouseup', switcher.end.bind(switcher), false)
  document.addEventListener('touchstart', switcher.start.bind(switcher), false)
  document.addEventListener('touchend', switcher.end.bind(switcher), false)

  document.addEventListener('mousemove', tooltiper.move.bind(tooltiper), false)

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
