import { nodeApi, partitionApi, userApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { ICameraFormData } from 'types/pages/camera'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { INodeResult } from 'types/pages/node'
import { IPartitionResult } from 'types/pages/partition'
import { IUserResult } from 'types/pages/user'
import { SERVER_QUERY } from 'utils/config'
import { cameraIcon } from 'utils/icons'

interface IProps {
  formData?: ICameraFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function CameraForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
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
    <FormCardWithHeader icon={cameraIcon} header="Camera">
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
        label="Camera Name"
        value={formData?.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Camera Description"
        value={formData?.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
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
        name="port"
        label="Camera Port"
        value={formData?.port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.port}
        isLoading={isLoading}
      />
      <Input
        name="main_stream"
        label="Main URL"
        value={formData?.main_stream}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.main_stream}
        isLoading={isLoading}
      />
      <Input
        name="sub_stream"
        label="Sub URL"
        value={formData?.sub_stream}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.sub_stream}
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
        type="password"
        error={formErrors?.password}
        isLoading={isLoading}
      />
      <Input
        name="pre_time"
        label="Pre-Event Record Time (sec)"
        value={formData?.pre_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.pre_time}
        isLoading={isLoading}
      />
      <Input
        name="post_time"
        label="Post-Event Record Time (sec)"
        value={formData?.post_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.post_time}
        isLoading={isLoading}
      />
      <Input
        name="min_time"
        label="Minimum Time (day)"
        value={formData?.min_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.min_time}
        isLoading={isLoading}
      />
      <Input
        name="max_time"
        label="Maximum Time (day)"
        value={formData?.max_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.max_time}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default CameraForm
