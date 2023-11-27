import { nodeApi, partitionApi, subnodeApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IInputFormData, inputTypeOptions } from 'types/pages/input'
import { INodeResult } from 'types/pages/node'
import { IPartitionResult } from 'types/pages/partition'
import { ISubnodeResult } from 'types/pages/subnode'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IInputFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function InputForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: subnodeIsLoading, data: subnodeData } = useSWR<
    IListServerResponse<ISubnodeResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : subnodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={doorIcon} header="Input">
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
        label="Input Name"
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
      <Selector
        name="sub_node"
        label="Subnode"
        value={formData?.sub_node}
        options={subnodeData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.sub_node}
        isLoading={isLoading || subnodeIsLoading}
      />

      <Input
        name="port"
        type="number"
        label="Port"
        value={formData?.port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.port}
        isLoading={isLoading}
      />
      <Selector
        name="type"
        label="Type"
        value={formData?.type}
        options={inputTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Input
        name="stat"
        type="number"
        label="Stat"
        value={formData?.stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.stat}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default InputForm
