import FormCardWithHeader from '../../../components/HOC/FormCardWithHeader'
import Input from '../../../components/atomic/Input'
import Selector from '../../../components/atomic/Selector'
import { THandleInputChange } from '../../../types/components/common'
import { IFormErrors, booleanSelectOption } from '../../../types/pages/common'
import { INetworkFormData } from '../../../types/pages/network'
import { networkIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

interface IProps {
  formData?: INetworkFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NetworkForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={networkIcon} header={t`Network`}>
      <Selector
        name="Dhcp"
        label={t`DHCP`}
        value={formData?.Dhcp}
        options={booleanSelectOption}
        isClearable={false}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Dhcp}
        isLoading={isLoading}
      />
      <Input
        name="Address"
        label={t`Address`}
        value={formData?.Address}
        onChange={handleInputChange}
        disabled={
          disabled || typeof handleInputChange === 'undefined' || formData?.Dhcp?.value === '1'
        }
        error={formErrors?.Address}
        isLoading={isLoading}
      />
      {formData?.Dhcp?.value === '0' && (
        <Input
          name="Netmask"
          label={t`Netmask`}
          value={formData?.Netmask}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.Netmask}
          isLoading={isLoading}
        />
      )}
      {formData?.Dhcp?.value === '0' && (
        <Input
          name="Gateway"
          label={t`Gateway`}
          value={formData?.Gateway}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.Gateway}
          isLoading={isLoading}
        />
      )}
      <Input
        name="Dns1"
        label={t`DNS1`}
        value={formData?.Dns1}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Dns1}
        isLoading={isLoading}
      />
      <Input
        name="Dns2"
        label={t`DNS2`}
        value={formData?.Dns2}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Dns2}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default NetworkForm
