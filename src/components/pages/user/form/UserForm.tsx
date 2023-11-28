import { useParams } from 'react-router-dom'
import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Input from '../../../../components/atomic/Input'
import Selector from '../../../../components/atomic/Selector'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import { IUserFormData, userRoleOptions } from '../../../../types/pages/user'
import { userIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData?: IUserFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function UserForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  // Get the user ID from the router query
  const params = useParams()
  const queryId = params.id as string

  return (
    <FormCardWithHeader icon={userIcon} header={t`User`}>
      {queryId !== '1' && (
        <Selector
          name="role"
          label={t`Role`}
          value={formData?.role}
          options={userRoleOptions}
          isClearable={false}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.Role}
          isLoading={isLoading}
        />
      )}

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

      {!(disabled || typeof handleInputChange === 'undefined') && (
        <Input
          name="password"
          label={t`Password`}
          type="password"
          value={formData?.password}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.password}
          isLoading={isLoading}
        />
      )}

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

export default UserForm
