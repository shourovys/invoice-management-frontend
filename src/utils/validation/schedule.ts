import { IFormErrors } from 'types/pages/common'
import { IScheduleFormData } from 'types/pages/schedule'

const validateScheduleFormData = (formData: IScheduleFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Schedule Name is required'
  }

  return errors
}
export default validateScheduleFormData
