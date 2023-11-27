import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IFormatFormData } from 'types/pages/format'
import { listIcon } from 'utils/icons'

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
  return (
    <FormCardWithHeader icon={listIcon} header="Facility & Number">
      <Input
        name="facility_start"
        label="Facility Start"
        type="number"
        value={formData.facility_start}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.facility_start}
        isLoading={isLoading}
      />

      <Input
        name="facility_length"
        label="Facility Length"
        type="number"
        value={formData.facility_length}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.facility_length}
        isLoading={isLoading}
      />

      <Input
        name="number_start"
        label="Number Start"
        type="number"
        value={formData.number_start}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.number_start}
        isLoading={isLoading}
      />

      <Input
        name="number_length"
        label="Number Length"
        type="number"
        value={formData.number_length}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.number_length}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default FormatFacilityNumberForm
