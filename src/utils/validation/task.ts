import { IFormErrors } from 'types/pages/common'
import { ITaskFormData } from 'types/pages/task'

const validateTaskFormData = (formData: ITaskFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.name) {
    errors.name = 'Task Name is required'
  }
  if (!formData.description) {
    errors.description = 'Description is required'
  }
  if (!formData.schedule?.value) {
    errors.schedule = 'Schedule is required'
  }
  if (!formData.action_type?.value) {
    errors.action_type = 'Action Type is required'
  }
  if (!formData.select_type?.value) {
    errors.select_type = 'Select Type is required'
  }
  // if (
  //     formData.select_type?.value === taskSelectType[0].value &&
  //     !formData.groups.length
  // ) {
  //     // if Group type
  //     errors.groups = "Groups are required";
  // }
  // if (
  //     formData.select_type?.value === taskSelectType[1].value &&
  //     !formData.devices.length
  // ) {
  //     // if Individual type
  //     errors.devices = "Devices are required";
  // }
  return errors
}
export default validateTaskFormData
