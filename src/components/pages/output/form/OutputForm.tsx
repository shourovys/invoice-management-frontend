import { partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IOutputFormData, outputTypeOptions } from 'types/pages/output'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IOutputFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function OutputForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  // const { isLoading: nodeIsLoading, data: nodeData } = useSWR<
  //     IListServerResponse<INodeResult[]>
  // >(
  //     disabled || typeof handleInputChange === "undefined"
  //         ? null
  //         : nodeApi.list(SERVER_QUERY.selectorDataQuery),
  // );

  return (
    <FormCardWithHeader icon={doorIcon} header="Output">
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
        label="Output Name"
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
      {/* <Selector
                name="node"
                label="Node"
                value={formData?.node}
                options={nodeData?.results.map(result => ({
                    value: result.id.toString(),
                    label: result.name,
                }))}
                onChange={handleInputChange}
                disabled={disabled || typeof handleInputChange === "undefined"}
                error={formErrors?.node}
                isLoading={isLoading || nodeIsLoading}
            /> */}

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
        options={outputTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Input
        name="on_time"
        type="number"
        label="On Time"
        value={formData?.on_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.on_time}
        isLoading={isLoading}
      />
      <Input
        name="off_time"
        type="number"
        label="Off Time"
        value={formData?.off_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.off_time}
        isLoading={isLoading}
      />
      <Input
        name="repeat"
        type="number"
        label="Repeat"
        value={formData?.repeat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.repeat}
        isLoading={isLoading}
      />
      <Input
        name="output_stat"
        type="number"
        label="Output Status"
        value={formData?.output_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.output_stat}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default OutputForm
