import { IFormErrors } from 'types/pages/common'
import { ISubnodeFormData } from 'types/pages/subnode'

const validateSubNodeFormData = (formData: ISubnodeFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Name is required'
  }

  if (!formData.serial?.value) {
    errors.serial = 'Serial is required'
  }

  if (!formData.address) {
    errors.address = 'Address is required'
  }

  if (!formData.model?.value) {
    errors.model = 'Model is required'
  }

  return errors
}
export default validateSubNodeFormData
