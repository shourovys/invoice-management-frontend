import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IRegionFormData } from 'types/pages/region'
import { hazmatRuleIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RegionHazmatRuleForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={hazmatRuleIcon} header="Hazmat Rule">
      <SwitchButton
        name="hazmat_rule"
        label="Hazmat Rule"
        checked={formData?.hazmat_rule}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.hazmat_rule && (
          <Input
            name="hazmat_input_no"
            label="Hazmat Input No"
            type="number"
            value={formData.hazmat_input_no}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.hazmat_input_no}
          />
        )}
      </div>
      <div>
        {formData?.hazmat_rule && (
          <Input
            name="hazmat_output_no"
            label="Hazmat Output No"
            type="number"
            value={formData.hazmat_output_no}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.hazmat_output_no}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default RegionHazmatRuleForm
