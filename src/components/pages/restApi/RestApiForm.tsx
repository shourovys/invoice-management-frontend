import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import IconButton from 'components/atomic/IconButton'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IRestApiFormData } from 'types/pages/restApi'
import { resetIcon, restAPIIcon } from 'utils/icons'

function generateRandomString(): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomIndices = Array.from({ length: 16 }, () => Math.floor(Math.random() * charset.length))
  return randomIndices.map((index) => charset[index]).join('')
}

interface IProps {
  formData?: IRestApiFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RestApiForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={restAPIIcon} header="RestApi Configuration">
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
          <div className="flex items-end gap-2">
            <Input
              name="api_key"
              label="API key"
              value={formData?.api_key}
              onChange={handleInputChange}
              disabled={disabled || typeof handleInputChange === 'undefined'}
              error={formErrors?.api_key}
              isLoading={isLoading}
            />

            {typeof handleInputChange !== 'undefined' && (
              <IconButton
                icon={resetIcon}
                tooltip="Generate"
                iconClass="mb-.5"
                onClick={() => {
                  handleInputChange('api_key', generateRandomString())
                }}
              />
            )}
          </div>
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default RestApiForm
