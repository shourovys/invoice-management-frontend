import { useMemo } from 'react'
import { IPermission } from '../types/context/auth'
import checkPermission from '../utils/checkPermission'
import useAuth from './useAuth'

function useHasPermission(actionPermission: IPermission): boolean {
  const { isAuthenticated, permissions } = useAuth()

  const userPermissions = useMemo(() => {
    if (isAuthenticated && permissions) {
      return permissions.map((permission) => permission)
    }
    return []
  }, [isAuthenticated, permissions])

  return useMemo(() => {
    return checkPermission(actionPermission, userPermissions)
  }, [actionPermission, userPermissions])
}

export default useHasPermission
