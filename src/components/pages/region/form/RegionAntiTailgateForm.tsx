import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IRegionFormData } from 'types/pages/region'
import { antiPassbackRuleIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function RegionAntiTailgateForm({ formData, handleInputChange, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={antiPassbackRuleIcon} header="Anti Passback Rule">
      <SwitchButton
        name="anti_tailgate_rule"
        label="Anti Tailgate Rule"
        checked={formData?.anti_tailgate_rule}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default RegionAntiTailgateForm
