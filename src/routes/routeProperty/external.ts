import { lazy } from 'react'
import { IRouteProperty } from '../../types/routes'
import {
  cameraIcon,
  channelIcon,
  contGateIcon,
  contLockIcon,
  facegateIcon,
  gatewayIcon,
  intercomIcon,
  locksetIcon,
  nvrIcon,
  readerIcon,
  subnodeIcon,
} from '../../utils/icons'
import t from '../../utils/translator'
import PERMISSIONS from '../permissions'

const Camera = lazy(() => import('../../pages/camera'))
const CreateCamera = lazy(() => import('../../pages/camera/add'))
const EditCamera = lazy(() => import('../../pages/camera/edit/[id]'))
const CameraInfo = lazy(() => import('../../pages/camera/info/[id]'))
const Channel = lazy(() => import('../../pages/channel'))
const CreateChannel = lazy(() => import('../../pages/channel/add'))
const EditChannel = lazy(() => import('../../pages/channel/edit/[id]'))
const ChannelInfo = lazy(() => import('../../pages/channel/info/[id]'))

const Door = lazy(() => import('../../pages/door'))
// const CreateDoor = lazy(() => import('../../pages/door/add'))
const EditDoor = lazy(() => import('../../pages/door/edit/[id]'))
const DoorGroupEdit = lazy(() => import('../../pages/door/group-edit'))
const DoorInfo = lazy(() => import('../../pages/door/info/[id]'))

const DoorRule = lazy(() => import('../../pages/door-rule'))
const CreateDoorRule = lazy(() => import('../../pages/door-rule/add'))
const EditDoorRule = lazy(() => import('../../pages/door-rule/edit/[id]'))
const DoorRuleInfo = lazy(() => import('../../pages/door-rule/info/[id]'))

const Elevator = lazy(() => import('../../pages/elevator'))
// const CreateElevator = lazy(() => import('../../pages/elevator/add'))
const EditElevator = lazy(() => import('../../pages/elevator/edit/[id]'))
const ElevatorGroupEdit = lazy(() => import('../../pages/elevator/group-edit'))
const ElevatorInfo = lazy(() => import('../../pages/elevator/info/[id]'))

const Facegate = lazy(() => import('../../pages/facegate'))
const CreateFacegate = lazy(() => import('../../pages/facegate/add'))
const EditFacegate = lazy(() => import('../../pages/facegate/edit/[id]'))
const FacegateInfo = lazy(() => import('../../pages/facegate/info/[id]'))

const Gateway = lazy(() => import('../../pages/gateway'))
const CreateGateway = lazy(() => import('../../pages/gateway/add'))
const EditGateway = lazy(() => import('../../pages/gateway/edit/[id]'))
const GatewayInfo = lazy(() => import('../../pages/gateway/info/[id]'))

const Input = lazy(() => import('../../pages/input'))
// const CreateInput = lazy(() => import('../../pages/input/add'));
const EditInput = lazy(() => import('../../pages/input/edit/[id]'))
const InputGroupEdit = lazy(() => import('../../pages/input/group-edit'))
const InputInfo = lazy(() => import('../../pages/input/info/[id]'))

const Lockset = lazy(() => import('../../pages/lockset'))
const CreateLockset = lazy(() => import('../../pages/lockset/add'))
const EditLockset = lazy(() => import('../../pages/lockset/edit/[id]'))
const LocksetInfo = lazy(() => import('../../pages/lockset/info/[id]'))
const Node = lazy(() => import('../../pages/node'))
const NodeScan = lazy(() => import('../../pages/node-scan'))
const CreateNodeScan = lazy(() => import('../../pages/node-scan/add'))
const CreateNode = lazy(() => import('../../pages/node/add'))
const EditNode = lazy(() => import('../../pages/node/edit/[id]'))
const NodeInfo = lazy(() => import('../../pages/node/info/[id]'))
const NVR = lazy(() => import('../../pages/nvr'))
const CreateNvr = lazy(() => import('../../pages/nvr/add'))
const EditNvr = lazy(() => import('../../pages/nvr/edit/[id]'))
const NvrInfo = lazy(() => import('../../pages/nvr/info/[id]'))

const Output = lazy(() => import('../../pages/output'))
// const CreateOutput = lazy(() => import('../../pages/output/add'))
const EditOutput = lazy(() => import('../../pages/output/edit/[id]'))
const OutputGroupEdit = lazy(() => import('../../pages/output/group-edit'))
const OutputInfo = lazy(() => import('../../pages/output/info/[id]'))

const Region = lazy(() => import('../../pages/region'))
const CreateRegion = lazy(() => import('../../pages/region/add'))
const EditRegion = lazy(() => import('../../pages/region/edit/[id]'))
const RegionInfo = lazy(() => import('../../pages/region/info/[id]'))

const Relay = lazy(() => import('../../pages/relay'))
// const CreateRelay = lazy(() => import('../../pages/relay/add'))
const EditRelay = lazy(() => import('../../pages/relay/edit/[id]'))
const RelayGroupEdit = lazy(() => import('../../pages/relay/group-edit'))
const RelayInfo = lazy(() => import('../../pages/relay/info/[id]'))

// const Serial = lazy(() => import('../../pages/serial'));
// const CreateSerial = lazy(() => import('../../pages/serial/add'));
// const EditSerial = lazy(() => import('../../pages/serial/edit/[id]'));
// const SerialInfo = lazy(() => import('../../pages/serial/info/[id]'));
const Subnode = lazy(() => import('../../pages/subnode'))
const CreateSubnode = lazy(() => import('../../pages/subnode/add'))
const EditSubnode = lazy(() => import('../../pages/subnode/edit/[id]'))
const SubnodeInfo = lazy(() => import('../../pages/subnode/info/[id]'))

const Reader = lazy(() => import('../../pages/reader'))
// const CreateReader = lazy(() => import('../../pages/reader/add'))
const EditReader = lazy(() => import('../../pages/reader/edit/[id]'))
const ReaderInfo = lazy(() => import('../../pages/reader/info/[id]'))

const ContGate = lazy(() => import('../../pages/contgate'))
const CreateContGate = lazy(() => import('../../pages/contgate/add'))
const EditContGate = lazy(() => import('../../pages/contgate/edit/[id]'))
const ContGateInfo = lazy(() => import('../../pages/contgate/info/[id]'))

const ContLock = lazy(() => import('../../pages/contlock'))
const CreateContLock = lazy(() => import('../../pages/contlock/add'))
const EditContLock = lazy(() => import('../../pages/contlock/edit/[id]'))
const ContLockInfo = lazy(() => import('../../pages/contlock/info/[id]'))

const Intercom = lazy(() => import('../../pages/intercom'))
const CreateIntercom = lazy(() => import('../../pages/intercom/add'))
const EditIntercom = lazy(() => import('../../pages/intercom/edit/[id]'))
const IntercomInfo = lazy(() => import('../../pages/intercom/info/[id]'))

const Trigger = lazy(() => import('../../pages/trigger'))
const CreateTrigger = lazy(() => import('../../pages/trigger/add'))
const EditTrigger = lazy(() => import('../../pages/trigger/edit/[id]'))
const TriggerInfo = lazy(() => import('../../pages/trigger/info/[id]'))

const Threat = lazy(() => import('../../pages/threat'))
const CreateThreat = lazy(() => import('../../pages/threat/add'))
const EditThreat = lazy(() => import('../../pages/threat/edit/[id]'))
const ThreatInfo = lazy(() => import('../../pages/threat/info/[id]'))

const externalRouteProperty: IRouteProperty = {
  // Camera
  camera: {
    id: '22',
    label: t`Camera`,
    path: () => '/camera',
    routePath: '/camera',
    icon: cameraIcon,
    component: Camera,
    permissions: PERMISSIONS.camera,
  },
  cameraCreate: {
    path: () => '/camera/add',
    routePath: '/camera/add',
    component: CreateCamera,
    permissions: PERMISSIONS.camera,
  },
  cameraEdit: {
    path: (id?: number | string) => `/camera/edit/${id}`,
    routePath: '/camera/edit/:id',
    component: EditCamera,
    permissions: PERMISSIONS.camera,
  },
  cameraInfo: {
    path: (id?: number | string) => `/camera/info/${id}`,
    routePath: '/camera/info/:id',
    component: CameraInfo,
    permissions: PERMISSIONS.camera,
  },
  // NVR
  nvr: {
    id: '23',
    label: t`NVR`,
    path: () => '/nvr',
    routePath: '/nvr',
    icon: nvrIcon,
    component: NVR,
    permissions: PERMISSIONS.nvr,
  },
  nvrCreate: {
    path: () => '/nvr/add',
    routePath: '/nvr/add',
    component: CreateNvr,
    permissions: PERMISSIONS.nvr,
  },
  nvrEdit: {
    path: (id?: number | string) => `/nvr/edit/${id}`,
    routePath: '/nvr/edit/:id',
    component: EditNvr,
    permissions: PERMISSIONS.nvr,
  },
  nvrInfo: {
    path: (id?: number | string) => `/nvr/info/${id}`,
    routePath: '/nvr/info/:id',
    component: NvrInfo,
    permissions: PERMISSIONS.nvr,
  },

  // Channel
  channel: {
    id: '24',
    label: t`Channel`,
    path: () => '/channel',
    routePath: '/channel',
    icon: channelIcon,
    component: Channel,
    permissions: PERMISSIONS.channel,
  },
  channelCreate: {
    path: () => '/channel/add',
    routePath: '/channel/add',
    component: CreateChannel,
    permissions: PERMISSIONS.channel,
  },
  channelEdit: {
    path: (id?: number | string) => `/channel/edit/${id}`,
    routePath: '/channel/edit/:id',
    component: EditChannel,
    permissions: PERMISSIONS.channel,
  },
  channelInfo: {
    path: (id?: number | string) => `/channel/info/${id}`,
    routePath: '/channel/info/:id',
    component: ChannelInfo,
    permissions: PERMISSIONS.channel,
  },

  // Gateway
  gateway: {
    id: '25',
    label: t`Gateway`,
    path: () => '/gateway',
    routePath: '/gateway',
    icon: gatewayIcon,
    component: Gateway,
    permissions: PERMISSIONS.gateway,
  },
  gatewayCreate: {
    path: () => '/gateway/add',
    routePath: '/gateway/add',
    component: CreateGateway,
    permissions: PERMISSIONS.gateway,
  },
  gatewayEdit: {
    path: (id?: number | string) => `/gateway/edit/${id}`,
    routePath: '/gateway/edit/:id',
    component: EditGateway,
    permissions: PERMISSIONS.gateway,
  },
  gatewayInfo: {
    path: (id?: number | string) => `/gateway/info/${id}`,
    routePath: '/gateway/info/:id',
    component: GatewayInfo,
    permissions: PERMISSIONS.gateway,
  },

  // Lockset
  lockset: {
    id: '26',
    label: t`Lockset`,
    path: () => '/lockset',
    routePath: '/lockset',
    icon: locksetIcon,
    component: Lockset,
    permissions: PERMISSIONS.lockset,
  },
  locksetCreate: {
    path: () => '/lockset/add',
    routePath: '/lockset/add',
    component: CreateLockset,
    permissions: PERMISSIONS.lockset,
  },
  locksetEdit: {
    path: (id?: number | string) => `/lockset/edit/${id}`,
    routePath: '/lockset/edit/:id',
    component: EditLockset,
    permissions: PERMISSIONS.lockset,
  },
  locksetInfo: {
    path: (id?: number | string) => `/lockset/info/${id}`,
    routePath: '/lockset/info/:id',
    component: LocksetInfo,
    permissions: PERMISSIONS.lockset,
  },

  // Facegate
  facegate: {
    id: '60',
    label: t`Facegate`,
    path: () => '/facegate',
    routePath: '/facegate',
    icon: facegateIcon,
    component: Facegate,
    permissions: PERMISSIONS.facegate,
  },
  facegateCreate: {
    path: () => '/facegate/add',
    routePath: '/facegate/add',
    component: CreateFacegate,
    permissions: PERMISSIONS.facegate,
  },
  facegateEdit: {
    path: (id?: number | string) => `/facegate/edit/${id}`,
    routePath: '/facegate/edit/:id',
    component: EditFacegate,
    permissions: PERMISSIONS.facegate,
  },
  facegateInfo: {
    path: (id?: number | string) => `/facegate/info/${id}`,
    routePath: '/facegate/info/:id',
    component: FacegateInfo,
    permissions: PERMISSIONS.facegate,
  },

  // Serial
  // serial: {
  //  id:''
  //   label: t('Serial',
  //   path: () => '/serial',
  //   routePath: '/serial',
  //   icon: serialIcon,
  //   component: Serial,
  //   permissions: PERMISSIONS.serial,
  // },
  // serialCreate: {
  //   path: () => '/serial/add',
  //   routePath: '/serial/add',
  //   component: CreateSerial,
  //   permissions: PERMISSIONS.serial,
  // },
  // serialEdit: {
  //   path: (id?: number | string) => `/serial/edit/${id}`,
  //   routePath: '/serial/edit/:id',
  //   component: EditSerial,
  //   permissions: PERMISSIONS.serial,
  // },
  // serialInfo: {
  //   path: (id?: number | string) => `/serial/info/${id}`,
  //   routePath: '/serial/info/:id',
  //   component: SerialInfo,
  //   permissions: PERMISSIONS.serial,
  // },

  // Subnode
  subnode: {
    id: '63',
    label: t`Subnode`,
    path: () => '/subnode',
    routePath: '/subnode',
    icon: subnodeIcon,
    component: Subnode,
    permissions: PERMISSIONS.subnode,
  },
  subnodeCreate: {
    path: () => '/subnode/add',
    routePath: '/subnode/add',
    component: CreateSubnode,
    permissions: PERMISSIONS.subnode,
  },
  subnodeEdit: {
    path: (id?: number | string) => `/subnode/edit/${id}`,
    routePath: '/subnode/edit/:id',
    component: EditSubnode,
    permissions: PERMISSIONS.subnode,
  },
  subnodeInfo: {
    path: (id?: number | string) => `/subnode/info/${id}`,
    routePath: '/subnode/info/:id',
    component: SubnodeInfo,
    permissions: PERMISSIONS.subnode,
  },

  // Reader
  reader: {
    id: '64',
    label: t`Reader`,
    path: () => '/reader',
    routePath: '/reader',
    icon: readerIcon,
    component: Reader,
    permissions: PERMISSIONS.reader,
  },
  // readerCreate: {
  //   path: () => '/reader/add',
  //   routePath: '/reader/add',
  //   component: CreateReader,
  //   permissions: PERMISSIONS.reader,
  // },
  readerEdit: {
    path: (id?: number | string) => `/reader/edit/${id}`,
    routePath: '/reader/edit/:id',
    component: EditReader,
    permissions: PERMISSIONS.reader,
  },
  readerInfo: {
    path: (id?: number | string) => `/reader/info/${id}`,
    routePath: '/reader/info/:id',
    component: ReaderInfo,
    permissions: PERMISSIONS.reader,
  },

  // ContGate
  contGate: {
    id: '65',
    label: t`ContGate`,
    path: () => '/contgate',
    routePath: '/contgate',
    icon: contGateIcon,
    component: ContGate,
    permissions: PERMISSIONS.contgate,
  },
  contGateCreate: {
    path: () => '/contgate/add',
    routePath: '/contgate/add',
    component: CreateContGate,
    permissions: PERMISSIONS.contgate,
  },
  contGateEdit: {
    path: (id?: number | string) => `/contgate/edit/${id}`,
    routePath: '/contgate/edit/:id',
    component: EditContGate,
    permissions: PERMISSIONS.contgate,
  },
  contGateInfo: {
    path: (id?: number | string) => `/contgate/info/${id}`,
    routePath: '/contgate/info/:id',
    component: ContGateInfo,
    permissions: PERMISSIONS.contgate,
  },

  // ContLock
  contLock: {
    id: '66',
    label: t`ContLock`,
    path: () => '/contlock',
    routePath: '/contlock',
    icon: contLockIcon,
    component: ContLock,
    permissions: PERMISSIONS.contlock,
  },
  contLockCreate: {
    path: () => '/contlock/add',
    routePath: '/contlock/add',
    component: CreateContLock,
    permissions: PERMISSIONS.contlock,
  },
  contLockEdit: {
    path: (id?: number | string) => `/contlock/edit/${id}`,
    routePath: '/contlock/edit/:id',
    component: EditContLock,
    permissions: PERMISSIONS.contlock,
  },
  contLockInfo: {
    path: (id?: number | string) => `/contlock/info/${id}`,
    routePath: '/contlock/info/:id',
    component: ContLockInfo,
    permissions: PERMISSIONS.contlock,
  },

  // Intercom
  intercom: {
    id: '69',
    label: t`Intercom`,
    path: () => '/intercom',
    routePath: '/intercom',
    icon: intercomIcon,
    component: Intercom,
    permissions: PERMISSIONS.intercom,
  },
  intercomCreate: {
    path: () => '/intercom/add',
    routePath: '/intercom/add',
    component: CreateIntercom,
    permissions: PERMISSIONS.intercom,
  },
  intercomEdit: {
    path: (id?: number | string) => `/intercom/edit/${id}`,
    routePath: '/intercom/edit/:id',
    component: EditIntercom,
    permissions: PERMISSIONS.intercom,
  },
  intercomInfo: {
    path: (id?: number | string) => `/intercom/info/${id}`,
    routePath: '/intercom/info/:id',
    component: IntercomInfo,
    permissions: PERMISSIONS.intercom,
  },
}
export default externalRouteProperty
