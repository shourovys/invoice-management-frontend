import { IFormErrors } from 'types/pages/common'
import { INvrFormData } from 'types/pages/nvr'

const validateNvrFormData = (formData: INvrFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'NVR Name is required'
  }
  if (!formData.type?.value) {
    errors.type = 'NVR Type is required'
  }
  if (!formData.ip_address) {
    errors.ip_address = 'IP Address is required'
  }
  if (!formData.rtsp_port) {
    errors.rtsp_port = 'RTSP Port is required'
  }
  if (!formData.data_port) {
    errors.data_port = 'Data Port is required'
  }
  if (!formData.user_id) {
    errors.user_id = 'User Id is required'
  }
  if (!formData.password) {
    errors.password = 'Password is required'
  }

  return errors
}
export default validateNvrFormData
