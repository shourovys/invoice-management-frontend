import { IFormErrors } from 'types/pages/common'
import { IElevatorFormData } from 'types/pages/elevator'

const validateElevatorFormData = (formData: IElevatorFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Elevator Name is required'
  }
  if (!formData.reader_type?.value) {
    errors.reader_type = 'Reader Type is required'
  }
  if (!formData.threat_level?.value) {
    errors.threat_level = 'Threat Level is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }
  if (!formData.threat?.value) {
    errors.threat = 'Threat is required'
  }
  if (!formData.elevator_stat) {
    errors.elevator_stat = 'Elevator Status is required'
  }

  return errors
}
export default validateElevatorFormData
