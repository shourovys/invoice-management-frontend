import { IFormErrors } from 'types/pages/common'
import { ISerialFormData } from 'types/pages/serial'

const validateSerialFormData = (formData: ISerialFormData): IFormErrors => {
  const errors: IFormErrors = {}
  if (!formData.name) {
    errors.name = 'Serial Name is required'
  }
  if (!formData.node?.value) {
    errors.node = 'Node is required'
  }
  if (!formData.device) {
    errors.device = 'Device is required'
  }
  if (!formData.band_rate) {
    errors.band_rate = 'Band Rate is required'
  }
  if (!formData.data_bit) {
    errors.data_bit = 'Data Bit is required'
  }
  if (!formData.stop_bit) {
    errors.stop_bit = 'Stop Bit is required'
  }
  if (!formData.parity?.value) {
    errors.parity = 'Parity is required'
  }
  if (!formData.protocol?.value) {
    errors.protocol = 'Protocol is required'
  }

  return errors
}
export default validateSerialFormData
