import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import {
  archiveIcon,
  archiveScheduleIcon,
  backupIcon,
  backupScheduleIcon,
  databaseIcon,
  defaultIcon,
  getBackIcon,
  miscellaneousIcon,
  rebootIcon,
  restoreIcon,
  updateIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

const ArchiveInfo = lazy(() => import('../../pages/archive'))
const ArchiveSchedule = lazy(() => import('../../pages/archive-schedule'))
const CreateArchiveSchedule = lazy(() => import('../../pages/archive-schedule/add'))
const EditArchiveSchedule = lazy(() => import('../../pages/archive-schedule/edit/[id]'))
const ArchiveScheduleInfo = lazy(() => import('../../pages/archive-schedule/info/[id]'))
const BackupInfo = lazy(() => import('../../pages/backup'))
const BackupSchedule = lazy(() => import('../../pages/backup-schedule'))
const CreateBackupSchedule = lazy(() => import('../../pages/backup-schedule/add'))
const EditBackupSchedule = lazy(() => import('../../pages/backup-schedule/edit/[id]'))
const BackupScheduleInfo = lazy(() => import('../../pages/backup-schedule/info/[id]'))
const Database = lazy(() => import('../../pages/database'))
const Default = lazy(() => import('../../pages/default'))
const GetBackInfo = lazy(() => import('../../pages/get-back'))
const EditMiscellaneous = lazy(() => import('../../pages/miscellaneous/edit'))
const MiscellaneousInfo = lazy(() => import('../../pages/miscellaneous/info'))
const Reboot = lazy(() => import('../../pages/reboot'))
const RestoreInfo = lazy(() => import('../../pages/restore'))
const UpdateInfo = lazy(() => import('../../pages/update'))

const maintenanceRouteProperty: IRouteProperty = {
  // Update
  update: {
    id: '40',
    label: t`Update`,
    path: () => '/update',
    routePath: '/update',
    icon: updateIcon,
    component: UpdateInfo,
    permissions: PERMISSIONS.update,
  },

  // Backup
  backup: {
    id: '41',
    label: t`Backup`,
    path: () => '/backup',
    routePath: '/backup',
    icon: backupIcon,
    component: BackupInfo,
    permissions: PERMISSIONS.backup,
  },

  // Backup Schedule
  backupSchedule: {
    id: '42',
    label: t`Backup Schedule`,
    path: () => '/backup-schedule',
    routePath: '/backup-schedule',
    icon: backupScheduleIcon,
    component: BackupSchedule,
    permissions: PERMISSIONS.backupSchedule,
  },
  backupScheduleCreate: {
    path: () => '/backup-schedule/add',
    routePath: '/backup-schedule/add',
    component: CreateBackupSchedule,
    permissions: PERMISSIONS.backupSchedule,
  },
  backupScheduleEdit: {
    path: (id?: number | string) => `/backup-schedule/edit/${id}`,
    routePath: '/backup-schedule/edit/:id',
    component: EditBackupSchedule,
    permissions: PERMISSIONS.backupSchedule,
  },
  backupScheduleInfo: {
    path: (id?: number | string) => `/backup-schedule/info/${id}`,
    routePath: '/backup-schedule/info/:id',
    component: BackupScheduleInfo,
    permissions: PERMISSIONS.backupSchedule,
  },

  // Restore
  restore: {
    id: '43',
    label: t`Restore`,
    path: () => '/restore',
    routePath: '/restore',
    icon: restoreIcon,
    component: RestoreInfo,
    permissions: PERMISSIONS.restore,
  },

  // Archive
  archive: {
    id: '44',
    label: t`Archive`,
    path: () => '/archive',
    routePath: '/archive',
    icon: archiveIcon,
    component: ArchiveInfo,
    permissions: PERMISSIONS.archive,
  },

  // Archive Schedule
  archiveSchedule: {
    id: '45',
    label: t`Archive Schedule`,
    path: () => '/archive-schedule',
    routePath: '/archive-schedule',
    icon: archiveScheduleIcon,
    component: ArchiveSchedule,
    permissions: PERMISSIONS.archiveSchedule,
  },
  archiveScheduleCreate: {
    path: () => '/archive-schedule/add',
    routePath: '/archive-schedule/add',
    component: CreateArchiveSchedule,
    permissions: PERMISSIONS.archiveSchedule,
  },
  archiveScheduleEdit: {
    path: (id?: number | string) => `/archive-schedule/edit/${id}`,
    routePath: '/archive-schedule/edit/:id',
    component: EditArchiveSchedule,
    permissions: PERMISSIONS.archiveSchedule,
  },
  archiveScheduleInfo: {
    path: (id?: number | string) => `/archive-schedule/info/${id}`,
    routePath: '/archive-schedule/info/:id',
    component: ArchiveScheduleInfo,
    permissions: PERMISSIONS.archiveSchedule,
  },

  // Getback
  getBack: {
    id: '46',
    label: t`Get back`,
    path: () => '/get-back',
    routePath: '/get-back',
    icon: getBackIcon,
    component: GetBackInfo,
    permissions: PERMISSIONS.getBack,
  },

  // Default
  default: {
    id: '47',
    label: t`Default`,
    path: () => '/default',
    routePath: '/default',
    icon: defaultIcon,
    permissions: PERMISSIONS.default,
    component: Default,
  },

  // Database
  database: {
    id: '62',
    label: t`Database`,
    path: () => '/database',
    routePath: '/database',
    icon: databaseIcon,
    permissions: PERMISSIONS.database,
    component: Database,
  },

  // Reboot
  reboot: {
    id: '48',
    label: t`Reboot`,
    path: () => '/reboot',
    routePath: '/reboot',
    icon: rebootIcon,
    permissions: PERMISSIONS.reboot,
    component: Reboot,
  },

  // Miscellaneous
  miscellaneousEdit: {
    path: () => '/miscellaneous/edit',
    routePath: '/miscellaneous/edit',
    permissions: PERMISSIONS.miscellaneous,
    component: EditMiscellaneous,
  },
  miscellaneousInfo: {
    id: '49',
    label: t`Miscellaneous`,
    icon: miscellaneousIcon,
    path: () => '/miscellaneous/info',
    routePath: '/miscellaneous/info',
    permissions: PERMISSIONS.miscellaneous,
    component: MiscellaneousInfo,
  },
}

export default maintenanceRouteProperty
