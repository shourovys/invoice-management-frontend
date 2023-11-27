import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INetworkFormData } from 'types/pages/network'
import { cloudIcon } from 'utils/icons'

interface IProps {
  formData?: INetworkFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NetworkCloudForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={cloudIcon} header="Cloud">
      <SwitchButton
        name="cloud"
        label="Cloud"
        checked={formData?.cloud}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {!formData?.cloud && (
          <Input
            name="cloud_addr"
            label="Cloud Address"
            value={formData?.cloud_addr}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.cloud_addr}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {!formData?.cloud && (
          <Input
            name="cloud_port"
            type="number"
            label="Cloud Port"
            value={formData?.cloud_port}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.cloud_port}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {!formData?.cloud && (
          <Input
            name="site_no"
            type="number"
            label="Site No"
            value={formData?.site_no}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.site_no}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {!formData?.cloud && (
          <Input
            name="site_key"
            type="number"
            label="Site Key"
            value={formData?.site_key}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.site_key}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default NetworkCloudForm
