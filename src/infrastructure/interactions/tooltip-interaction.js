const OFFSET = 10

/**
 * Interaction to show a tooltip with information about the gate
 */
export default class TooltipInteraction {
  constructor (context) {
    this.context = context
    this.$tooltip = document.getElementById('tooltip')
  }

  start (event) {}

  move (event) {
    const intersected = this.context.intersectedGate(event)
    if (intersected) {
      this.showTooltip(intersected, event)
      return
    }

    this.hideTooltip()
  }

  end (event) {}

  showTooltip (gate, event) {
    document.body.style.cursor = 'pointer'

    this.$tooltip.className = 'active'
    this.$tooltip.innerText = gate.label
    this.$tooltip.style.top = (event.clientY + OFFSET) + 'px'
    this.$tooltip.style.left = (event.clientX + OFFSET) + 'px'
  }

  hideTooltip () {
    document.body.style.cursor = 'default'

    this.$tooltip.innerText = ''
    this.$tooltip.className = 'inactive'
  }
}
