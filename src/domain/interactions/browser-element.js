/**
 * This class works as an interface for domain classes to abstract browser elements, such as tooltips
 */
export default class BrowserElement {
  constructor (id) {
    this.$element = document.getElementById(id)
  }

  show (html, position) {
    throw new Error('Not implemented, you must extend this class')
  }

  hide () {
    throw new Error('Not implemented, you must extend this class')
  }
}
