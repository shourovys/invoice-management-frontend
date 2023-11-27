import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IFormatFormData } from 'types/pages/format'
import { formatIcon } from 'utils/icons'

interface IProps {
  formData: IFormatFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FormatForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={formatIcon} header="Format">
      <Input
        name="name"
        label="Format Name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.description}
        isLoading={isLoading}
      />
      <Input
        name="total_length"
        label="Total Length"
        type="number"
        value={formData.total_length}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.total_length}
        isLoading={isLoading}
      />
      <Input
        name="facility_code"
        label="Facility Code"
        type="number"
        value={formData.facility_code}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.facility_code}
        isLoading={isLoading}
      />

      <div className="flex items-center justify-between">
        <SwitchButton
          name="key_format"
          label="Key Format"
          checked={formData.key_format}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading}
        />
        <SwitchButton
          name="default_format"
          label="Default Format"
          checked={formData.default_format}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading}
        />
      </div>
    </FormCardWithHeader>
  )
}

export default FormatForm
