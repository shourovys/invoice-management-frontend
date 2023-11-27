/* eslint-disable prettier/prettier */
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  deviceIcon,
  homeIcon,
  maintenanceIcon,
  monitoringIcon,
  personIcon,
  reportIcon,
  serviceIcon,
  systemIcon,
  userIcon,
  workIcon,
} from './icons'

const menuIcons: { [key: string]: IconDefinition } = {
  home: homeIcon,
  report: reportIcon,
  user: userIcon,
  person: personIcon,
  device: deviceIcon,
  work: workIcon,
  service: serviceIcon,
  monitoring: monitoringIcon,
  maintenance: maintenanceIcon,
  system: systemIcon,
}
export default menuIcons
