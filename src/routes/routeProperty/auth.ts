import Login from '../../pages/login'
import { IRouteProperty } from '../../types/routes'

// const EditProfile = lazy(() => import('../../pages/profile'))

const authRouteProperty: IRouteProperty = {
  // login
  login: {
    path: () => '/login',
    permissions: '*',
    routePath: '/login',
    component: Login, // replace Login with your actual login component
  },
  // profile: {
  //   path: () => '/profile',
  //   permissions: '*',
  //   routePath: '/profile',
  //   component: EditProfile, // replace Profile with your actual profile component
  // },
}

export default authRouteProperty
