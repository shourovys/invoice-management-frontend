import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import { partitionIcon, userIcon, userRoleIcon } from '../../utils/icons'
import t from '../../utils/translator'

const Partition = lazy(() => import('../../pages/partition'))
const CreatePartition = lazy(() => import('../../pages/partition/add'))
const EditPartition = lazy(() => import('../../pages/partition/edit/[id]'))
const PartitionInfo = lazy(() => import('../../pages/partition/info/[id]'))
const User = lazy(() => import('../../pages/user'))
const UserRole = lazy(() => import('../../pages/user-role'))
const CreateUserRole = lazy(() => import('../../pages/user-role/add'))
const EditUserRole = lazy(() => import('../../pages/user-role/edit/[id]'))
const UserRoleInfo = lazy(() => import('../../pages/user-role/info/[id]'))
const CreateUser = lazy(() => import('../../pages/user/add'))
const EditUser = lazy(() => import('../../pages/user/edit/[id]'))
const UserInfo = lazy(() => import('../../pages/user/info/[id]'))

const userRouteProperty: IRouteProperty = {
  // Partition
  partition: {
    id: '7', // ID of "Partition"
    label: t`Partition`,
    path: () => '/partition',
    routePath: '/partition',
    icon: partitionIcon,
    component: Partition,
    permissions: PERMISSIONS.partition,
  },
  partitionCreate: {
    path: () => '/partition/add',
    routePath: '/partition/add',
    component: CreatePartition,
    permissions: PERMISSIONS.partition,
  },
  partitionEdit: {
    path: (id?: number | string) => `/partition/edit/${id}`,
    routePath: '/partition/edit/:id',
    component: EditPartition,
    permissions: PERMISSIONS.partition,
  },
  partitionInfo: {
    path: (id?: number | string) => `/partition/info/${id}`,
    routePath: '/partition/info/:id',
    component: PartitionInfo,
    permissions: PERMISSIONS.partition,
  },

  // User Role
  userRole: {
    id: '9', // ID of "User Role"
    label: t`User Role`,
    path: () => '/user-role',
    routePath: '/user-role',
    icon: userRoleIcon,
    component: UserRole,
    permissions: PERMISSIONS.userRole,
  },
  userRoleCreate: {
    path: () => '/user-role/add',
    routePath: '/user-role/add',
    component: CreateUserRole,
    permissions: PERMISSIONS.userRole,
  },
  userRoleEdit: {
    path: (id?: number | string) => `/user-role/edit/${id}`,
    routePath: '/user-role/edit/:id',
    component: EditUserRole,
    permissions: PERMISSIONS.userRole,
  },
  userRoleInfo: {
    path: (id?: number | string) => `/user-role/info/${id}`,
    routePath: '/user-role/info/:id',
    component: UserRoleInfo,
    permissions: PERMISSIONS.userRole,
  },

  // User
  user: {
    id: '8', // ID of "User"
    label: t`User`,
    path: () => '/user',
    routePath: '/user',
    icon: userIcon,
    component: User,
    permissions: PERMISSIONS.user,
  },
  userCreate: {
    path: () => '/user/add',
    routePath: '/user/add',
    component: CreateUser,
    permissions: PERMISSIONS.user,
  },
  userEdit: {
    path: (id?: number | string) => `/user/edit/${id}`,
    routePath: '/user/edit/:id',
    component: EditUser,
    permissions: PERMISSIONS.user,
  },
  userInfo: {
    path: (id?: number | string) => `/user/info/${id}`,
    routePath: '/user/info/:id',
    component: UserInfo,
    permissions: PERMISSIONS.user,
  },
}

export default userRouteProperty
