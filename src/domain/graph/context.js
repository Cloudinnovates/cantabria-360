/**
 * Provides an interface to be implemented by the infrastructure context.
 * This way, dependencies are inverted, domain classes depend on this
 * domain class, and are isolated from the implementations
 */
export default class Context {
  init (tour) {
    throw new Error('Must be overridden')
  }

  start () {
    throw new Error('Must be overridden')
  }

  resize () {
    throw new Error('Must be overridden')
  }

  zoom (event) {
    throw new Error('Must be overridden')
  }

  update () {
    throw new Error('Must be overridden')
  }

  intersectedGate (position) {
    throw new Error('Must be overridden')
  }

  switchRooms (throughGate) {
    throw new Error('Must be overridden')
  }
}
