import { LicenseCheckType } from '../types/context/auth'
import useAuth from './useAuth'
import { ISelectOption } from '../components/atomic/Selector'

const useLicenseFilter = <T extends ISelectOption>(
  data: T[],
  value_and_license_key_map: { [k: string]: LicenseCheckType }
): T[] => {
  const { has_license } = useAuth()

  return data.filter((item) => {
    const d = value_and_license_key_map[item.value]
    if (d) {
      return has_license(d)
    }
    return true
  })
}

export default useLicenseFilter
