/**
 * Interaction to show a tooltip with information about the gate
 */
export default class TooltipInteraction {
  constructor (context, $tooltip) {
    this.context = context
    this.$tooltip = $tooltip
  }

  start (position) {}

  move (position) {
    const intersected = this.context.intersectedGate(position)
    if (intersected) {
      this.$tooltip.show(intersected.label, position)
      return
    }

    this.$tooltip.hide()
  }

  end (position) {}
}
