import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import {
  doorIcon,
  doorRuleIcon,
  elevatorIcon,
  inputIcon,
  nodeIcon,
  nodeScanIcon,
  outputIcon,
  regionIcon,
  relayIcon,
  threatIcon,
  triggerIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

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

const Intercom = lazy(() => import('../../pages/facegate'))
const CreateIntercom = lazy(() => import('../../pages/facegate/add'))
const EditIntercom = lazy(() => import('../../pages/facegate/edit/[id]'))
const IntercomInfo = lazy(() => import('../../pages/facegate/info/[id]'))

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

const Trigger = lazy(() => import('../../pages/trigger'))
const CreateTrigger = lazy(() => import('../../pages/trigger/add'))
const EditTrigger = lazy(() => import('../../pages/trigger/edit/[id]'))
const TriggerInfo = lazy(() => import('../../pages/trigger/info/[id]'))

const Threat = lazy(() => import('../../pages/threat'))
const CreateThreat = lazy(() => import('../../pages/threat/add'))
const EditThreat = lazy(() => import('../../pages/threat/edit/[id]'))
const ThreatInfo = lazy(() => import('../../pages/threat/info/[id]'))

const deviceRouteProperty: IRouteProperty = {
  // node
  node: {
    id: '15',
    label: t`Node`,
    path: () => '/node',
    routePath: '/node',
    icon: nodeIcon,
    component: Node,
    permissions: PERMISSIONS.node,
  },
  nodeCreate: {
    path: () => '/node/add',
    routePath: '/node/add',
    component: CreateNode,
    permissions: PERMISSIONS.node,
  },
  nodeEdit: {
    path: (id?: number | string) => `/node/edit/${id}`,
    routePath: '/node/edit/:id',
    component: EditNode,
    permissions: PERMISSIONS.node,
  },
  nodeInfo: {
    path: (id?: number | string) => `/node/info/${id}`,
    routePath: '/node/info/:id',
    component: NodeInfo,
    permissions: PERMISSIONS.node,
  },

  // node scan
  nodeScan: {
    id: '58',
    label: t`Node Scan`,
    path: () => '/node-scan',
    routePath: '/node-scan',
    icon: nodeScanIcon,
    component: NodeScan,
    permissions: PERMISSIONS.nodeScan,
  },
  nodeScanCreate: {
    path: () => '/node-scan/add',
    routePath: '/node-scan/add',
    component: CreateNodeScan,
    permissions: PERMISSIONS.nodeScan,
  },
  // nodeScanEdit: {
  //     path: (id?: number | string) => `/node-scan/edit/${id}`,
  //     routePath: "/node-scan/edit/:id",
  //     component: EditNodeScan,
  //     permissions: PERMISSIONS.nodeScan,
  // },
  // nodeScanInfo: {
  //     path: (id?: number | string) => `/node-scan/info/${id}`,
  //     routePath: "/node-scan/info/:id",
  //     component: NodeScanInfo,
  //     permissions: PERMISSIONS.nodeScan,
  // },

  // door
  door: {
    id: '16',
    label: t`Door`,
    path: () => '/door',
    routePath: '/door',
    icon: doorIcon,
    component: Door,
    permissions: PERMISSIONS.door,
  },
  // doorCreate: {
  //   path: () => '/door/add',
  //   routePath: '/door/add',
  //   component: CreateDoor,
  //   permissions: PERMISSIONS.door,
  // },
  doorEdit: {
    path: (id?: number | string) => `/door/edit/${id}`,
    routePath: '/door/edit/:id',
    component: EditDoor,
    permissions: PERMISSIONS.door,
  },
  doorGroupEdit: {
    path: (ids?: number | string) => `/door/group-edit?ids=${ids}`,
    routePath: '/door/group-edit',
    component: DoorGroupEdit,
    permissions: PERMISSIONS.door,
  },
  doorInfo: {
    path: (id?: number | string) => `/door/info/${id}`,
    routePath: '/door/info/:id',
    component: DoorInfo,
    permissions: PERMISSIONS.door,
  },

  // door rule
  doorRule: {
    id: '59', // ID of "Door Rule"
    label: t`Door Rule`,
    path: () => '/door-rule',
    routePath: '/door-rule',
    icon: doorRuleIcon,
    component: DoorRule,
    permissions: PERMISSIONS.doorRule,
  },
  doorRuleCreate: {
    path: () => '/door-rule/add',
    routePath: '/door-rule/add',
    component: CreateDoorRule,
    permissions: PERMISSIONS.doorRule,
  },
  doorRuleEdit: {
    path: (id?: number | string) => `/door-rule/edit/${id}`,
    routePath: '/door-rule/edit/:id',
    component: EditDoorRule,
    permissions: PERMISSIONS.doorRule,
  },
  doorRuleInfo: {
    path: (id?: number | string) => `/door-rule/info/${id}`,
    routePath: '/door-rule/info/:id',
    component: DoorRuleInfo,
    permissions: PERMISSIONS.doorRule,
  },

  // region
  region: {
    id: '17', // ID of "Region"
    label: t`Region`,
    path: () => '/region',
    routePath: '/region',
    icon: regionIcon,
    component: Region,
    permissions: PERMISSIONS.region,
  },
  regionCreate: {
    path: () => '/region/add',
    routePath: '/region/add',
    component: CreateRegion,
    permissions: PERMISSIONS.region,
  },
  regionEdit: {
    path: (id?: number | string) => `/region/edit/${id}`,
    routePath: '/region/edit/:id',
    component: EditRegion,
    permissions: PERMISSIONS.region,
  },
  regionInfo: {
    path: (id?: number | string) => `/region/info/${id}`,
    routePath: '/region/info/:id',
    component: RegionInfo,
    permissions: PERMISSIONS.region,
  },

  // input
  input: {
    id: '18', // ID of "Input"
    label: t`Input`,
    path: () => '/input',
    routePath: '/input',
    icon: inputIcon,
    component: Input,
    permissions: PERMISSIONS.input,
  },
  // inputCreate: {
  //   path: () => '/input/add',
  //   routePath: '/input/add',
  //   component: CreateInput,
  //   permissions: PERMISSIONS.input,
  // },
  inputEdit: {
    path: (id?: number | string) => `/input/edit/${id}`,
    routePath: '/input/edit/:id',
    component: EditInput,
    permissions: PERMISSIONS.input,
  },
  inputGroupEdit: {
    path: (ids?: number | string) => `/input/group-edit?ids=${ids}`,
    routePath: '/input/group-edit',
    component: InputGroupEdit,
    permissions: PERMISSIONS.input,
  },
  inputInfo: {
    path: (id?: number | string) => `/input/info/${id}`,
    routePath: '/input/info/:id',
    component: InputInfo,
    permissions: PERMISSIONS.input,
  },

  // output
  output: {
    id: '19',
    label: t`Output`,
    path: () => '/output',
    routePath: '/output',
    icon: outputIcon,
    component: Output,
    permissions: PERMISSIONS.output,
  },
  // outputCreate: {
  //   path: () => '/output/add',
  //   routePath: '/output/add',
  //   component: CreateOutput,
  //   permissions: PERMISSIONS.output,
  // },
  outputEdit: {
    path: (id?: number | string) => `/output/edit/${id}`,
    routePath: '/output/edit/:id',
    component: EditOutput,
    permissions: PERMISSIONS.output,
  },
  outputGroupEdit: {
    path: (ids?: number | string) => `/output/group-edit?ids=${ids}`,
    routePath: '/output/group-edit',
    component: OutputGroupEdit,
    permissions: PERMISSIONS.output,
  },
  outputInfo: {
    path: (id?: number | string) => `/output/info/${id}`,
    routePath: '/output/info/:id',
    component: OutputInfo,
    permissions: PERMISSIONS.output,
  },

  // Elevator
  elevator: {
    id: '20',
    label: t`Elevator`,
    path: () => '/elevator',
    routePath: '/elevator',
    icon: elevatorIcon,
    component: Elevator,
    permissions: PERMISSIONS.elevator,
  },
  // elevatorCreate: {
  //   path: () => '/elevator/add',
  //   routePath: '/elevator/add',
  //   component: CreateElevator,
  //   permissions: PERMISSIONS.elevator,
  // },
  elevatorEdit: {
    path: (id?: number | string) => `/elevator/edit/${id}`,
    routePath: '/elevator/edit/:id',
    component: EditElevator,
    permissions: PERMISSIONS.elevator,
  },
  elevatorGroupEdit: {
    path: (ids?: number | string) => `/elevator/group-edit?ids=${ids}`,
    routePath: '/elevator/group-edit',
    component: ElevatorGroupEdit,
    permissions: PERMISSIONS.elevator,
  },
  elevatorInfo: {
    path: (id?: number | string) => `/elevator/info/${id}`,
    routePath: '/elevator/info/:id',
    component: ElevatorInfo,
    permissions: PERMISSIONS.elevator,
  },

  // Relay
  relay: {
    id: '21',
    label: t`Relay`,
    path: () => '/relay',
    routePath: '/relay',
    icon: relayIcon,
    component: Relay,
    permissions: PERMISSIONS.relay,
  },
  // relayCreate: {
  //   path: () => '/relay/add',
  //   routePath: '/relay/add',
  //   component: CreateRelay,
  //   permissions: PERMISSIONS.relay,
  // },
  relayEdit: {
    path: (id?: number | string) => `/relay/edit/${id}`,
    routePath: '/relay/edit/:id',
    component: EditRelay,
    permissions: PERMISSIONS.relay,
  },
  relayGroupEdit: {
    path: (ids?: number | string) => `/relay/group-edit?ids=${ids}`,
    routePath: '/relay/group-edit',
    component: RelayGroupEdit,
    permissions: PERMISSIONS.relay,
  },
  relayInfo: {
    path: (id?: number | string) => `/relay/info/${id}`,
    routePath: '/relay/info/:id',
    component: RelayInfo,
    permissions: PERMISSIONS.relay,
  },

  // Trigger
  trigger: {
    id: '28',
    label: t`Trigger`,
    path: () => '/trigger',
    routePath: '/trigger',
    icon: triggerIcon,
    component: Trigger,
    permissions: PERMISSIONS.trigger,
  },
  triggerCreate: {
    path: () => '/trigger/add',
    routePath: '/trigger/add',
    component: CreateTrigger,
    permissions: PERMISSIONS.trigger,
  },
  triggerEdit: {
    path: (id?: number | string) => `/trigger/edit/${id}`,
    routePath: '/trigger/edit/:id',
    component: EditTrigger,
    permissions: PERMISSIONS.trigger,
  },
  triggerInfo: {
    path: (id?: number | string) => `/trigger/info/${id}`,
    routePath: '/trigger/info/:id',
    component: TriggerInfo,
    permissions: PERMISSIONS.trigger,
  },
  // Threat
  threat: {
    id: '27',
    label: t`Threat`,
    path: () => '/threat',
    routePath: '/threat',
    icon: threatIcon,
    component: Threat,
    permissions: PERMISSIONS.threat,
  },
  threatCreate: {
    path: () => '/threat/add',
    routePath: '/threat/add',
    component: CreateThreat,
    permissions: PERMISSIONS.threat,
  },
  threatEdit: {
    path: (id?: number | string) => `/threat/edit/${id}`,
    routePath: '/threat/edit/:id',
    component: EditThreat,
    permissions: PERMISSIONS.threat,
  },
  threatInfo: {
    path: (id?: number | string) => `/threat/info/${id}`,
    routePath: '/threat/info/:id',
    component: ThreatInfo,
    permissions: PERMISSIONS.threat,
  },
}
export default deviceRouteProperty
