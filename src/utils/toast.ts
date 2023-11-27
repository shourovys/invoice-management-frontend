import { toast } from 'react-hot-toast'

type toastFunction = (message?: string) => string

export const addSuccessfulToast: toastFunction = (message = 'Added successfully') =>
  toast.success(message)

export const editSuccessfulToast: toastFunction = (message = 'Update successfully') =>
  toast.success(message)

export const deleteSuccessfulToast: toastFunction = (message = 'Delete successfully') =>
  toast.success(message)

export const errorToast: toastFunction = (message = 'Update successfully') => toast.error(message)
