import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INetworkFormData } from 'types/pages/network'
import { masterIcon } from 'utils/icons'

interface IProps {
  formData?: INetworkFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NetworkMasterForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={masterIcon} header="Master">
      <Input
        name="master_addr"
        label="Master Address"
        value={formData?.master_addr}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.master_addr}
        isLoading={isLoading}
      />
      <Input
        name="master_port"
        type="number"
        label="Master Port"
        value={formData?.master_port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.master_port}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default NetworkMasterForm
