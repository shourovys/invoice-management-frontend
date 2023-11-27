import { IFormErrors } from 'types/pages/common'
import { IRelayFormData } from 'types/pages/relay'

const validateRelayFormData = (formData: IRelayFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Relay Name is required'
  }
  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.port) {
    errors.port = 'Port is required'
  } else if (Number.isNaN(Number(formData.port))) {
    errors.port = 'Port must be a number'
  }
  if (!formData.type?.value) {
    errors.type = 'Type is required'
  }
  if (!formData.on_time) {
    errors.on_time = 'On Time is required'
  } else if (Number.isNaN(Number(formData.on_time))) {
    errors.on_time = 'On Time must be a number'
  }
  if (!formData.off_time) {
    errors.off_time = 'Off Time is required'
  } else if (Number.isNaN(Number(formData.off_time))) {
    errors.off_time = 'Off Time must be a number'
  }
  if (!formData.repeat) {
    errors.repeat = 'Repeat is required'
  } else if (Number.isNaN(Number(formData.repeat))) {
    errors.repeat = 'Repeat must be a number'
  }
  if (!formData.relay_stat) {
    errors.relay_stat = 'Relay Stat is required'
  } else if (Number.isNaN(Number(formData.relay_stat))) {
    errors.relay_stat = 'Relay Stat must be a number'
  }

  return errors
}
export default validateRelayFormData
