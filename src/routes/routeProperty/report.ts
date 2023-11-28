import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import { accessReportIcon, ackReportIcon, logReportIcon } from '../../utils/icons'
import t from '../../utils/translator'

const AccessReport = lazy(() => import('../../pages/access-report'))
const AckReport = lazy(() => import('../../pages/ack-report'))
const LogReport = lazy(() => import('../../pages/log-report'))

const reportRouteProperty: IRouteProperty = {
  logReport: {
    id: '5', // ID of "Log Report" in the data
    label: t`Log Report`,
    path: () => '/log-report',
    routePath: '/log-report',
    icon: logReportIcon,
    component: LogReport,
    permissions: PERMISSIONS.logReport,
  },

  accessReport: {
    id: '6', // ID of "Access Report" in the data
    label: t`Access Report`,
    path: () => '/access-report',
    routePath: '/access-report',
    icon: accessReportIcon,
    component: AccessReport,
    permissions: PERMISSIONS.accessReport,
  },

  ackReport: {
    id: '56', // ID of "ACK Report" in the data
    label: t`ACK Report`,
    path: () => '/ack-report',
    routePath: '/ack-report',
    icon: ackReportIcon,
    component: AckReport,
    permissions: PERMISSIONS.ackReport,
  },

  // smartReport: {
  //   id: "57", // ID of "Smart Report" in the data
  //   label: "Smart Report",
  //   path: () => "/smart-report",
  //   routePath: "/smart-report",
  //   icon: smartReportIcon,
  //   component: SmartReport,
  //   permissions: PERMISSIONS.smartReport,
  // },
}

export default reportRouteProperty
