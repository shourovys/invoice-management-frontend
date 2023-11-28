import { lazy } from 'react'
import { IRouteProperty } from '../../types/routes'
import {
  ackIcon,
  dashboardIcon,
  favoriteIcon,
  floorDashboardIcon,
  floorIcon,
  liveIcon,
  playbackIcon,
  viewIcon,
} from '../../utils/icons'
import t from '../../utils/translator'
import PERMISSIONS from '../permissions'

const Home = lazy(() => import('../../pages'))
const FavoriteEdit = lazy(() => import('../../pages/favorite'))
const ACK = lazy(() => import('../../pages/ack'))
const Playback = lazy(() => import('../../pages/playback'))
const FloorDashboard = lazy(() => import('../../pages/dashboard'))
const LivePage = lazy(() => import('../../pages/live'))
const LogInfo = lazy(() => import('../../pages/log/info/[id]'))
const Floor = lazy(() => import('../../pages/floor'))
const CreateFloor = lazy(() => import('../../pages/floor/add'))
const EditFloor = lazy(() => import('../../pages/floor/edit/[id]'))
const FloorInfo = lazy(() => import('../../pages/floor/info/[id]'))
const EditFloorInfo = lazy(() => import('../../pages/floor/info/edit/[id]'))
const View = lazy(() => import('../../pages/view'))
const CreateView = lazy(() => import('../../pages/view/add'))
const EditView = lazy(() => import('../../pages/view/edit/[id]'))
const ViewInfo = lazy(() => import('../../pages/view/info/[id]'))

const homeRouteProperty: IRouteProperty = {
  // Dashboard
  dashboard: {
    id: '1',
    label: t`Information`,
    path: () => '/',
    routePath: '/',
    icon: dashboardIcon,
    component: Home,
    permissions: PERMISSIONS.dashboard,
  },

  // Floor Dashboard
  floorDashboard: {
    id: '2',
    label: t`Dashboard`,
    path: () => '/dashboard',
    routePath: '/dashboard',
    icon: floorDashboardIcon,
    component: FloorDashboard,
    permissions: PERMISSIONS.floorDashboard,
  },
  logInfo: {
    path: (id?: number | string, Reference?: number | string) =>
      `/log/info/${id}?Reference=${Reference}`,
    routePath: '/log/info/:id',
    component: LogInfo,
    permissions: PERMISSIONS.floorDashboard,
  },

  // ACK
  ack: {
    id: '55',
    label: t`ACK`,
    path: () => '/ack',
    routePath: '/ack',
    icon: ackIcon,
    component: ACK,
    permissions: PERMISSIONS.ack,
  },

  // Live
  live: {
    id: '3',
    label: t`Live`,
    path: () => '/live',
    routePath: '/live',
    icon: liveIcon,
    component: LivePage,
    permissions: PERMISSIONS.live,
  },

  // Playback
  playback: {
    id: '4',
    label: t`Playback`,
    path: () => '/playback',
    routePath: '/playback',
    icon: playbackIcon,
    component: Playback,
    permissions: PERMISSIONS.playback,
  },

  favorite: {
    id: '', // No ID available for this URL
    label: '',
    path: () => '/favorite',
    routePath: '/favorite',
    icon: favoriteIcon,
    component: FavoriteEdit,
    permissions: PERMISSIONS.favorite,
  },

  // floor
  floor: {
    id: '38',
    label: t`Floor`,
    path: () => '/floor',
    routePath: '/floor',
    icon: floorIcon,
    component: Floor,
    permissions: PERMISSIONS.floor,
  },
  floorCreate: {
    path: () => '/floor/add',
    routePath: '/floor/add',
    component: CreateFloor,
    permissions: PERMISSIONS.floor,
  },
  floorEdit: {
    path: (id?: number | string) => `/floor/edit/${id}`,
    routePath: '/floor/edit/:id',
    component: EditFloor,
    permissions: PERMISSIONS.floor,
  },
  floorInfo: {
    path: (id?: number | string) => `/floor/info/${id}`,
    routePath: '/floor/info/:id',
    component: FloorInfo,
    permissions: PERMISSIONS.floor,
  },
  floorInfoEdit: {
    path: (id?: number | string) => `/floor/info/edit/${id}`,
    routePath: '/floor/info/edit/:id',
    component: EditFloorInfo,
    permissions: PERMISSIONS.floor,
  },
  // floorView: {
  //     path: (id?: number | string) => `/floor/view/${id}`,
  //     routePath: "/floor/view/:id",
  //     component: ViewFloor,
  //     permissions: PERMISSIONS.floor,
  // },

  // view
  view: {
    id: '39',
    label: t`View`,
    path: () => '/view',
    routePath: '/view',
    icon: viewIcon,
    component: View,
    permissions: PERMISSIONS.view,
  },
  viewCreate: {
    path: () => '/view/add',
    routePath: '/view/add',
    component: CreateView,
    permissions: PERMISSIONS.view,
  },
  viewEdit: {
    path: (id?: number | string) => `/view/edit/${id}`,
    routePath: '/view/edit/:id',
    component: EditView,
    permissions: PERMISSIONS.view,
  },
  viewInfo: {
    path: (id?: number | string) => `/view/info/${id}`,
    routePath: '/view/info/:id',
    component: ViewInfo,
    permissions: PERMISSIONS.view,
  },
}

export default homeRouteProperty
