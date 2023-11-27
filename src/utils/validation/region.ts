import { IFormErrors } from 'types/pages/common'
import { IRegionFormData } from 'types/pages/region'

const validateRegionFormData = (formData: IRegionFormData): IFormErrors => {
  const errors: IFormErrors = {}

  if (!formData.name) {
    errors.name = 'Name is required'
  }

  if (
    !formData.only_muster &&
    !formData.anti_passback_rule &&
    !formData.anti_tailgate_rule &&
    !formData.occupancy_rule &&
    !formData.deadman_rule &&
    !formData.hazmat_rule
  ) {
    errors.rule = 'At least one rule must be selected'
  }

  if (formData.anti_passback_rule && !formData.anti_passback_time) {
    errors.anti_passback_time = 'Anti-passback time is required'
  }

  if (formData.deadman_rule && !formData.deadman_interval) {
    errors.deadman_interval = 'Deadman interval is required'
  }

  if (formData.hazmat_rule && !formData.hazmat_input_no) {
    errors.hazmat_input_no = 'Hazardous material input number is required'
  }

  if (formData.hazmat_rule && !formData.hazmat_output_no) {
    errors.hazmat_output_no = 'Hazardous material output number is required'
  }

  if (formData.deadman_rule && !formData.deadman_output_no) {
    errors.deadman_output_no = 'Deadman output number is required'
  }

  if (formData.occupancy_rule && !formData.occupancy_limit) {
    errors.occupancy_limit = 'Occupancy limit is required'
  }

  if (formData.reset_delay && !formData.reset_time) {
    errors.reset_time = 'Reset time is required'
  }

  // check for other required fields
  if (!formData.partition) {
    errors.partition = 'Partition is required'
  }

  return errors
}
export default validateRegionFormData
