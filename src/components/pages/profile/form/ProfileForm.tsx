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
        name="name"
        label={t`Name`}
        value={formData?.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Input
        name="email"
        label={t`Email`}
        value={formData?.email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.email}
        isLoading={isLoading}
      />
      <Input
        name="oldPassword"
        label={t`Old Password`}
        type="password"
        value={formData?.oldPassword}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.oldPassword}
        isLoading={isLoading}
      />
      <Input
        name="newPassword"
        label={t`New Password`}
        type="password"
        value={formData?.newPassword}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.newPassword}
        isLoading={isLoading}
      />
      <Input
        name="confirmPassword"
        label={t`Confirm Password`}
        type="password"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.confirmPassword}
        isLoading={isLoading}
      />
      <Input
        name="contactNumber"
        label={t`Contact Number`}
        value={formData?.contactNumber}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.contactNumber}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default ProfileForm
