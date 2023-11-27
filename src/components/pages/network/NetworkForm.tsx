import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INetworkFormData } from 'types/pages/network'
import { networkIcon } from 'utils/icons'

interface IProps {
  formData?: INetworkFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NetworkForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={networkIcon} header="Network">
      <Selector
        name="dhcp"
        label="DHCP"
        value={formData?.dhcp}
        options={[
          { label: 'Enabled', value: 'true' },
          { label: 'Disabled', value: 'false' },
        ]}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.dhcp}
        isLoading={isLoading}
      />
      <Input
        name="address"
        label="Address"
        value={formData?.address}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.address}
        isLoading={isLoading}
      />
      <Input
        name="netmask"
        label="Netmask"
        value={formData?.netmask}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.netmask}
        isLoading={isLoading}
      />
      <Input
        name="gateway"
        label="Gateway"
        value={formData?.gateway}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.gateway}
        isLoading={isLoading}
      />
      <Input
        name="dns1"
        label="DNS1"
        value={formData?.dns1}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.dns1}
        isLoading={isLoading}
      />
      <Input
        name="dns2"
        label="DNS2"
        value={formData?.dns2}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.dns2}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default NetworkForm
