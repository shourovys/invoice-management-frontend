import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INetworkFormData } from 'types/pages/network'
import { wifiIcon } from 'utils/icons'

interface IProps {
  formData?: INetworkFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NetworkWifiForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={wifiIcon} header="Network">
      <SwitchButton
        name="wifi"
        label="WIFI"
        checked={formData?.wifi}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.wifi && (
          <Input
            name="ssid"
            type="number"
            label="SSID"
            value={formData?.ssid}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.ssid}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.wifi && (
          <Input
            name="secu_key"
            type="number"
            label="Password"
            value={formData?.secu_key}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.secu_key}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default NetworkWifiForm
