import { IFormErrors } from 'types/pages/common'
import { IFormatFormData, parityOptions } from 'types/pages/format'

const validateFormatFormData = (formData: IFormatFormData): IFormErrors => {
  const parityFields1Present =
    formData.priority_type_1?.value && formData.priority_type_1?.value !== parityOptions[0].value
  const parityFields2Present =
    formData.priority_type_2?.value && formData.priority_type_2?.value !== parityOptions[0].value

  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Format Name is required'
  }
  if (!formData.total_length) {
    errors.total_length = 'Total Length is required'
  }
  if (formData.key_format && !formData.facility_code) {
    errors.facility_code = 'Facility Code is required for Key Format'
  }
  if (formData.default_format && formData.key_format) {
    errors.default_format = 'You cannot select both Use setting and Key Format'
  }
  if (!formData.default_format && !formData.key_format) {
    errors.default_format = 'You must select either Use setting or Key Format'
  }
  if (!formData.facility_start) {
    errors.facility_start = 'Facility & Number is required'
  }
  if (!formData.number_start) {
    errors.number_start = 'Facility & Number is required'
  }
  if (!formData.facility_length) {
    errors.facility_length = 'Facility Length is required'
  }
  if (!formData.number_length) {
    errors.number_length = 'Number Length is required'
  }
  if (parityFields1Present && !formData.priority_position_1) {
    errors.priority_position_1 = 'Priority Position 1 is required'
  }
  if (parityFields1Present && !formData.priority_start_1) {
    errors.priority_start_1 = 'Priority Start 1 is required'
  }
  if (parityFields1Present && !formData.priority_length_1) {
    errors.priority_length_1 = 'Priority Length 1 is required'
  }
  if (parityFields2Present && !formData.priority_position_2) {
    errors.priority_position_2 = 'Priority Position 2 is required'
  }
  if (parityFields2Present && !formData.priority_start_2) {
    errors.priority_start_2 = 'Priority Start 2 is required'
  }
  if (parityFields2Present && !formData.priority_length_2) {
    errors.priority_length_2 = 'Priority Length 2 is required'
  }

  return errors
}
export default validateFormatFormData
