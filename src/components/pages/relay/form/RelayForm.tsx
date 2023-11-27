import { elevatorApi, nodeApi, partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IElevatorResult } from 'types/pages/elevator'
import { INodeResult } from 'types/pages/node'
import { IPartitionResult } from 'types/pages/partition'
import { IRelayFormData, relayTypeOptions } from 'types/pages/relay'
import { SERVER_QUERY } from 'utils/config'
import { relayIcon } from 'utils/icons'

interface IProps {
  formData?: IRelayFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function RelayForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
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

  const { isLoading: elevatorIsLoading, data: elevatorData } = useSWR<
    IListServerResponse<IElevatorResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : elevatorApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={relayIcon} header="Relay">
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
        label="Relay Name"
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
        name="port"
        label="Port"
        type="number"
        value={formData?.port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.port}
        isLoading={isLoading}
      />
      <Selector
        name="elevator"
        label="Elevator"
        value={formData?.elevator}
        options={elevatorData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.elevator}
        isLoading={isLoading || elevatorIsLoading}
      />
      <Selector
        name="type"
        label="Type"
        value={formData?.type}
        options={relayTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Input
        name="on_time"
        label="On Time (100ms)"
        type="number"
        value={formData?.on_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.on_time}
        isLoading={isLoading}
      />
      <Input
        name="off_time"
        label="Off Time (100ms)"
        type="number"
        value={formData?.off_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.off_time}
        isLoading={isLoading}
      />
      <Input
        name="repeat"
        label="Repeat"
        type="number"
        value={formData?.repeat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.repeat}
        isLoading={isLoading}
      />
      <Input
        name="relay_stat"
        label="Relay Stat"
        type="number"
        value={formData?.relay_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.relay_stat}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default RelayForm
