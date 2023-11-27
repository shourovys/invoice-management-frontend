import { partitionApi, personApi, userRoleApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IPartitionResult } from 'types/pages/partition'
import { IPersonResult } from 'types/pages/person'
import { IUserFormData } from 'types/pages/user'
import { IUserRoleResult } from 'types/pages/userRole'
import { SERVER_QUERY } from 'utils/config'
import { userIcon } from 'utils/icons'

interface IProps {
  formData?: IUserFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function UserForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: roleIsLoading, data: roleData } = useSWR<
    IListServerResponse<IUserRoleResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : userRoleApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: personIsLoading, data: personData } = useSWR<
    IListServerResponse<IPersonResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : personApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={userIcon} header="User">
      <Selector
        name="partition"
        label="Partition"
        value={formData?.partition}
        options={partitionData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.partition}
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="username"
        label="User ID"
        value={formData?.username}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.username}
        isLoading={isLoading}
      />
      {!(disabled || typeof handleInputChange === 'undefined') && (
        <Input
          name="password"
          label="Password"
          type="password"
          value={formData?.password}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.password}
          isLoading={isLoading}
        />
      )}
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
      <Selector
        name="person"
        label="Person"
        value={formData?.person}
        options={personData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.last_name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.person}
        isLoading={isLoading || personIsLoading}
      />
      <Selector
        name="role"
        label="User Role"
        value={formData?.role}
        options={roleData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.role}
        isLoading={isLoading || roleIsLoading}
      />
    </FormCardWithHeader>
  )
}

export default UserForm
