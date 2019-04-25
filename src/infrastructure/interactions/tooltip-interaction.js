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
    this.$tooltip.className = 'active'
    this.$tooltip.innerText = `x: ${event.clientX}, y: ${event.clientY}`
    this.$tooltip.style.top = (event.clientY + 20) + 'px'
    this.$tooltip.style.left = event.clientX + 'px'
  }

  hideTooltip () {
    this.$tooltip.className = 'inactive'
  }
}
