import BrowserElement from '../../domain/interactions/browser-element'

const OFFSET = 10

export default class TooltipElement extends BrowserElement {
  show (html, position) {
    document.body.style.cursor = 'pointer'

    this.$element.className = 'active'
    this.$element.innerText = html
    this.$element.style.top = (position.y + OFFSET) + 'px'
    this.$element.style.left = (position.x + OFFSET) + 'px'
  }

  hide () {
    document.body.style.cursor = 'default'

    this.$element.innerText = ''
    this.$element.className = 'inactive'
  }
}
