import { lazy } from 'react'
import Login from '../../pages/login'
import { IRoute, IRouteProperty } from '../../types/routes'
import { invoiceIcon, userIcon } from '../../utils/icons'
import t from '../../utils/translator'

const User = lazy(() => import('../../pages/user'))
const CreateUser = lazy(() => import('../../pages/user/add'))
const EditUser = lazy(() => import('../../pages/user/edit/[id]'))
const UserInfo = lazy(() => import('../../pages/user/info/[id]'))

const Invoice = lazy(() => import('../../pages/invoice'))
const CreateInvoice = lazy(() => import('../../pages/invoice/add'))
const EditInvoice = lazy(() => import('../../pages/invoice/edit/[id]'))
const InvoiceInfo = lazy(() => import('../../pages/invoice/info/[id]'))

const routeProperty: IRouteProperty = {
  // User
  user: {
    id: '8', // ID of "User"
    label: t`User`,
    path: () => '/user',
    routePath: '/user',
    icon: userIcon,
    component: User,
    permissions: '*',
  },
  userCreate: {
    path: () => '/user/add',
    routePath: '/user/add',
    component: CreateUser,
    permissions: '*',
  },
  userEdit: {
    path: (id?: number | string) => `/user/edit/${id}`,
    routePath: '/user/edit/:id',
    component: EditUser,
    permissions: '*',
  },
  userInfo: {
    path: (id?: number | string) => `/user/info/${id}`,
    routePath: '/user/info/:id',
    component: UserInfo,
    permissions: '*',
  },
  // Invoice
  invoice: {
    id: '8', // ID of "Invoice"
    label: t`Invoice`,
    path: () => '/invoice',
    routePath: '/invoice',
    icon: invoiceIcon,
    component: Invoice,
    permissions: '*',
  },
  invoiceCreate: {
    path: () => '/invoice/add',
    routePath: '/invoice/add',
    component: CreateInvoice,
    permissions: '*',
  },
  invoiceEdit: {
    path: (id?: number | string) => `/invoice/edit/${id}`,
    routePath: '/invoice/edit/:id',
    component: EditInvoice,
    permissions: '*',
  },
  invoiceInfo: {
    path: (id?: number | string) => `/invoice/info/${id}`,
    routePath: '/invoice/info/:id',
    component: InvoiceInfo,
    permissions: '*',
  },
  login: {
    path: () => '/login',
    permissions: '*',
    routePath: '/login',
    component: Login, // replace Login with your actual login component
  },
}
export default routeProperty

const ReactRoutes: IRoute[] = Object.entries(routeProperty).map(
  ([, value]: [string, IRoute]) => value
)

export { ReactRoutes }

// console.log(ReactRoutes.map((route) => 'http://localhost:3000' + route.path(1, 1)))
