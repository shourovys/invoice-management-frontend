/**
 * Check if the user has permission to access the route.
 *
 * @param routePermission The permission required to access the route
 * @param userPermissions The permissions of the current user
 * @returns `true` if the user has permission to access the route, `false` otherwise
 */
function checkPermission(
  routePermission: string | string[],
  userPermissions: string | string[]
): boolean {
  // If user has wildcard permission, allow access to the route
  if (userPermissions === '*') {
    return true
  }

  // If route permission is a string, check if it matches the user's permission
  if (typeof routePermission === 'string') {
    if (routePermission === '') {
      return false
    }
    if (routePermission === '*') {
      return true
    }

    return userPermissions.includes(routePermission)
  }

  // If route permission is an array, check each permission and return `true` if at least one matches the user's permission
  if (Array.isArray(routePermission)) {
    if (routePermission.length === 0) {
      return false
    }

    // If the array has only one element and it's a wildcard permission, allow access to the route
    if (routePermission.length === 1 && routePermission[0][0] === '*') {
      return true
    }

    // If the array contains arrays, check the first element of each sub-array for permission
    if (routePermission.some((p) => Array.isArray(p))) {
      return routePermission.some((p) => userPermissions.includes(p[0]))
    }

    // Otherwise, check each permission and return `true` if at least one matches the user's permission
    return routePermission.some((p) => userPermissions.includes(p))
  }

  // If none of the conditions above are met, return false
  return false
}

export default checkPermission
