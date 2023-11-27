import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INetworkFormData, networkCountryOptions } from 'types/pages/network'
import { certificateIcon } from 'utils/icons'

interface IProps {
  formData?: INetworkFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NetworkCertificateForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={certificateIcon} header="Certificate">
      <SwitchButton
        name="self_signed"
        label="Self-Signed"
        checked={formData?.self_signed}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />

      <div>
        {!formData?.self_signed && (
          <Selector
            name="country"
            label="Country"
            value={formData?.country}
            options={networkCountryOptions}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.country}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {!formData?.self_signed && (
          <Input
            name="organization"
            label="Organization"
            value={formData?.organization}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.organization}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {!formData?.self_signed && (
          <Input
            name="address2"
            label="Address 2"
            value={formData?.address2}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.address2}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {!formData?.self_signed && (
          <Input
            name="address3"
            label="Address 3"
            value={formData?.address3}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.address3}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default NetworkCertificateForm
