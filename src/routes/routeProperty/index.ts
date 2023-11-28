import { IRoute, IRouteProperty } from '../../types/routes'
import authRouteProperty from './auth'
import deviceRouteProperty from './device'
import externalRouteProperty from './external'
import maintenanceRouteProperty from './maintenance'
import monitorRouteProperty from './monitor'
import personRouteProperty from './person'
import reportRouteProperty from './report'
import serviceRouteProperty from './service'
import systemRouteProperty from './system'
import userRouteProperty from './user'
import workRouteProperty from './work'

const routeProperty: IRouteProperty = {
  ...monitorRouteProperty, // dashboard, floor, ack, live, playback, floor, view,
  ...reportRouteProperty, // logReport, accessReport, ackReport, smartReport
  ...userRouteProperty, // partition, user, userRole
  ...personRouteProperty, // person, definedField, credential, format, access
  ...deviceRouteProperty, // node, nodeScan, door, doorRule, region, input, output, elevator, relay, trigger, threat
  ...externalRouteProperty, // camera, nvr, channel, gateway, lockset, facegate, serial, subnode,
  ...workRouteProperty, // task, eventAction, eventCode, schedule, holiday, group,
  ...serviceRouteProperty, // email, ftp, restAPI, logAPI, gemini, sip
  ...maintenanceRouteProperty, // update, backup, backupSchedule, restore, archive, archiveSchedule, getBack, default, database, reboot, miscellaneous,
  ...systemRouteProperty, // license, system, network, time
  ...authRouteProperty, // login, profile, favorite
}
export default routeProperty

const ReactRoutes: IRoute[] = Object.entries(routeProperty).map(
  ([, value]: [string, IRoute]) => value
)

export { ReactRoutes }

// console.log(ReactRoutes.map((route) => 'http://localhost:3000' + route.path(1, 1)))
