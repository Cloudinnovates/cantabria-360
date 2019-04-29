const OFFSET = 10

/**
 * Interaction to show a tooltip with information about the gate
 */
export default class TooltipInteraction {
  constructor (context) {
    this.context = context
    this.$tooltip = document.getElementById('tooltip')
  }

  start (position) {}

  move (position) {
    const intersected = this.context.intersectedGate(position)
    if (intersected) {
      this.showTooltip(intersected, position)
      return
    }

    this.hideTooltip()
  }

  end (position) {}

  showTooltip (gate, position) {
    document.body.style.cursor = 'pointer'

    this.$tooltip.className = 'active'
    this.$tooltip.innerText = gate.label
    this.$tooltip.style.top = (position.y + OFFSET) + 'px'
    this.$tooltip.style.left = (position.x + OFFSET) + 'px'
  }

  hideTooltip () {
    document.body.style.cursor = 'default'

    this.$tooltip.innerText = ''
    this.$tooltip.className = 'inactive'
  }
}
