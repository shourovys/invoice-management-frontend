import { IFormErrors } from 'types/pages/common'
import { ILocksetFormData } from '../../types/pages/lockset'

const validateLocksetFormData = (formData: ILocksetFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Device name is required'
  }
  if (!formData.link_id) {
    errors.link_id = 'Link ID is required'
  }
  if (!formData.device_id) {
    errors.device_id = 'Device ID is required'
  }
  if (!formData.model) {
    errors.model = 'Model is required'
  }
  if (!formData.lock_stat) {
    errors.lock_stat = 'Lock status is required'
  }
  if (!formData.contact_stat) {
    errors.contact_stat = 'Contact status is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.gateway?.value) {
    errors.gateway = 'Gateway is required'
  }
  return errors
}
export default validateLocksetFormData
