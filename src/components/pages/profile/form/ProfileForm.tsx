import Input from '../../../../components/atomic/Input'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import { IProfileFormData } from '../../../../types/pages/profile'
import { userIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'
import FormCardWithHeader from '../../../HOC/FormCardWithHeader'

interface IProps {
  formData?: IProfileFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function ProfileForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={userIcon} header={t`Profile`}>
      <Input
        name="UserId"
        label={t`User ID`}
        value={formData?.UserId}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.UserId}
        isLoading={isLoading}
      />
      <Input
        name="OldPassword"
        label={t`Old Password`}
        type="password"
        value={formData?.OldPassword}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.OldPassword}
        isLoading={isLoading}
      />
      <Input
        name="NewPassword"
        label={t`New Password`}
        type="password"
        value={formData?.NewPassword}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.NewPassword}
        isLoading={isLoading}
      />
      <Input
        name="ConfirmPassword"
        label={t`Confirm Password`}
        type="password"
        value={formData?.ConfirmPassword}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.ConfirmPassword}
        isLoading={isLoading}
      />
      <Input
        name="UserDesc"
        label={t`Description`}
        value={formData?.UserDesc}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.UserDesc}
        isLoading={isLoading}
      />
      <Input
        name="Email"
        label={t`Email`}
        value={formData?.Email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Email}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default ProfileForm
