import { IUserResult } from './user'

export interface IProfileResult {
  user: IUserResult
}

export interface IProfileFormData {
  UserId: string
  OldPassword: string
  NewPassword: string
  ConfirmPassword: string
  Email: string
  UserDesc: string
}
