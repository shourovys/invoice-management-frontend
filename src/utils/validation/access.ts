import { IAccessFormData } from 'types/pages/access'
import { IFormErrors } from 'types/pages/common'

const validateAccessFormData = (formData: IAccessFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.name) {
    errors.name = 'Access Name is required'
  }
  if (!formData.description) {
    errors.description = 'Description is required'
  }
  if (!formData.schedule?.value) {
    errors.schedule = 'Schedule is required'
  }
  if (!formData.device_type?.value) {
    errors.device_type = 'Device Type is required'
  }
  if (!formData.select_type?.value) {
    errors.select_type = 'Select Type is required'
  }
  // if (
  //     formData.select_type?.value === accessSelectType[0].value &&
  //     !formData.groups.length
  // ) {
  //     // if Group type
  //     errors.groups = "Groups are required";
  // }
  // if (
  //     formData.select_type?.value === accessSelectType[1].value &&
  //     !formData.devices.length
  // ) {
  //     // if Individual type
  //     errors.devices = "Devices are required";
  // }
  return errors
}
export default validateAccessFormData
