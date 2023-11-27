import { IFormErrors } from 'types/pages/common'
import { IUserRoleFormData } from 'types/pages/userRole'

const validateUserRoleFormData = (formData: IUserRoleFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'User Role Name is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.permissions_codenames.length) {
    errors.permissions_codenames = 'Permissions are required'
  }

  return errors
}
export default validateUserRoleFormData
