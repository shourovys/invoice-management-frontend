import { IFormErrors } from 'types/pages/common'
import { IDoorFormData } from 'types/pages/door'


const validateDoorFormData = (formData: IDoorFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Door Name is required'
  }
  if (!formData.node) {
    errors.node = 'Node is required'
  }
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  // if (!formData.in_enable && !formData.out_enable) {
  //     errors.in_enable = "Input or output must be enabled";
  //     errors.out_enable = "Input or output must be enabled";
  // }
  if (formData.in_enable && !formData.in_type?.value) {
    errors.in_type = 'Input reader type is required'
  }
  if (formData.out_enable && !formData.out_type?.value) {
    errors.out_type = 'Output reader type is required'
  }
  if (formData.rex_enable && !formData.rex_type?.value) {
    errors.rex_type = 'Rex type is required'
  }
  if (formData.contact_enable && !formData.contact_type?.value) {
    errors.contact_type = 'Contact type is required'
  }
  if (formData.propped_enable && !formData.propped_time) {
    errors.propped_time = 'Propped time is required'
  }
  if (formData.ada_time && !formData.ada_time) {
    errors.ada_time = 'ADA time is required'
  }
  if (formData.lock_type && !formData.lock_type?.value) {
    errors.lock_type = 'Lock type is required'
  }
  if (formData.unlock_time && !formData.unlock_time) {
    errors.unlock_time = 'Unlock time is required'
  }
  if (formData.ex_unlock_time && !formData.ex_unlock_time) {
    errors.ex_unlock_time = 'Extended unlock time is required'
  }
  if (formData.threats.length === 0) {
    errors.threats = 'At least one threat level is required'
  }
  if (!formData.threat_level?.value) {
    errors.threat_level = 'Threat level is required'
  }
  if (formData.anti_passback_rule_enable && !formData.anti_passback_type?.value) {
    errors.anti_passback_type = 'Anti-passback type is required'
  }
  if (formData.anti_passback_rule_enable && !formData.anti_passback_time) {
    errors.anti_passback_time = 'Anti-passback time is required'
  }
  return errors
}
export default validateDoorFormData
