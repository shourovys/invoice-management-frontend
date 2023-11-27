import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IRegionFormData } from 'types/pages/region'
import { occupancyRuleIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RegionOccupancyForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={occupancyRuleIcon} header="Occupancy Rule">
      <SwitchButton
        name="occupancy_rule"
        label="Occupancy Rule"
        checked={formData?.occupancy_rule}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.occupancy_rule && (
          <Input
            name="occupancy_limit"
            label="Occupancy Limit"
            type="number"
            value={formData.occupancy_limit}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.occupancy_limit}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default RegionOccupancyForm
