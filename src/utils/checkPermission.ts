import { IPermission, IPermissionResult } from '../types/context/auth'

/**
 * Check if the user has permission to access the route.
 *
 * @param routePermission The permission required to access the route
 * @param userPermissions The permissions of the current user
 * @returns `true` if the user has permission to access the route, `false` otherwise
 */
function checkPermission(
  routePermission: IPermission,
  userPermissions: IPermissionResult[]
): boolean {
  // If route permission is a string, check if it matches the user's permission
  if (typeof routePermission === 'string') {
    // if (routePermission === '') {
    //   return false
    // }
    if (routePermission === '*') {
      return true
    }
  }

  // If route permission is an array, check each permission and return `true` if at least one matches the user's permission
  if (routePermission.url) {
    return !!userPermissions.find(
      (userPermission) => userPermission.url === routePermission.url && userPermission.access
    )
  }

  // If none of the conditions above are met, return false
  return false
}

export default checkPermission
