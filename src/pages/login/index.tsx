import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { sendPostRequest } from '../../api/swrConfig'
import { authApi, logApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Button from '../../components/atomic/Button'
import Input from '../../components/atomic/Input'
import GuestGuard from '../../guards/GuestGuard'
import useAuth from '../../hooks/useAuth'
import routeProperty from '../../routes/routeProperty'
import { IPermissionResult } from '../../types/context/auth'
import {
  IFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
  ISingleServerResponse,
} from '../../types/pages/common'
import { IConfigWithToken, IOemResult } from '../../types/pages/login'
import { ILabeledRoute } from '../../types/routes'
import checkPermission from '../../utils/checkPermission'
import { setSession } from '../../utils/jwt'
import serverErrorHandler from '../../utils/serverErrorHandler'
import { warningToast } from '../../utils/toast'
import t from '../../utils/translator'

export default function Login() {
  const navigate = useNavigate()
  const { refresh: refreshAuthData, login: contextLogin, isAuthenticated } = useAuth()

  // if user is present then go back
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routeProperty.dashboard.path())
    }
  }, [isAuthenticated])

  const [formData, setFormData] = useState({ username: '', password: '' })
  const [formErrors, setFormErrors] = useState<IFormErrors>({})

  const { trigger, isMutating } = useSWRMutation(authApi.login, sendPostRequest, {
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  })

  // Function to handle successful login
  function handleLoginSuccess({ data }: ISingleServerResponse<IConfigWithToken>) {
    setSession(data.token)
    contextLogin(data.config)
    refreshAuthData()

    // Handle redirection after login
    handleRedirection(data)
  }

  // Function to handle login errors
  function handleLoginError(error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) {
    serverErrorHandler(error, setFormErrors)
  }

  // Function to handle redirection after login
  function handleRedirection(data: IConfigWithToken) {
    const layout = data?.config?.layout
    // const previousPath = location.state?.previousPath
    const favoritePages = data.config.permissions.filter((page) => page.is_favorite)

    if (layout === 'Initial') {
      navigate(routeProperty.licenseInfo.path())
      return // No need to proceed further
    } else if (layout === 'Worker') {
      navigate(routeProperty.dashboard.path())
      return // No need to proceed further
    } else {
      // if user is admin then go to dashboard
      if (data.config.user?.UserId === 'admin') {
        navigate(routeProperty.dashboard.path())
        return // No need to proceed further
      } else {
        // nagiagate to the first user role page
        const userRolePages = data.config.permissions.find((page) => page.access)
        if (userRolePages) {
          // match id with route id
          const labelRoute = Object.values(routeProperty).filter((obj) =>
            Object.prototype.hasOwnProperty.call(obj, 'label')
          )

          const firstPermittedUserRolePageRoute = labelRoute
            .map((route) => route as ILabeledRoute)
            .find(
              (route) =>
                route.id === userRolePages.id.toString() &&
                checkPermission(route.permissions, data.config.permissions)
            )

          if (firstPermittedUserRolePageRoute) {
            navigate(firstPermittedUserRolePageRoute.path())
            return // No need to proceed further
          }
        }
      }

      //navigate(redirectToFirstFavoritePage(favoritePages))
      // window.location.href = redirectToFirstFavoritePage(favoritePages)
      // Navigate to the first favorite page if available
      return // No need to proceed further
    }

    // if (previousPath) {
    //   const previousRoute = ReactRoutes.find((route) => route.path() === previousPath)
    //
    //   if (previousRoute && checkPermission(previousRoute.permissions, data.config.permissions)) {
    //     navigate(previousPath) // Navigate back to the previous page
    //   } else {
    //     redirectToFirstFavoritePage(favoritePages) // Navigate to the first favorite page if available
    //   }
    //   return // No need to proceed further
    // }

    // const hasDashboardPermission = checkPermission(
    //   routeProperty.dashboard.permissions,
    //   data.config.permissions
    // )

    //   const historyState = window.history.length > 1
    //   const previousRoute = ReactRoutes.find((route) => route.path() === window.location.pathname)

    //   if (
    //     historyState &&
    //     previousRoute &&
    //     checkPermission(previousRoute.permissions, data.config.permissions)
    //   ) {
    //     navigate(-1) // Navigate back to the previous page
    //   } else {
    //     redirectToFirstFavoritePage(favoritePages) // Navigate to the first favorite page if available
    //   }
    // }
  }

  // Function to redirect to the first favorite page if available, else navigate to the favorite page
  function redirectToFirstFavoritePage(favoritePages: IPermissionResult[]): string {
    if (!favoritePages.length) {
      return routeProperty.favorite.path()
    }

    const sortedFavoritePages: IPermissionResult[] = favoritePages.sort(
      (a, b) => a.position - b.position
    )
    const labelRoute = Object.values(routeProperty).filter((obj) =>
      Object.prototype.hasOwnProperty.call(obj, 'label')
    )

    const firstPermittedFavoritePageRoute = labelRoute
      .map((route) => route as ILabeledRoute)
      .find(
        (route) =>
          route.id === sortedFavoritePages[0].id.toString() &&
          checkPermission(route.permissions, favoritePages)
      )

    if (firstPermittedFavoritePageRoute) {
      return firstPermittedFavoritePageRoute.path()
    } else {
      return routeProperty.favorite.path()
    }
  }

  // Function to handle input changes
  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }))
  }, [])

  // Function to validate the form
  function validateForm(username?: string, password?: string) {
    const errors: IFormErrors = {}
    if (!username && !formData.username) errors.username = t`Username is required`
    if (!password && !formData.password) errors.password = t`Password is required`
    setFormErrors(errors)

    Object.values(errors).forEach((error) => warningToast(error as string))
    return !Object.keys(errors).length
  }

  // Function to handle form submission
  const handleSubmit = (username?: string, password?: string) => {
    if (validateForm(username, password)) {
      trigger({
        username: formData.username || username,
        password: formData.password || password,
      })
    }
  }

  // Fetch the system oems from the server
  const { isLoading: isOemLoading, data } = useSWR<ISingleServerResponse<IOemResult>>(logApi.oems, {
    onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
      refreshAuthData()
      if (error.code === 'ERR_NETWORK') {
        return warningToast(`Server is not responding. Please restart your device`)
      }
      if (error.status !== 403 && error.status !== 404) {
        return warningToast(error.message)
      }
      // if (error.response && 'data' in error.response.data) {
      //   if (error.response.data.data) {
      //     warningToast(error.response.data.data)
      //   } else {
      //     warningToast(error.response.data.message)
      //   }
      // }
    },
  })

  const oemNo = data?.data.OemNo

  useEffect(() => {
    window.onkeyup = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (document.hasFocus()) {
          handleSubmit(formData.username, formData.password)
        }
      }
    }

    return () => {
      window.onkeyup = null
    }
  }, [formData.username, formData.password])

  useEffect(() => {
    if (oemNo) {
      document.documentElement.setAttribute('data-oem-id', oemNo.toString())
    }
  }, [oemNo])

  const isOemNoPresent = (_oemNo: number | undefined): boolean => {
    return typeof _oemNo !== 'undefined' && !Number.isNaN(_oemNo)
  }
  return (
    <Page>
      <GuestGuard>
        <div
          className="flex items-center justify-center min-h-screen bg-white bg-no-repeat bg-cover md:justify-end "
          style={{
            ...(!isOemLoading &&
              isOemNoPresent(oemNo) && {
                backgroundImage: `url('/oem/${oemNo}/images/LoginBg.png')`,
              }),
          }}
        >
          <div className="flex justify-center md:justify-end w-full m-4 sm:m-10 md:mx-20 lg:mx-40">
            <div className="w-full max-w-xs sm:max-w-md min-w-max bg-[rgba(250,250,250,0.8)] rounded-md px-8 py-6 sm:py-12 lg:px-12 xl:px-16 sm:px-6 shadow-lg">
              <div className="max-w-xs mx-auto text-center sm:w-full">
                {!isOemLoading && isOemNoPresent(oemNo) && (
                  <img
                    className="w-auto h-12 mx-auto mix-blend-color-burn"
                    src={`/oem/${oemNo}/images/mainLogo.png`}
                    alt="Workflow"
                  />
                )}
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 break-words">
                  {t`Sign in to your account`}
                </h2>
              </div>

              <div className="mt-6">
                <FormContainer twoPart={false}>
                  <Input
                    name="username"
                    label={t`Username`}
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formErrors.username}
                  />
                  <Input
                    name="password"
                    label={t`Password`}
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formErrors.password}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor="remember-me" className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                      />
                      <p className="block ml-2 text-sm text-gray-900">{t`Remember me`}</p>
                    </label>

                    {/*<div className="hidden text-sm sm:block">*/}
                    {/*  <a*/}
                    {/*    // href="#"*/}
                    {/*    className="font-medium cursor-pointer text-primary hover:text-primary"*/}
                    {/*  >*/}
                    {/*    Forgot your password?*/}
                    {/*  </a>*/}
                    {/*</div>*/}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      isLoading={isMutating}
                      onClick={() => handleSubmit()}
                    >
                      {t`Login`}
                    </Button>
                  </div>
                  {/*<div className="text-sm text-center sm:hidden">*/}
                  {/*  <a*/}
                  {/*    // href="#"*/}
                  {/*    className="font-medium cursor-pointer text-primary hover:text-primary"*/}
                  {/*  >*/}
                  {/*    Forgot your password?*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                </FormContainer>
              </div>
            </div>
          </div>
        </div>
      </GuestGuard>
    </Page>
  )
}
