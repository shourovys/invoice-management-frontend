import { IUserResult } from '../pages/user'

export type IPermission = 'admin' | 'agent' | '*'

export interface IPermissionResult {
  id: number
  name: string
  url: string
  access: boolean
  is_favorite: boolean
  position: number
  limit: number
}

export type LicenseCheckType =
  | 'Camera'
  | 'Channel'
  | 'Lockset'
  | 'Subnode'
  | 'ContLock'
  | 'Facegate'
  | 'Intercom'

export type IAuthContext = {
  user: IUserResult | null
  loading: boolean
  isAuthenticated: boolean
  logout: () => void
  login: (user: IUserResult) => void
  refresh: () => void
}

// extends ISystemConfigResponse {
//   loading: boolean
//   isAuthenticated: boolean
//   logout: () => void
//   login: (config: ISystemConfigResponse) => void
// }
