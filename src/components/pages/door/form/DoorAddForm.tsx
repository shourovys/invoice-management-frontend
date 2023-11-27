import { nodeApi, partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorAddFormData } from 'types/pages/door'
import { INodeResult } from 'types/pages/node'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData: IDoorAddFormData
  handleInputChange?: THandleInputChange
  formErrors: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorAddForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(partitionApi.list(SERVER_QUERY.selectorDataQuery))

  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={doorIcon} header="Door Add">
      <Selector
        name="partition"
        label="Partition"
        value={formData.partition}
        options={partitionData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        isLoading={isLoading || partitionIsLoading}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors.partition}
      />
      <Input
        name="name"
        label="Door Name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors.name}
      />
      <Input
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors.description}
      />
      <Selector
        name="node"
        label="Node"
        value={formData.node}
        options={nodeData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        isLoading={isLoading || nodeIsLoading}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors.node}
      />
      <Input
        name="port"
        label="Door Port"
        type="number"
        value={formData.port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors.port}
      />
    </FormCardWithHeader>
  )
}

export default DoorAddForm
