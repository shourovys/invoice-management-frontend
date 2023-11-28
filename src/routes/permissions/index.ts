import authPermissions from './auth'
import devicePermissions from './device'
import externalPermissions from './external'
import maintenancePermissions from './maintenance'
import monitorPermissions from './monitor'
import personPermissions from './person'
import reportPermissions from './report'
import servicePermissions from './service'
import systemPermissions from './system'
import userPermissions from './user'
import workPermissions from './work'

const PERMISSIONS = {
  ...monitorPermissions, // dashboard, floor, ack, live, playback, floor, view,
  ...reportPermissions, // logReport, accessReport, ackReport, smartReportF
  ...userPermissions, // partition, user, userRole
  ...personPermissions, // person, definedField, credential, format, access
  ...devicePermissions, // node, nodeScan, door, doorRule, region, input, output, elevator, relay, trigger, threat
  ...externalPermissions, // camera, nvr, channel, gateway, lockset, facegate, serial, subnode,
  ...workPermissions, // task, eventAction, eventCode, schedule, holiday, group,
  ...servicePermissions, // email, ftp, restAPI, logAPI, gemini, sip
  ...maintenancePermissions, // update, backup, backupSchedule, restore, archive, archiveSchedule, getBack, default, database, reboot, miscellaneous,
  ...systemPermissions, // license, system, network, time
  ...authPermissions, // profile
}
export default PERMISSIONS
