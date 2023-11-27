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

function FormatParity2Form({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const showOtherParityFields =
    formData.priority_type_2?.value && formData.priority_type_2?.value !== parityOptions[0].value
  return (
    <FormCardWithHeader icon={listIcon} header="Parity 2">
      <Selector
        name="priority_type_2"
        label="Parity 2 Type"
        options={parityOptions}
        value={formData.priority_type_2}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.priority_type_2}
        isLoading={isLoading}
      />
      <div>
        {showOtherParityFields && (
          <Input
            name="priority_position_2"
            label="Parity 2 Position"
            type="number"
            value={formData.priority_position_2}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.priority_position_2}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {showOtherParityFields && (
          <Input
            name="priority_start_2"
            label="Parity 2 Start"
            type="number"
            value={formData.priority_start_2}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.priority_start_2}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {showOtherParityFields && (
          <Input
            name="priority_length_2"
            label="Parity 2 Length"
            type="number"
            value={formData.priority_length_2}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.priority_length_2}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default FormatParity2Form
