import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IDoorFormData, doorRexAndContactType } from 'types/pages/door'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorRexForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={listIcon} header="Door Rex">
      <SwitchButton
        name="rex_enable"
        checked={formData?.rex_enable}
        onChange={handleInputChange}
        label="Door Rex Enable"
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.rex_enable && (
        <Selector
          name="rex_type"
          label="Door Rex Type"
          value={formData?.rex_type}
          onChange={handleInputChange}
          options={doorRexAndContactType}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.rex_type}
          isLoading={isLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorRexForm
