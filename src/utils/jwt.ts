import jwtDecode from 'jwt-decode'
import { LOCAL_STORAGE_KEY } from './config'
// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false
  }
  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000

  // return decoded.exp > currentTime
}

const setSession = (accessToken: string) => {
  if (accessToken) {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken)
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
  }
}

export { isValidToken, setSession }

