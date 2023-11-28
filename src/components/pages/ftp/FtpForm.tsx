import FormCardWithHeader from '../../../components/HOC/FormCardWithHeader'
import Input from '../../../components/atomic/Input'
import SwitchButtonSelect from '../../../components/atomic/SelectSwitch'
import { THandleInputChange } from '../../../types/components/common'
import { IFormErrors } from '../../../types/pages/common'
import { IFtpFormData } from '../../../types/pages/ftp'
import { ftpIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

interface IProps {
  formData?: IFtpFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FtpForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={ftpIcon} header={t`Ftp Configuration`}>
      <SwitchButtonSelect
        name="Enable"
        label={t`Enable`}
        value={formData?.Enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {formData?.Enable?.value === '1' && (
          <Input
            name="ServerAddr"
            label={t`Server Address`}
            value={formData?.ServerAddr}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.ServerAddr}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.Enable?.value === '1' && (
          <Input
            name="ServerPort"
            label={t`Server Port`}
            type="number"
            value={formData?.ServerPort}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.ServerPort}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.Enable?.value === '1' && (
          <Input
            name="UserId"
            label={t`User ID`}
            value={formData?.UserId}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.UserId}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.Enable?.value === '1' && (
          <Input
            name="Password"
            type="password"
            label={t`Password`}
            value={formData?.Password}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.Password}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        {formData?.Enable?.value === '1' && (
          <Input
            name="Path"
            label={t`Path`}
            value={formData?.Path}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.Path}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default FtpForm
