import { partitionApi, userRoleApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IPartitionResult } from 'types/pages/partition'
import { IPermissionResult, IUserRoleFormData } from 'types/pages/userRole'
import { SERVER_QUERY } from 'utils/config'
import { userRoleIcon } from 'utils/icons'

interface IProps {
  formData?: IUserRoleFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function UserRoleForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: permissionsIsLoading, data: permissionsData } = useSWR<
    IListServerResponse<IPermissionResult[]>
  >(
    // disabled || typeof handleInputChange === "undefined"
    //     ? null
    //     :
    userRoleApi.all_permissions
  )

  return (
    <FormCardWithHeader icon={userRoleIcon} header="User Role">
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
        name="name"
        label="Role Name"
        value={formData?.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
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
      <MultiSelect
        name="permissions_codenames"
        label="Role Pages"
        value={formData?.permissions_codenames}
        onChange={handleInputChange}
        options={permissionsData?.results.map((item) => ({
          id: item.codename,
          label: item.name,
        }))}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || permissionsIsLoading}
      />
    </FormCardWithHeader>
  )
}

export default UserRoleForm
