import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import { licenseIcon, networkIcon, systemIcon, timeIcon } from '../../utils/icons'
import t from '../../utils/translator'

const CapacityList = lazy(() => import('../../pages/license/capacity'))
const EditLicense = lazy(() => import('../../pages/license/edit'))
const LicenseInfo = lazy(() => import('../../pages/license/info'))
const EditNetwork = lazy(() => import('../../pages/network/edit'))
const NetworkInfo = lazy(() => import('../../pages/network/info'))
const UploadCaCertificate = lazy(() => import('../../pages/network/ca-certificate/upload'))
const EditSystem = lazy(() => import('../../pages/system/edit'))
const SystemInfo = lazy(() => import('../../pages/system/info'))
const EditTime = lazy(() => import('../../pages/time/edit'))
const TimeInfo = lazy(() => import('../../pages/time/info'))

const systemRouteProperty: IRouteProperty = {
  // License
  licenseInfo: {
    id: '50',
    label: t`License`,
    path: () => '/license/info',
    routePath: '/license/info',
    icon: licenseIcon,
    permissions: PERMISSIONS.license,
    component: LicenseInfo,
  },
  licenseEdit: {
    path: () => '/license/edit',
    routePath: '/license/edit',
    permissions: PERMISSIONS.license,
    component: EditLicense,
  },
  licenseCapacity: {
    path: () => '/license/capacity',
    routePath: '/license/capacity',
    permissions: PERMISSIONS.license,
    component: CapacityList,
  },

  // System
  systemInfo: {
    id: '51',
    label: t`System`,
    path: () => '/system/info',
    routePath: '/system/info',
    icon: systemIcon,
    permissions: PERMISSIONS.system,
    component: SystemInfo,
  },
  systemEdit: {
    path: () => '/system/edit',
    routePath: '/system/edit',
    permissions: PERMISSIONS.system,
    component: EditSystem,
  },

  // Network
  networkInfo: {
    id: '52',
    label: t`Network`,
    path: () => '/network/info',
    routePath: '/network/info',
    icon: networkIcon,
    permissions: PERMISSIONS.network,
    component: NetworkInfo,
  },
  networkEdit: {
    path: () => '/network/edit',
    routePath: '/network/edit',
    permissions: PERMISSIONS.network,
    component: EditNetwork,
  },
  networkUploadCaCertificate: {
    path: () => '/network/ca-certificate/upload',
    routePath: '/network/ca-certificate/upload',
    permissions: PERMISSIONS.network,
    component: UploadCaCertificate,
  },

  // Time
  timeInfo: {
    id: '53',
    label: t`Time`,
    path: () => '/time/info',
    icon: timeIcon,
    routePath: '/time/info',
    permissions: PERMISSIONS.time,
    component: TimeInfo,
  },
  timeEdit: {
    path: () => '/time/edit',
    routePath: '/time/edit',
    permissions: PERMISSIONS.time,
    component: EditTime,
  },
}

export default systemRouteProperty
