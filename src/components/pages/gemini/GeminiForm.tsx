import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IGeminiFormData } from 'types/pages/gemini'
import { geminiIcon } from 'utils/icons'

interface IProps {
  formData?: IGeminiFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function GeminiForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={geminiIcon} header="Gemini Configuration">
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
            name="security_key"
            label="Security Key"
            value={formData?.security_key}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.security_key}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="address"
            label="Address"
            value={formData?.address}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.address}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (disabled || typeof handleInputChange === 'undefined') && (
          <SwitchButton
            name="online"
            label="Online"
            checked={formData?.online}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="arm_stat"
            label="Arm Status"
            value={formData?.arm_stat}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.arm_stat}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.is_active && (disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="zone_stat"
            label="Zone Status"
            value={formData?.zone_stat}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.zone_stat}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default GeminiForm
