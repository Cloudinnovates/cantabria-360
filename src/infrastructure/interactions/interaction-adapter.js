/**
 * The idea is to adapt a browser event to a data class useful for Interactions so that
 * Interactions can be classes of the model, without external dependencies
 */
export default class InteractionAdapter {
  constructor (interaction, context) {
    this.interaction = interaction
    this.context = context
  }

  // todo Implement the three methods of the interface
  start (event) {}
  move (event) {}
  end (event) {}
}
