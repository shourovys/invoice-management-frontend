import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  deviceIcon,
  externalIcon,
  favoriteIcon,
  maintenanceIcon,
  monitorIcon,
  personIcon,
  reportIcon,
  serviceIcon,
  systemIcon,
  userIcon,
  workIcon,
} from './icons'

const menuIcons: { [key: string]: IconDefinition } = {
  favorite: favoriteIcon,
  monitor: monitorIcon,
  report: reportIcon,
  user: userIcon,
  person: personIcon,
  device: deviceIcon,
  external: externalIcon,
  work: workIcon,
  service: serviceIcon,
  maintenance: maintenanceIcon,
  system: systemIcon,
}
export default menuIcons
