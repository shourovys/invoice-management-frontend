import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { IFloorDashboardItems, IFloorDashboardValue } from '../types/pages/floorDashboard'
import {
  applyIcon,
  cameraIcon,
  channelIcon,
  contGateIcon,
  contLockIcon,
  doorCloseIcon,
  doorOpenIcon,
  elevatorIcon,
  facegateIcon,
  gatewayIcon,
  inputIcon,
  intercomIcon,
  locksetIcon,
  nvrIcon,
  outputIcon,
  readerIcon,
  regionIcon,
  relayIcon,
  subnodeIcon,
  threatIcon,
  triggerIcon,
} from '../utils/icons'
import { nodeIcon } from './icons'

function getIconByDeviceState(
  type: keyof IFloorDashboardItems,
  device: IFloorDashboardValue
): IconDefinition {
  if (type === 'Node') {
    return nodeIcon
  } else if (type === 'Door' && 'LockStat' in device) {
    if (device.LockStat === 1) {
      return doorOpenIcon
    } else {
      return doorCloseIcon
    }
  } else if (type === 'Region') {
    return regionIcon
  } else if (type === 'Input') {
    return inputIcon
  } else if (type === 'Output') {
    return outputIcon
  } else if (type === 'Elevator') {
    return elevatorIcon
  } else if (type === 'Relay') {
    return relayIcon
  } else if (type === 'Camera') {
    return cameraIcon
  } else if (type === 'Nvr') {
    return nvrIcon
  } else if (type === 'Channel') {
    return channelIcon
  } else if (type === 'Gateway') {
    return gatewayIcon
  } else if (type === 'Lockset') {
    return locksetIcon
  } else if (type === 'Facegate') {
    return facegateIcon
  } else if (type === 'Subnode') {
    return subnodeIcon
  } else if (type === 'Reader') {
    return readerIcon
  } else if (type === 'ContGate') {
    return contGateIcon
  } else if (type === 'ContLock') {
    return contLockIcon
  } else if (type === 'Intercom') {
    return intercomIcon
  } else if (type === 'Trigger') {
    return triggerIcon
  } else if (type === 'Threat') {
    return threatIcon
  }

  // If the type doesn't match any known types, return a default icon
  return applyIcon
}

export default getIconByDeviceState
