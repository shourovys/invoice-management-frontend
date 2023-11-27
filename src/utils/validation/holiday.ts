import { IFormErrors } from 'types/pages/common'
import { IHolidayFormData } from 'types/pages/holiday'

const validateHolidayFormData = (formData: IHolidayFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Name is required'
  }
  if (!formData.partition) {
    errors.partition = 'Partition is required'
  }
  if (!formData.start_time) {
    errors.start_time = 'Start time is required'
  }
  if (!formData.end_time) {
    errors.end_time = 'End time is required'
  }

  return errors
}
export default validateHolidayFormData
