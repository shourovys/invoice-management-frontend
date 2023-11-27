import { IFormErrors } from 'types/pages/common'
import { IGroupFormData } from 'types/pages/group'

const validateGroupFormData = (formData: IGroupFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Group Name is required'
  }

  return errors
}
export default validateGroupFormData
