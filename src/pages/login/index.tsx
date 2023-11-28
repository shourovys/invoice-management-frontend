import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { sendPostRequest } from '../../api/swrConfig'
import { authApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Button from '../../components/atomic/Button'
import Input from '../../components/atomic/Input'
import GuestGuard from '../../guards/GuestGuard'
import useAuth from '../../hooks/useAuth'
import routeProperty from '../../routes/routeProperty'
import {
  IFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
  ISingleServerResponse,
} from '../../types/pages/common'
import { IUserWithToken } from '../../types/pages/login'
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
      navigate(routeProperty.user.path())
    }
  }, [isAuthenticated])

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState<IFormErrors>({})

  const { trigger, isMutating } = useSWRMutation(authApi.login, sendPostRequest, {
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  })

  // Function to handle successful login
  function handleLoginSuccess({ data }: ISingleServerResponse<IUserWithToken>) {
    setSession(data.token)
    contextLogin(data.user)
    refreshAuthData()

    // Handle redirection after login
    handleRedirection(data)
  }

  // Function to handle login errors
  function handleLoginError(error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) {
    serverErrorHandler(error, setFormErrors)
  }

  // Function to handle redirection after login
  function handleRedirection(data: IUserWithToken) {
    const role = data?.user?.role
    if (role === 'agent') {
      navigate(routeProperty.invoice.path())
      return // No need to proceed further
    } else if (role === 'admin') {
      navigate(routeProperty.user.path())
      return // No need to proceed further
    }
  }

  // Function to handle input changes
  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }))
  }, [])

  // Function to validate the form
  function validateForm(email?: string, password?: string) {
    const errors: IFormErrors = {}
    if (!email && !formData.email) errors.email = t`Email is required`
    if (!password && !formData.password) errors.password = t`Password is required`
    setFormErrors(errors)

    Object.values(errors).forEach((error) => warningToast(error as string))
    return !Object.keys(errors).length
  }

  // Function to handle form submission
  const handleSubmit = (email?: string, password?: string) => {
    if (validateForm(email, password)) {
      trigger({
        email: formData.email || email,
        password: formData.password || password,
      })
    }
  }

  // Fetch the system oems from the server
  // const { isLoading: isOemLoading, data } = useSWR<ISingleServerResponse<IOemResult>>(logApi.oems, {
  //   onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
  //     refreshAuthData()
  //     if (error.code === 'ERR_NETWORK') {
  //       return warningToast(`Server is not responding. Please restart your device`)
  //     }
  //     if (error.status !== 403 && error.status !== 404) {
  //       return warningToast(error.message)
  //     }
  //   },
  // })

  const oemNo = '0'

  useEffect(() => {
    window.onkeyup = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (document.hasFocus()) {
          handleSubmit(formData.email, formData.password)
        }
      }
    }

    return () => {
      window.onkeyup = null
    }
  }, [formData.email, formData.password])

  useEffect(() => {
    if (oemNo) {
      document.documentElement.setAttribute('data-oem-id', oemNo.toString())
    }
  }, [oemNo])

  // const isOemNoPresent = (_oemNo: number | undefined): boolean => {
  //   return typeof _oemNo !== 'undefined' && !Number.isNaN(_oemNo)
  // }
  return (
    <Page>
      <GuestGuard>
        <div
          className="flex items-center justify-center min-h-screen bg-white bg-no-repeat bg-cover md:justify-center "
          // style={{
          //   ...(!isOemLoading &&
          //     isOemNoPresent(Number(oemNo)) && {
          //       backgroundImage: `url('/oem/${oemNo}/images/LoginBg.png')`,
          //     }),
          // }}
        >
          <div className="flex justify-center w-full m-4 md:justify-center sm:m-10 md:mx-20 lg:mx-40">
            <div className="w-full max-w-xs sm:max-w-md min-w-max bg-[rgba(250,250,250,0.8)] rounded-md px-8 py-6 sm:py-12 lg:px-12 xl:px-16 sm:px-6 shadow-lg">
              <div className="max-w-xs mx-auto text-center sm:w-full">
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 break-words">
                  {t`Sign in to your account`}
                </h2>
              </div>

              <div className="mt-6">
                <FormContainer twoPart={false}>
                  <Input
                    name="email"
                    label={t`Email`}
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
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
                </FormContainer>
              </div>
            </div>
          </div>
        </div>
      </GuestGuard>
    </Page>
  )
}
