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
export interface IProfileFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
  name: string
  email: string
  contactNumber: string
}
