import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IProfileFormData } from 'types/pages/profile'
import { userIcon } from 'utils/icons'

interface IProps {
  formData?: IProfileFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function ProfileForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={userIcon} header="Profile">
      <Input
        name="username"
        label="User ID"
        value={formData?.username}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.username}
        isLoading={isLoading}
      />
      <Input
        name="old_password"
        label="Old Password"
        type="password"
        value={formData?.old_password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.old_password}
        isLoading={isLoading}
      />
      <Input
        name="new_password"
        label="New Password"
        type="password"
        value={formData?.new_password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.new_password}
        isLoading={isLoading}
      />
      <Input
        name="confirm_password"
        label="Confirm Password"
        type="password"
        value={formData?.confirm_password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.confirm_password}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Description"
        value={formData?.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.description}
        isLoading={isLoading}
      />
      <Input
        name="email"
        label="Email"
        value={formData?.email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.email}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default ProfileForm
