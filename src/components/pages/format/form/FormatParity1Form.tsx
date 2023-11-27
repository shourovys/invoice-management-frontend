import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IFormatFormData, parityOptions } from 'types/pages/format'
import { listIcon } from 'utils/icons'

interface IProps {
  formData: IFormatFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FormatParity1Form({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const showOtherParityFields =
    formData.priority_type_1?.value && formData.priority_type_1?.value !== parityOptions[0].value
  return (
    <FormCardWithHeader icon={listIcon} header="Parity 1">
      <Selector
        name="priority_type_1"
        label="Priority Type 1"
        value={formData.priority_type_1}
        options={parityOptions}
        onChange={handleInputChange}
        error={formErrors?.priority_type_1}
        isLoading={isLoading}
        disabled={disabled || typeof handleInputChange === 'undefined'}
      />
      <div>
        {showOtherParityFields && (
          <Input
            name="priority_position_1"
            label="Parity 1 Position"
            type="number"
            value={formData.priority_position_1}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.priority_position_1}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {showOtherParityFields && (
          <Input
            name="priority_start_1"
            label="Parity 1 Start"
            type="number"
            value={formData.priority_start_1}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.priority_start_1}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {showOtherParityFields && (
          <Input
            name="priority_length_1"
            label="Parity 1 Length"
            type="number"
            value={formData.priority_length_1}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.priority_length_1}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default FormatParity1Form
