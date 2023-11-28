import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import {
  eventActionIcon,
  eventCodeIcon,
  groupIcon,
  holidayIcon,
  scheduleIcon,
  taskIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

const EventAction = lazy(() => import('../../pages/event-action'))
const CreateEventAction = lazy(() => import('../../pages/event-action/add'))
const EditEventAction = lazy(() => import('../../pages/event-action/edit/[id]'))
const EventActionInfo = lazy(() => import('../../pages/event-action/info/[id]'))

const CreateEvent = lazy(() => import('../../pages/event-action/[eventActionId]/event/add'))
const EditEvent = lazy(() => import('../../pages/event-action/[eventActionId]/event/edit/[id]'))
const EventInfo = lazy(() => import('../../pages/event-action/[eventActionId]/event/info/[id]'))

const CreateAction = lazy(() => import('../../pages/event-action/[eventActionId]/action/add'))
const EditAction = lazy(() => import('../../pages/event-action/[eventActionId]/action/edit/[id]'))
const ActionInfo = lazy(() => import('../../pages/event-action/[eventActionId]/action/info/[id]'))

const EventCode = lazy(() => import('../../pages/event-code'))
const Group = lazy(() => import('../../pages/group'))
const CreateGroup = lazy(() => import('../../pages/group/add'))
const EditGroup = lazy(() => import('../../pages/group/edit/[id]'))
const GroupInfo = lazy(() => import('../../pages/group/info/[id]'))
const Holiday = lazy(() => import('../../pages/holiday'))
const CreateHoliday = lazy(() => import('../../pages/holiday/add'))
const EditHoliday = lazy(() => import('../../pages/holiday/edit/[id]'))
const HolidayInfo = lazy(() => import('../../pages/holiday/info/[id]'))
const CreateHolidayItem = lazy(() => import('../../pages/holiday/[holidayId]/item/add'))
const EditHolidayItem = lazy(() => import('../../pages/holiday/[holidayId]/item/edit/[id]'))
const HolidayItemInfo = lazy(() => import('../../pages/holiday/[holidayId]/item/info/[id]'))
const CreateScheduleItem = lazy(() => import('../../pages/schedule/[scheduleId]/item/add'))
const EditScheduleItem = lazy(() => import('../../pages/schedule/[scheduleId]/item/edit/[id]'))
const ScheduleItemInfo = lazy(() => import('../../pages/schedule/[scheduleId]/item/info/[id]'))
const Schedule = lazy(() => import('../../pages/schedule'))
const CreateSchedule = lazy(() => import('../../pages/schedule/add'))
const EditSchedule = lazy(() => import('../../pages/schedule/edit/[id]'))
const ScheduleInfo = lazy(() => import('../../pages/schedule/info/[id]'))
const Task = lazy(() => import('../../pages/task'))
const CreateTask = lazy(() => import('../../pages/task/add'))
const EditTask = lazy(() => import('../../pages/task/edit/[id]'))
const TaskInfo = lazy(() => import('../../pages/task/info/[id]'))

const workRouteProperty: IRouteProperty = {
  // Task
  task: {
    id: '29',
    label: t`Task`,
    path: () => '/task',
    routePath: '/task',
    icon: taskIcon,
    component: Task,
    permissions: PERMISSIONS.task,
  },
  taskCreate: {
    path: () => '/task/add',
    routePath: '/task/add',
    component: CreateTask,
    permissions: PERMISSIONS.task,
  },
  taskEdit: {
    path: (id?: number | string) => `/task/edit/${id}`,
    routePath: '/task/edit/:id',
    component: EditTask,
    permissions: PERMISSIONS.task,
  },
  taskInfo: {
    path: (id?: number | string) => `/task/info/${id}`,
    routePath: '/task/info/:id',
    component: TaskInfo,
    permissions: PERMISSIONS.task,
  },

  // Event Action
  eventAction: {
    id: '30',
    label: t`Event Action`,
    path: () => '/event-action',
    routePath: '/event-action',
    icon: eventActionIcon,
    component: EventAction,
    permissions: PERMISSIONS.eventAction,
  },
  eventActionCreate: {
    path: () => '/event-action/add',
    routePath: '/event-action/add',
    component: CreateEventAction,
    permissions: PERMISSIONS.eventAction,
  },
  eventActionEdit: {
    path: (id?: number | string) => `/event-action/edit/${id}`,
    routePath: '/event-action/edit/:id',
    component: EditEventAction,
    permissions: PERMISSIONS.eventAction,
  },
  eventActionInfo: {
    path: (id?: number | string) => `/event-action/info/${id}`,
    routePath: '/event-action/info/:id',
    component: EventActionInfo,
    permissions: PERMISSIONS.eventAction,
  },
  // Event Action => Event
  eventCreate: {
    path: (eventActionId?: number | string) => `/event-action/${eventActionId}/event/add/`,
    routePath: '/event-action/:eventActionId/event/add/',
    component: CreateEvent,
    permissions: PERMISSIONS.eventAction,
  },
  eventEdit: {
    path: (eventActionId?: number | string, eventId?: number | string) =>
      `/event-action/${eventActionId}/event/edit/${eventId}`,
    routePath: '/event-action/:eventActionId/event/edit/:id',
    component: EditEvent,
    permissions: PERMISSIONS.eventAction,
  },
  eventInfo: {
    path: (eventActionId?: number | string, eventId?: number | string) =>
      `/event-action/${eventActionId}/event/info/${eventId}`,
    routePath: '/event-action/:eventActionId/event/info/:id',
    component: EventInfo,
    permissions: PERMISSIONS.eventAction,
  },
  // Event Action => Action
  actionCreate: {
    path: (eventActionId?: number | string) => `/event-action/${eventActionId}/action/add/`,
    routePath: '/event-action/:eventActionId/action/add/',
    component: CreateAction,
    permissions: PERMISSIONS.eventAction,
  },
  actionEdit: {
    path: (eventActionId?: number | string, eventId?: number | string) =>
      `/event-action/${eventActionId}/action/edit/${eventId}`,
    routePath: '/event-action/:eventActionId/action/edit/:id',
    component: EditAction,
    permissions: PERMISSIONS.eventAction,
  },
  actionInfo: {
    path: (eventActionId?: number | string, eventId?: number | string) =>
      `/event-action/${eventActionId}/action/info/${eventId}`,
    routePath: '/event-action/:eventActionId/action/info/:id',
    component: ActionInfo,
    permissions: PERMISSIONS.eventAction,
  },

  // Event Code
  eventCode: {
    id: '54',
    label: t`Event Code`,
    path: () => '/event-code',
    routePath: '/event-code',
    icon: eventCodeIcon,
    component: EventCode,
    permissions: PERMISSIONS.eventCode,
  },
  // eventCodeCreate: {
  //     path: () => "/event-code/add",
  //     routePath: "/event-code/add",
  //     component: CreateEventCode,
  //     permissions: PERMISSIONS.eventCode,
  // },
  // eventCodeEdit: {
  //     path: (id?: number | string) => `/event-code/edit/${id}`,
  //     routePath: "/event-code/edit/:id",
  //     component: EditEventCode,
  //     permissions: PERMISSIONS.eventCode,
  // },
  // eventCodeInfo: {
  //     path: (id?: number | string) => `/event-code/info/${id}`,
  //     routePath: "/event-code/info/:id",
  //     component: EventCodeInfo,
  //     permissions: PERMISSIONS.eventCode,
  // },

  // Schedule
  schedule: {
    id: '31',
    label: t`Schedule`,
    path: () => '/schedule',
    routePath: '/schedule',
    icon: scheduleIcon,
    component: Schedule,
    permissions: PERMISSIONS.schedule,
  },
  scheduleCreate: {
    path: () => '/schedule/add',
    routePath: '/schedule/add',
    component: CreateSchedule,
    permissions: PERMISSIONS.schedule,
  },
  scheduleEdit: {
    path: (id?: number | string) => `/schedule/edit/${id}`,
    routePath: '/schedule/edit/:id',
    component: EditSchedule,
    permissions: PERMISSIONS.schedule,
  },
  scheduleInfo: {
    path: (id?: number | string) => `/schedule/info/${id}`,
    routePath: '/schedule/info/:id',
    component: ScheduleInfo,
    permissions: PERMISSIONS.schedule,
  },
  // schedule item
  scheduleItemCreate: {
    path: (scheduleId?: number | string) => `/schedule/${scheduleId}/item/add/`,
    routePath: '/schedule/:scheduleId/item/add/',
    component: CreateScheduleItem,
    permissions: PERMISSIONS.schedule,
  },
  scheduleItemEdit: {
    path: (scheduleId?: number | string, scheduleItemId?: number | string) =>
      `/schedule/${scheduleId}/item/edit/${scheduleItemId}`,
    routePath: '/schedule/:scheduleId/item/edit/:id',
    component: EditScheduleItem,
    permissions: PERMISSIONS.schedule,
  },
  scheduleItemInfo: {
    path: (scheduleId?: number | string, scheduleItemId?: number | string) =>
      `/schedule/${scheduleId}/item/info/${scheduleItemId}`,
    routePath: '/schedule/:scheduleId/item/info/:id',
    component: ScheduleItemInfo,
    permissions: PERMISSIONS.schedule,
  },

  // Holiday
  holiday: {
    id: '32',
    label: t`Holiday`,
    path: () => '/holiday',
    routePath: '/holiday',
    icon: holidayIcon,
    component: Holiday,
    permissions: PERMISSIONS.holiday,
  },
  holidayCreate: {
    path: () => '/holiday/add',
    routePath: '/holiday/add',
    component: CreateHoliday,
    permissions: PERMISSIONS.holiday,
  },
  holidayEdit: {
    path: (id?: number | string) => `/holiday/edit/${id}`,
    routePath: '/holiday/edit/:id',
    component: EditHoliday,
    permissions: PERMISSIONS.holiday,
  },
  holidayInfo: {
    path: (id?: number | string) => `/holiday/info/${id}`,
    routePath: '/holiday/info/:id',
    component: HolidayInfo,
    permissions: PERMISSIONS.holiday,
  },
  // holiday items
  holidayItemCreate: {
    path: (holidayId?: number | string) => `/holiday/${holidayId}/item/add/`,
    routePath: '/holiday/:holidayId/item/add/',
    component: CreateHolidayItem,
    permissions: PERMISSIONS.holiday,
  },
  holidayItemEdit: {
    path: (holidayId?: number | string, holidayItemId?: number | string) =>
      `/holiday/${holidayId}/item/edit/${holidayItemId}`,
    routePath: '/holiday/:holidayId/item/edit/:id',
    component: EditHolidayItem,
    permissions: PERMISSIONS.holiday,
  },
  holidayItemInfo: {
    path: (holidayId?: number | string, holidayItemId?: number | string) =>
      `/holiday/${holidayId}/item/info/${holidayItemId}`,
    routePath: '/holiday/:holidayId/item/info/:id',
    component: HolidayItemInfo,
    permissions: PERMISSIONS.holiday,
  },

  // Group
  group: {
    id: '33',
    label: t`Group`,
    path: () => '/group',
    routePath: '/group',
    icon: groupIcon,
    component: Group,
    permissions: PERMISSIONS.group,
  },
  groupCreate: {
    path: () => '/group/add',
    routePath: '/group/add',
    component: CreateGroup,
    permissions: PERMISSIONS.group,
  },
  groupEdit: {
    path: (id?: number | string) => `/group/edit/${id}`,
    routePath: '/group/edit/:id',
    component: EditGroup,
    permissions: PERMISSIONS.group,
  },
  groupInfo: {
    path: (id?: number | string) => `/group/info/${id}`,
    routePath: '/group/info/:id',
    component: GroupInfo,
    permissions: PERMISSIONS.group,
  },
}

export default workRouteProperty
