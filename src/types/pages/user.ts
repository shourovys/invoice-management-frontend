import { ISelectOption } from '../../components/atomic/Selector'
import optionsToObject from '../../utils/optionsToObject'
import t from '../../utils/translator'
import { IApiQueryParamsBase } from './common'

export interface IUserResult {
  _id: string
  no: number
  name: string
  email: string
  role: 'admin' | 'agent'
  contactNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserRouteQueryParams {
  page: number
  no: string
  roleValue?: string
  roleLabel?: string
  name: string
  email: string
}

export interface IUserApiQueryParams extends IApiQueryParamsBase {
  no?: string
  role?: string
  name?: string
  email?: string
}

export interface IUserFormData {
  password: string
  name: string
  email: string
  contactNumber: string
  role: ISelectOption | null
}

export interface IUserFilters {
  no: string
  role: ISelectOption | null
  name: string
  email: string
  Apply: boolean
}

export const userRoleOptions = [
  {
    label: t`Agent`,
    value: 'agent',
  },
  {
    label: t`Admin`,
    value: 'admin',
  },
]

export const userRoleObject = optionsToObject(userRoleOptions)
