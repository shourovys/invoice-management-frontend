import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IDoorFormData, doorAntiPassType } from 'types/pages/door'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorAntiPassBackForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={listIcon} header="Anti Passback">
      <SwitchButton
        name="anti_passback_rule_enable"
        label="Anti Passback Rule"
        checked={formData?.anti_passback_rule_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.anti_passback_rule_enable && (
        <Selector
          name="anti_passback_type"
          label="Anti Passback Type"
          value={formData?.anti_passback_type}
          options={doorAntiPassType}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.anti_passback_type}
          isLoading={isLoading}
        />
      )}
      {formData?.anti_passback_rule_enable && (
        <Input
          name="anti_passback_time"
          label="Anti Passback Time (sec)"
          type="number"
          value={formData?.anti_passback_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.anti_passback_time}
          isLoading={isLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorAntiPassBackForm
