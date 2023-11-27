import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IRegionFormData } from 'types/pages/region'
import { antiTailgateRuleIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RegionResetDailyForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={antiTailgateRuleIcon} header="Reset Daily">
      {/* <SwitchButton
                name="reset_delay"
                label="Reset Daily"
                checked={formData?.reset_delay}
                onChange={handleInputChange}
                disabled={disabled || typeof handleInputChange === "undefined"}
                isLoading={isLoading}
            /> */}
      <Input
        name="reset_delay"
        label="Reset Daily"
        type="number"
        value={formData?.reset_delay}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
        error={formErrors?.reset_delay}
      />
      <div>
        {formData?.reset_delay && (
          <Input
            name="reset_time"
            label="Reset Time"
            type="number"
            value={formData?.reset_time}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.reset_time}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default RegionResetDailyForm
