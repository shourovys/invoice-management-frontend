import { createContext } from 'react'
import { IAuthContext } from '../../types/context/auth'

const initialState: IAuthContext = {
  user: null,
  loading: true,
  isAuthenticated: false,
  logout: () => null,
  login: () => null,
  refresh: () => null,
}

// Create the AuthContext with initial value
const AuthContext = createContext<IAuthContext>(initialState)

export default AuthContext
