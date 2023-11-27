import { IFormErrors } from 'types/pages/common'
import { ICredentialFormData } from 'types/pages/credential'

const validateCredentialFormData = (formData: ICredentialFormData): IFormErrors => {
  const errors: IFormErrors = {}

  if (!formData.person?.value) {
    errors.person = 'Person is required'
  }
  if (!formData.format?.value) {
    errors.format = 'Format is required'
  }
  if (!formData.number) {
    errors.number = 'Credential Number is required'
  }
  if (!formData.sub_key_number) {
    errors.sub_key_number = 'Sub Key Number is required'
  }
  if (!formData.type?.value) {
    errors.type = 'Credential Type is required'
  }
  if (!formData.stat?.value) {
    errors.stat = 'Credential Stat is required'
  }
  if (!formData.select_type?.value) {
    errors.select_type = 'Select Type is required'
  }
  if (!formData.start_time) {
    errors.start_time = 'Start Time is required'
  }
  if (!formData.end_time) {
    errors.end_time = 'End Time is required'
  }
  // if (!formData.event_time) {
  //     errors.event_time = "Event Time is required";
  // }
  if (formData.select_type?.value !== 'individual' && formData.groups_ids.length === 0) {
    errors.groups_ids = 'At least one group Credential Access is required'
  }
  if (formData.select_type?.value === 'individual' && formData.accesses_ids.length === 0) {
    errors.accesses_ids = 'At least one Credential Access is required'
  }

  return errors
}
export default validateCredentialFormData
