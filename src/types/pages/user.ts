import { ISelectOption } from '../../components/atomic/Selector'

export interface IUserResult {
  id: string
  no: number
  name: string
  email: string
  role: 'admin' | 'agent'
  contactNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserFormData {
  UserNo: string // Primary Key. 0: Administrator
  UserId: string // Validate Text, Unique
  Password: string // Validate Text
  UserDesc: string // User Description
  Email: string // Email Notification
  Partition: ISelectOption | null // Partitions -> PartitionNo
  Role: ISelectOption | null // Validate Integer, Roles -> RoleNo
  Person: ISelectOption | null // Persons -> PersonNo
}

export interface IUserFilters {
  UserNo: string
  UserId: string
  Partition: ISelectOption | null
  Role: ISelectOption | null
  Apply: boolean
}

// export const systemMediaOptions = [
//   {
//     label: t`User`,
//     value: '0',
//   },
//   {
//     label: t`SD Card`,
//     value: '1',
//   },
//   {
//     label: t`USB Memory`,
//     value: '2',
//   },
// ]
