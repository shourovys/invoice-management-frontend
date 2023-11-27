import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
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

function DoorContactForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={listIcon} header="Door Contact">
      <SwitchButton
        name="contact_enable"
        checked={formData?.contact_enable}
        onChange={handleInputChange}
        label="Door Contact Enable"
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.contact_enable && (
        <Selector
          name="contact_type"
          label="Door Contact Type"
          value={formData?.contact_type}
          onChange={handleInputChange}
          options={doorRexAndContactType}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.contact_type}
          isLoading={isLoading}
        />
      )}
      {formData?.contact_enable && (
        <Input
          name="propped_time"
          label="Propped Time (sec)"
          value={formData?.propped_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.propped_time}
          isLoading={isLoading}
        />
      )}
      {formData?.contact_enable && (
        <Input
          name="ada_time"
          label="ADA Time (sec)"
          value={formData?.ada_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.ada_time}
          isLoading={isLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorContactForm
