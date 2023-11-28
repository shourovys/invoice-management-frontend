// eslint-disable-next-line react/jsx-filename-extension
import {
  IAllRoutesInGroup,
  ILabeledRoute,
  ILabeledRoutes,
  IRoute,
  IRouteProperty,
  IRoutesArrayInGroup,
} from '../types/routes'
import deviceRouteProperty from './routeProperty/device'
import externalRouteProperty from './routeProperty/external'
import maintenanceRouteProperty from './routeProperty/maintenance'
import monitorRouteProperty from './routeProperty/monitor'
import personRouteProperty from './routeProperty/person'
import reportRouteProperty from './routeProperty/report'
import serviceRouteProperty from './routeProperty/service'
import systemRouteProperty from './routeProperty/system'
import userRouteProperty from './routeProperty/user'
import workRouteProperty from './routeProperty/work'

export const allRoutesInGroup: IAllRoutesInGroup = {
  monitor: {
    ...monitorRouteProperty, // dashboard, floor, ack, live, playback, floor, view,
  },
  report: {
    ...reportRouteProperty, // logReport, accessReport, ackReport, smartReport
  },
  user: {
    ...userRouteProperty, // partition, user, userRole
  },
  person: {
    ...personRouteProperty, // person, definedField, credential, format, access
  },
  device: {
    ...deviceRouteProperty, // node, nodeScan, door, doorRule, region, input, output, elevator, relay, trigger, threat
  },
  external: {
    ...externalRouteProperty, // camera, nvr, channel, gateway, lockset, facegate, serial, subnode,
  },
  work: {
    ...workRouteProperty, // task, eventAction, eventCode, schedule, holiday, group,
  },
  service: {
    ...serviceRouteProperty, // email, ftp, restAPI, logAPI, gemini, sip
  },
  maintenance: {
    ...maintenanceRouteProperty, // update, backup, backupSchedule, restore, archive, archiveSchedule, getBack, default, database, reboot, miscellaneous,
  },
  system: {
    ...systemRouteProperty, // license, system, network, time
  },
}

export const routesArrayInGroup: IRoutesArrayInGroup = Object.entries(allRoutesInGroup)
  .map(([groupKey, groupValue]: [string, IRouteProperty]) => {
    const labeledRoute: IRoute[] = Object.values(groupValue).filter((route) => route)
    return [groupKey, labeledRoute] as [string, IRoute[]]
  })
  .reduce((acc: IRoutesArrayInGroup, [groupKey, labeledRoutes]: [string, IRoute[]]) => {
    return { ...acc, [groupKey]: labeledRoutes }
  }, {})

const labeledRoutes: ILabeledRoutes = Object.entries(allRoutesInGroup)
  .map(([key, value]: [string, IRouteProperty]) => {
    const labeledRoute = Object.values(value).filter((obj) => {
      return Object.prototype.hasOwnProperty.call(obj, 'label') && obj.label !== ''
    })
    return [key, labeledRoute] as [string, ILabeledRoute[]]
  })
  .reduce((previousValue: ILabeledRoutes, [key, value]: [string, ILabeledRoute[]]) => {
    return { ...previousValue, [key]: value }
  }, {})
export default labeledRoutes
