import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IRegionFormData } from 'types/pages/region'
import { regionStatusIcon } from 'utils/icons'

interface IProps {
  formData?: IRegionFormData
  handleInputChange?: THandleInputChange
  // formErrors?: IFormErrors;
  disabled?: boolean
  isLoading?: boolean
}

function RegionStatusForm({
  formData,
  handleInputChange,
  // formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={regionStatusIcon} header="Status">
      <SwitchButton
        name="deadman_stat"
        label="Deadman Stat"
        checked={formData?.deadman_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <SwitchButton
        name="hazmat_stat"
        label="Hazmat Stat"
        checked={formData?.hazmat_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default RegionStatusForm
