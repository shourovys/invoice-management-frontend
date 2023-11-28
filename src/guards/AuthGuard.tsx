import { pathToRegexp } from 'path-to-regexp'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingSvg from '../components/loading/atomic/LoadingSvg'
import HelperPages from '../components/pages/helperPages'
import useAuth from '../hooks/useAuth'
import routeProperty, { ReactRoutes } from '../routes/routeProperty'
import { LOCAL_STORAGE_KEY } from '../utils/config'
import t from '../utils/translator'

interface IProps {
  children: JSX.Element
}

/**
 * get the matching route property name for the given pathname
 * @param pathname current pathname of the user
 * @returns matching route name or null if not found
 */

const useCurrentPath = () => {
  const location = useLocation()

  for (const route of ReactRoutes) {
    const regex = pathToRegexp(route.routePath)
    if (regex.test(location.pathname)) {
      return route.routePath
    }
  }

  return ''
}

function AuthGuard({ children }: IProps) {
  const currentRoutePath = useCurrentPath()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { isAuthenticated, loading } = useAuth()

  let token: string | null = null
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
  }

  // redirect to login page if user is not authenticated and current page is not login page and if token is not present in localstorage
  useEffect(() => {
    if (
      (!loading && !isAuthenticated && pathname !== routeProperty.login.path()) ||
      (!token && pathname !== routeProperty.login.path())
    ) {
      navigate(routeProperty.login.path(), { state: { previousPath: pathname } })
    }
  }, [isAuthenticated, loading, pathname, navigate, token])

  // calculate the permission for the current user and page
  const isPermitted = useMemo(() => {
    // if user in login page, return true
    if (pathname === routeProperty.login.path()) {
      return true
    }

    // if user is not authenticated, return false
    if (!isAuthenticated) {
      return false
    }

    // get the required permissions for the current route
    const routePermissions = ReactRoutes.find((route) => route.routePath === currentRoutePath)
      ?.permissions

    // if no permissions are required for the current route, return true
    if (!routePermissions) {
      return true
    }

    // check if the user has the required permissions for the current route
    // return checkPermission(routePermissions, user?.role)
    // return checkPermission(routePermissions, user?.role)
    return true
  }, [isAuthenticated, pathname])

  if (!loading && !isPermitted) {
    if (pathname === '/') {
      navigate(routeProperty.licenseInfo.path())
    } else {
      return (
        <HelperPages
          statusCode="401"
          title={t`You are not authorized for this page!`}
          message="Please contact your administrator for more information."
        />
      )
    }
  }

  // if current page is not login page and user is not authenticated or is loading , show loading screen
  if (pathname !== routeProperty.login.path() && (loading || !isAuthenticated)) {
    console.log(
      '🚀 ~ file: AuthGuard.tsx:103 ~ AuthGuard ~ loading || !isAuthenticated:',
      loading,
      isAuthenticated
    )
    return (
      <div
        className="flex items-center justify-center w-screen h-screen"
        style={{ height: '100vh' }}
      >
        <LoadingSvg size="extraLarge" color="primary" />
      </div>
    )
  }

  // return the children if user is authenticated and permitted for the current page
  return children
}

export default AuthGuard
