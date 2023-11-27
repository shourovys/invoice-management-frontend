import { IFormErrors } from 'types/pages/common'
import { IFacegateFormData } from 'types/pages/facegate'

const validateFacegateFormData = (formData: IFacegateFormData): IFormErrors => {
  const errors: IFormErrors = {}

  if (!formData.name) {
    errors.name = 'Device Name is required'
  }

  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }

  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }

  if (!formData.user?.value) {
    errors.user = 'User is required'
  }

  if (!formData.ip_address) {
    errors.ip_address = 'IP Address is required'
  }

  if (!formData.api_port) {
    errors.api_port = 'API Port is required'
  }

  if (!formData.password) {
    errors.password = 'Password is required'
  }

  if (!formData.device_id) {
    errors.device_id = 'Device ID is required'
  }

  if (!formData.open_door_way) {
    errors.open_door_way = 'Open Door Way is required'
  }

  if (!formData.verify_mode) {
    errors.verify_mode = 'Verify Mode is required'
  }

  if (!formData.face_threshold) {
    errors.face_threshold = 'Face Threshold is required'
  }

  // if (!formData.sip_gate_id) {
  //     errors.sip_gate_id = "SIP Gate ID is required";
  // }

  // if (!formData.sip_password) {
  //     errors.sip_password = "SIP Password is required";
  // }

  // if (!formData.sip_operator_id) {
  //     errors.sip_operator_id = "SIP Operator ID is required";
  // }

  // if (!formData.lock_stat) {
  //     errors.lock_stat = "Lock Stat is required";
  // }

  // if (!formData.contact_stat) {
  //     errors.contact_stat = "Contact Stat is required";
  // }

  return errors
}

export default validateFacegateFormData
