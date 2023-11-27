import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IRegionFormData } from 'types/pages/region'
import { antiPassbackRuleIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RegionAntiPassBackForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={antiPassbackRuleIcon} header="Anti Passback  Rule">
      <SwitchButton
        name="anti_passback_rule"
        label="Anti Passback Rule"
        checked={formData?.anti_passback_rule}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.anti_passback_rule && (
          <Input
            name="anti_passback_time"
            label="Anti Passback Time"
            type="number"
            value={formData.anti_passback_time}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.anti_passback_time}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default RegionAntiPassBackForm
