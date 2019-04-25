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
  // todo This is needed because clientX and clientY need to be extracted, and some properties (like `touches`) need to be checked, but they're not checked everywhere they're used)
  start (event) {}
  move (event) {}
  end (event) {}
}
