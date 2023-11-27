import { ICameraFormData } from 'types/pages/camera'
import { IFormErrors } from 'types/pages/common'

const validateCameraFormData = (formData: ICameraFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }
  if (!formData.user?.value) {
    errors.user = 'User is required'
  }
  if (!formData.name) {
    errors.name = 'Name is required'
  }
  if (formData.port === '') {
    errors.port = 'Port is required'
  }
  if (formData.main_stream === '') {
    errors.main_stream = 'Main stream is required'
  }
  if (formData.sub_stream === '') {
    errors.sub_stream = 'Sub stream is required'
  }
  if (!formData.password) {
    errors.password = 'Password is required'
  }
  if (formData.pre_time === '') {
    errors.pre_time = 'Pre time is required'
  }
  if (formData.post_time === '') {
    errors.post_time = 'Post time is required'
  }
  if (formData.min_time === '') {
    errors.min_time = 'Min time is required'
  }
  if (formData.max_time === '') {
    errors.max_time = 'Max time is required'
  }

  return errors
}
export default validateCameraFormData
