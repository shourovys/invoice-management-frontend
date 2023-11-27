import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IRegionFormData } from 'types/pages/region'
import { deadmanRuleIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RegionDeadmanRuleForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={deadmanRuleIcon} header="Deadman Rule">
      <SwitchButton
        name="deadman_rule"
        label="Deadman Rule"
        checked={formData?.deadman_rule}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.deadman_rule && (
          <Input
            name="deadman_interval"
            label="Deadman Interval (min)"
            type="number"
            value={formData.deadman_interval}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.deadman_interval}
          />
        )}
      </div>
      <div>
        {formData?.deadman_rule && (
          <Input
            name="deadman_output_no"
            label="Deadman Output No"
            type="number"
            value={formData.deadman_output_no}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.deadman_output_no}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default RegionDeadmanRuleForm
