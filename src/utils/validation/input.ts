import { IFormErrors } from 'types/pages/common'
import { IInputFormData } from 'types/pages/input'

const validateInputFormData = (formData: IInputFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Name is required'
  }
  if (!formData.port) {
    errors.port = 'Port is required'
  }
  if (!formData.type?.value) {
    errors.type = 'Type is required'
  }
  if (!formData.stat) {
    errors.stat = 'Stat is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.sub_node?.value) {
    errors.sub_node = 'Subnode is required'
  }
  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }

  return errors
}
export default validateInputFormData
