import GateModel from '../model/gate-model'
import { Vector3 } from 'three'

const bedroomGate = new GateModel({
  id: 'from-entrance-to-bedroom',
  label: 'Habitación',
  position: new Vector3(175, 0, -300)
})

export { bedroomGate }
