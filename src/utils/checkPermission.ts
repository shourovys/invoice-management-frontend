import { IPermission } from '../types/context/auth'

/**
 * Check if the user has permission to access the route.
 *
 * @param routePermission The permission required to access the route
 * @param userPermissions The permissions of the current user
 * @returns `true` if the user has permission to access the route, `false` otherwise
 */
function checkPermission(routePermission: IPermission, userRole: 'admin' | 'agent'): boolean {
  // If route permission is a string, check if it matches the user's permission
  if (typeof routePermission === 'string') {
    if (routePermission === '*' || userRole === 'admin') {
      return true
    }

    if (routePermission === 'user' && userRole === 'agent') {
      return false
    }
  }

  // If none of the conditions above are met, return false
  return false
}

export default checkPermission
