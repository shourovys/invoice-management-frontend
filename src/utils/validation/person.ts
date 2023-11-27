import { IFormErrors } from 'types/pages/common'
import { IPersonFormData } from 'types/pages/person'

const validatePersonFormData = (formData: IPersonFormData): IFormErrors => {
  const errors: IFormErrors = {}

  if (!formData.first_name) {
    errors.first_name = 'First Name is required'
  }
  if (!formData.last_name) {
    errors.last_name = 'Last Name is required'
  }
  if (!formData.access_type?.value) {
    errors.access_type = 'Access Type is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.threat_level?.value) {
    errors.threat_level = 'Threat Level is required'
  }
  if (formData.access_type?.value === 'group' && formData.groups_ids.length === 0) {
    errors.groups_ids = 'At least one group is required'
  }
  if (formData.access_type?.value === 'individual' && formData.doors_ids.length === 0) {
    errors.doors_ids = 'At least one door is required'
  }

  return errors
}
export default validatePersonFormData
