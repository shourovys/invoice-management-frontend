import { nodeApi, partitionApi, userApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import {
  IFacegateFormData,
  facegateOpenDoorWayOptions,
  facegateVerifyModeOptions,
} from 'types/pages/facegate'
import { INodeResult } from 'types/pages/node'
import { IPartitionResult } from 'types/pages/partition'
import { IUserResult } from 'types/pages/user'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IFacegateFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FacegateForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: userIsLoading, data: userData } = useSWR<IListServerResponse<IUserResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : userApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={doorIcon} header="Facegate">
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
        label="Facegate Name"
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
      <Selector
        name="node"
        label="Node"
        value={formData?.node}
        options={nodeData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.node}
        isLoading={isLoading || nodeIsLoading}
      />
      <Input
        name="ip_address"
        label="IP Address"
        value={formData?.ip_address}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.ip_address}
        isLoading={isLoading}
      />
      <Input
        name="api_port"
        type="number"
        label="API Port"
        value={formData?.api_port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.api_port}
        isLoading={isLoading}
      />
      <Selector
        name="user"
        label="User ID"
        value={formData?.user}
        options={userData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.username,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.user}
        isLoading={isLoading || userIsLoading}
      />
      <Input
        name="password"
        label="Password"
        value={formData?.password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.password}
        isLoading={isLoading}
      />
      <Input
        name="device_id"
        type="number"
        label="Device ID"
        value={formData?.device_id}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.device_id}
        isLoading={isLoading}
      />
      <Input
        name="face_threshold"
        type="number"
        label="Face Threshold"
        value={formData?.face_threshold}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.face_threshold}
        isLoading={isLoading}
      />
      <Selector
        name="open_door_way"
        label="Open Door Way"
        value={formData?.open_door_way}
        options={facegateOpenDoorWayOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.open_door_way}
        isLoading={isLoading}
      />
      <Selector
        name="verify_mode"
        label="Verify Mode"
        value={formData?.verify_mode}
        options={facegateVerifyModeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.verify_mode}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default FacegateForm
