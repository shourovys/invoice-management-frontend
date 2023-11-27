import { IFormErrors } from 'types/pages/common'
import { IOutputFormData } from 'types/pages/output'

const validateOutputFormData = (formData: IOutputFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Name is required'
  }
  if (!formData.port) {
    errors.port = 'Port is required'
  }
  if (!formData.type) {
    errors.type = 'Type is required'
  }
  if (!formData.on_time) {
    errors.on_time = 'On Time is required'
  }
  if (!formData.off_time) {
    errors.off_time = 'Off Time is required'
  }
  if (!formData.repeat) {
    errors.repeat = 'Repeat is required'
  }
  if (!formData.output_stat) {
    errors.output_stat = 'Output Stat is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  // if (!formData.node?.value) {
  //     errors.node = "Node is required";
  // }
  return errors
}
export default validateOutputFormData
