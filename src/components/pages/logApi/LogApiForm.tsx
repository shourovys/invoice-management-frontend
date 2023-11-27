import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { ILogApiFormData } from 'types/pages/logApi'
import { logAPIIcon } from 'utils/icons'

interface IProps {
  formData?: ILogApiFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function LogApiForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={logAPIIcon} header="LogApi Configuration">
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
            name="endpoint"
            label="End Point"
            value={formData?.endpoint}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.endpoint}
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
          <Input
            name="site_id"
            label="Path"
            value={formData?.site_id}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.site_id}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default LogApiForm
