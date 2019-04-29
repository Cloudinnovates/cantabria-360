import Position from '../../domain/model/position'

function extract (event, prop) {
  if (event[prop]) {
    return event[prop]
  }

  if (!event.touches) {
    return 0
  }

  return event.touches[0][prop]
}

function buildPosition (event) {
  const x = extract(event, 'clientX')
  const y = extract(event, 'clientY')
  const z = 0

  return new Position(x, y, z)
}
/**
 * The idea is to adapt a browser event to a data class useful for Interactions so that
 * Interactions can be classes of the model, without external dependencies
 */
export default class InteractionAdapter {
  constructor (interaction) {
    this.interaction = interaction
  }

  start (event) {
    this.interaction.start(buildPosition(event))
  }

  move (event) {
    this.interaction.move(buildPosition(event))
  }

  end (event) {
    this.interaction.end(buildPosition(event))
  }
}
