import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IEmailFormData } from 'types/pages/email'
import { emailIcon } from 'utils/icons'

interface IProps {
  formData?: IEmailFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function EmailForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={emailIcon} header="Email Configuration">
      <SwitchButton
        name="is_active"
        label="Enable"
        checked={formData?.is_active}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.is_active && (
          <Input
            name="host"
            label="Server Address"
            value={formData?.host}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.host}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (
          <Input
            name="port"
            label="Server Port"
            value={formData?.port}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.port}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (
          <Input
            name="username"
            label="User ID"
            value={formData?.username}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.username}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (
          <Input
            name="password"
            type="password"
            label="Password"
            value={formData?.password}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.password}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (
          <SwitchButton
            name="tls"
            label="TLS"
            checked={formData?.tls}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (
          <Input
            name="from_email"
            label="Sender"
            value={formData?.from_email}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.from_email}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (
          <Input
            name="to_email"
            label="Receiver"
            value={formData?.to_email}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.to_email}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default EmailForm
