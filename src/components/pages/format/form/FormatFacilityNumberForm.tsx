import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Input from '../../../../components/atomic/Input'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import { IFormatFormData } from '../../../../types/pages/format'
import { binaryToDecimal, getValidSubBinary } from '../../../../utils/binaryToDecimal'
import { listIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData: IFormatFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FormatFacilityNumberForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  // Update the FacilityCode data when FacilityStart & FacilityLength input changes
  const handleFacilityChange = (name: string, value: string) => {
    if (handleInputChange) {
      let validSubBinary: string | null
      let facilityStart = Number(formData.FacilityStart)
      let facilityLength = Number(formData.FacilityLength)

      if (name === 'FacilityStart') {
        facilityStart = Number(value)
      } else if (name === 'FacilityLength') {
        facilityLength = Number(value)
      }

      validSubBinary = getValidSubBinary(formData.CardData, facilityStart, facilityLength)

      if (validSubBinary) {
        handleInputChange('FacilityStart', String(facilityStart))
        handleInputChange('FacilityLength', String(facilityLength))
        handleInputChange('FacilityCode', binaryToDecimal(validSubBinary))
      } else {
        handleInputChange(name, value)
      }
    }
  }
  // Update the CardNumber data when NumberStart & NumberLength input changes
  const handleNumberChange = (name: string, value: string) => {
    if (handleInputChange) {
      let validSubBinary: string | null
      let numberStart = Number(formData.NumberStart)
      let numberLength = Number(formData.NumberLength)

      if (name === 'NumberStart') {
        numberStart = Number(value)
      } else if (name === 'NumberLength') {
        numberLength = Number(value)
      }

      validSubBinary = getValidSubBinary(formData.CardData, numberStart, numberLength)

      if (validSubBinary) {
        handleInputChange('NumberStart', String(numberStart))
        handleInputChange('NumberLength', String(numberLength))
        handleInputChange('CardNumber', binaryToDecimal(validSubBinary))
      } else {
        handleInputChange(name, value)
      }
    }
  }

  return (
    <FormCardWithHeader icon={listIcon} header={t`Facility & Number`}>
      <Input
        name="FacilityStart"
        label={t`Facility Start`}
        type="number"
        value={formData.FacilityStart}
        onChange={handleFacilityChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.FacilityStart}
        isLoading={isLoading}
      />

      <Input
        name="FacilityLength"
        label={t`Facility Length`}
        type="number"
        value={formData.FacilityLength}
        onChange={handleFacilityChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.FacilityLength}
        isLoading={isLoading}
      />

      <Input
        name="NumberStart"
        label={t`Number Start`}
        type="number"
        value={formData.NumberStart}
        onChange={handleNumberChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.NumberStart}
        isLoading={isLoading}
      />

      <Input
        name="NumberLength"
        label={t`Number Length`}
        type="number"
        value={formData.NumberLength}
        onChange={handleNumberChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.NumberLength}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default FormatFacilityNumberForm
