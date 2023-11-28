import {
  DefaultToastOptions,
  Renderable,
  resolveValue,
  toast,
  ValueOrFunction,
} from 'react-hot-toast'
import t from './translator'

type toastFunction = (message?: string) => string

export const addSuccessfulToast: toastFunction = (message = 'Successful') =>
  toast.success(t(message), {
    icon: '✅',
  })

export const editSuccessfulToast: toastFunction = (message = 'Successful') =>
  toast.success(t(message), {
    icon: '✅',
  })

// export const deleteSuccessfulToast: toastFunction = (message = 'Successful') =>
//   toast.success(message)

export const errorToast: toastFunction = (message = 'Error!') =>
  toast.error(t(message), {
    icon: '❌',
  })

export const warningToast: toastFunction = (message = 'Warning!') =>
  toast(t(message), {
    icon: '⚠️',
  })

export type IPromiseToastMessageOptions = { loading?: string; success?: string; error?: string }

const toastPromise = <T>(
  promise: Promise<T>,
  msgs: {
    loading: Renderable
    success: ValueOrFunction<Renderable, T>
  },
  opts?: DefaultToastOptions
) => {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading })

  promise
    .then((p) => {
      toast.success(resolveValue(msgs.success, p), {
        id,
        ...opts,
        ...opts?.success,
      })
      return p
    })
    .catch((e) => {
      id && toast.dismiss(id)
    })
  return promise
}

export function promiseToast<T>(
  promise: Promise<T>,
  options: IPromiseToastMessageOptions
): Promise<T> {
  const { loading, success } = options
  return toastPromise(promise, {
    loading: t(loading || 'Loading...'),
    success: t(success || 'Successful'),
  })
}
