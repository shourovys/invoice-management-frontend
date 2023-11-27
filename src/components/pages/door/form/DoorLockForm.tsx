import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IDoorFormData, doorLockType } from 'types/pages/door'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorLockForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={listIcon} header="Door Lock">
      <Selector
        name="lock_type"
        label="Door Lock Type"
        value={formData?.lock_type}
        options={doorLockType}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.lock_type}
        isLoading={isLoading}
      />
      <SwitchButton
        name="relock_on_open_enable"
        label="Relock On Open"
        checked={formData?.relock_on_open_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="unlock_time"
        label="Unlock Time (Sec)"
        type="number"
        value={formData?.unlock_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.unlock_time}
        isLoading={isLoading}
      />
      <SwitchButton
        name="extended_unlock_enable"
        label="Extended Unlock"
        checked={formData?.extended_unlock_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.extended_unlock_enable && (
        <Input
          name="ex_unlock_time"
          label="Extended Unlock Time (min)"
          type="number"
          value={formData?.ex_unlock_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.ex_unlock_time}
          isLoading={isLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorLockForm
