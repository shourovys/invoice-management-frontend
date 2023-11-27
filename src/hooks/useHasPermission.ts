import { useMemo } from 'react'
import checkPermission from 'utils/checkPermission'
import useAuth from './useAuth'

function useHasPermission(actionPermission: string[]): boolean {
  const { isAuthenticated, user } = useAuth()

  const userPermissions = useMemo(() => {
    if (isAuthenticated && user?.permissions) {
      return user.permissions.map((permission) => permission.split('.')[1])
    }
    return []
  }, [isAuthenticated, user?.permissions])

  return useMemo(() => {
    return checkPermission(actionPermission, userPermissions)
  }, [actionPermission, userPermissions])
}

export default useHasPermission
