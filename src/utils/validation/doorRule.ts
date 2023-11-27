import { IFormErrors } from 'types/pages/common'
import { IDoorRuleFormData } from 'types/pages/doorRule'


const validateDoorRuleFormData = (formData: IDoorRuleFormData): IFormErrors => {
  const isPersonRuleTwo = 'Two Person Rule'
  const errors: IFormErrors = {}
  if (!formData.partition?.value) {
    errors.partition = 'Partition is required'
  }
  if (!formData.schedule?.value) {
    errors.schedule = 'Schedule is required'
  }
  if (!formData.door?.value) {
    errors.door = 'Door is required'
  }
  if (!formData.name) {
    errors.name = 'Name is required'
  }
  if (!formData.select_type?.value) {
    errors.select_type = 'Person Select is required'
  }
  if (formData.type?.label === isPersonRuleTwo && !formData.select_type_two?.value) {
    errors.select_type_two = 'Person Select 2 is required'
  }
  if (!formData.type?.value) {
    errors.type = 'Rule Type is required'
  }
  if (
    formData.type?.value &&
    formData.select_type?.value === 'individual' &&
    !formData.persons.length
  ) {
    errors.persons = 'At least one Person Rule is required'
  }
  if (
    formData.type?.value &&
    formData.select_type?.value !== 'individual' &&
    !formData.groups.length
  ) {
    errors.groups = 'At least one Person Rule is required.'
  }
  if (
    formData.type?.label === isPersonRuleTwo &&
    formData.select_type_two?.value === 'individual' &&
    !formData.persons_two.length
  ) {
    errors.persons_two = 'At least one Person Two Rule is required'
  }
  if (
    formData.type?.label === isPersonRuleTwo &&
    formData.select_type_two?.value !== 'individual' &&
    !formData.groups_two.length
  ) {
    errors.groups_two = 'At least one Person Two Rule is required'
  }

  if ((formData.type?.value === '2' || formData.type?.value === '4') && !formData.card_time) {
    errors.card_time = 'Card time is required'
  }

  return errors
}
export default validateDoorRuleFormData
