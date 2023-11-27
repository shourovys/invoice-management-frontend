import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IFtpFormData } from 'types/pages/ftp'
import { ftpIcon } from 'utils/icons'

interface IProps {
  formData?: IFtpFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FtpForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={ftpIcon} header="Ftp Configuration">
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
            name="path"
            label="Path"
            checked={formData?.path}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default FtpForm
