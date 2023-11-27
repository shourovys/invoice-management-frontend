import { useMemo } from 'react'
import useAuth from 'hooks/useAuth'
import checkPermission from 'utils/checkPermission'

interface IProps {
  children: JSX.Element | JSX.Element[]
  actionPermission: string[]
}

function WithPermission({ children, actionPermission }: IProps) {
  const { isAuthenticated, user } = useAuth()

  const userPermissions = useMemo(() => {
    if (isAuthenticated && user?.permissions) {
      return user.permissions.map((permission) => permission.split('.')[1])
    }
    return []
  }, [isAuthenticated, user?.permissions])

  const isPermitted = useMemo(() => {
    return checkPermission(actionPermission, userPermissions)
  }, [actionPermission, userPermissions])

  if (isPermitted) {
    return children
  }
  return null
}

export default WithPermission
