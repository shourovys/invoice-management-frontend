import { IFormErrors } from 'types/pages/common'
import { IGatewayFormData } from 'types/pages/gateway'

const validateGatewayFormData = (formData: IGatewayFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Gateway Name is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }
  if (!formData.ip_address) {
    errors.ip_address = 'IP Address is required'
  }
  if (!formData.api_port) {
    errors.api_port = 'API Port is required'
  }
  if (!formData.user?.value) {
    errors.user = 'User is required'
  }
  if (!formData.password) {
    errors.password = 'Password is required'
  }

  return errors
}
export default validateGatewayFormData
