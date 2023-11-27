import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IMiscellaneousFormData } from 'types/pages/miscellaneous'
import { miscellaneousIcon } from 'utils/icons'

interface IProps {
  formData?: IMiscellaneousFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function MiscellaneousForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={miscellaneousIcon} header="Miscellaneous Configuration">
      <Input
        name="date_format"
        label="Date Format"
        value={formData?.date_format}
        onChange={handleInputChange}
        disabled
        error={formErrors?.date_format}
        isLoading={isLoading}
      />
      <Input
        name="time_format"
        label="Time Format"
        value={formData?.time_format}
        onChange={handleInputChange}
        disabled
        error={formErrors?.time_format}
        isLoading={isLoading}
      />
      <Input
        name="latitude"
        label="Latitude"
        value={formData?.latitude}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.latitude}
        isLoading={isLoading}
      />
      <Input
        name="longitude"
        label="Longitude"
        value={formData?.longitude}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.longitude}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default MiscellaneousForm
