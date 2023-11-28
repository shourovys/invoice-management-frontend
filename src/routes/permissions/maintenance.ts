const maintenancePermissions = {
  update: {
    name: 'Update',
    url: '/update',
  },
  backup: {
    name: 'Backup',
    url: '/backup',
  },
  backupSchedule: {
    name: 'Backup Schedule',
    url: '/backupschedulelist',
  },
  restore: {
    name: 'Restore',
    url: '/restore',
  },
  archive: {
    name: 'Archive',
    url: '/archive',
  },
  archiveSchedule: {
    name: 'Archive Schedule',
    url: '/archiveschedulelist',
  },
  getBack: {
    name: 'Getback',
    url: '/getback',
  },
  default: {
    name: 'Default',
    url: '/default',
  },
  database: {
    name: 'Database',
    url: '/database',
  },
  reboot: {
    name: 'Reboot',
    url: '/reboot',
  },
  miscellaneous: {
    name: 'Miscellaneous',
    url: '/miscellaneousinfo',
  },
}

export default maintenancePermissions
