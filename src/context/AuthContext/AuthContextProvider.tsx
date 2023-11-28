import { authApi } from '../../api/urls'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { IAuthContext, LicenseCheckType } from '../../types/context/auth'
import { ISingleServerResponse } from '../../types/pages/common'
import { ISystemConfigResponse } from '../../types/pages/login'
import { LOCAL_STORAGE_KEY } from '../../utils/config'
import AuthContext from './AuthContext'
import Cookies from 'js-cookie'

const initialState: IAuthContext = {
  user: null,
  partition: null,
  license: null,
  layout: '',
  permissions: [],
  loading: true,
  isAuthenticated: false,
  logout: () => null,
  login: () => null,
  refresh: () => null,
  has_license: () => false,
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Define the initial state for the authentication context
  const [state, setState] = useState<IAuthContext>(initialState)

  // Function to handle user login and update the state
  const login = (config: ISystemConfigResponse) => {
    const { date_format, time_format, timezone, language } = config

    localStorage.setItem(LOCAL_STORAGE_KEY.dateFormat, date_format)
    localStorage.setItem(LOCAL_STORAGE_KEY.timeFormat, time_format)
    localStorage.setItem(LOCAL_STORAGE_KEY.timezone, timezone)
    Cookies.set('lang', language)

    setState((prevState) => ({
      ...prevState,
      ...config,
      isAuthenticated: true,
      loading: false,
    }))
  }

  const has_license = (key: string) => {
    if (state.license) {
      const has_to_check = [
        'Camera',
        'Channel',
        'Lockset',
        'Facegate',
        'Subnode',
        'ContLock',
        'Intercom',
      ]
      // check license has key
      if (has_to_check.includes(key)) {
        return state.license[key as LicenseCheckType] > 0
      }
      return true
    }
    return true
  }

  // Function to handle user logout and update the state
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
    setState((prevState) => ({
      ...prevState,
      user: null,
      partition: null,
      license: null,
      layout: '',
      permissions: [],
      isAuthenticated: false,
      loading: false,
    }))
  }

  // Get the access token from local storage, if available
  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
      : null

  // Use SWR to fetch the configuration data and update the state on success or error
  const { mutate: configMutate } = useSWR(token ? authApi.config : null, {
    // const { mutate: configMutate } = useSWR(token && !state.isAuthenticated ? authApi.config : null, {
    onSuccess: (data: ISingleServerResponse<ISystemConfigResponse>) => {
      if (data.data?.user?.UserId) {
        const {
          user,
          partition,
          license,
          layout,
          permissions,
          date_format,
          time_format,
          timezone,
          language,
        } = data.data

        setState((prevState) => ({
          ...prevState,
          user,
          partition,
          license,
          layout,
          permissions,
          loading: false,
          isAuthenticated: true,
        }))

        // Set date format
        localStorage.setItem(LOCAL_STORAGE_KEY.dateFormat, date_format)
        localStorage.setItem(LOCAL_STORAGE_KEY.timeFormat, time_format)
        localStorage.setItem(LOCAL_STORAGE_KEY.timezone, timezone)

        if (Cookies.get('lang') !== language) {
          Cookies.set('lang', language)
          window.location.reload()
        }

        // Set html data-theme for OEM
        document.documentElement.setAttribute('data-oem-id', (license?.OemNo ?? '1').toString())
      } else {
        setState((prevState) => ({
          ...prevState,
          user: null,
          partition: null,
          license: null,
          layout: '',
          permissions: [],
          isAuthenticated: false,
          loading: false,
        }))
      }
    },
    onError: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
      setState((prevState) => ({
        ...prevState,
        user: null,
        partition: null,
        license: null,
        layout: '',
        permissions: [],
        isAuthenticated: false,
        loading: false,
      }))
    },
  })

  // Function to trigger the configuration data refresh
  const refresh = () => {
    configMutate()
  }

  // Provide the authentication context with the required values and functions
  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          ...state,
          login,
          logout,
          refresh,
          has_license,
        }),
        [state]
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
