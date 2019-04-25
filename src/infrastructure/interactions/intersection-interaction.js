/**
 * Interaction to launch the computation to detect interactions
 */
export default class IntersectionInteraction {
  constructor (context) {
    this.interacting = false
    this.context = context
  }

  start (event) {
    this.interacting = true
  }

  end (event) {
    this.interacting = false
    this.context.detectIntersections(event)
  }
}
