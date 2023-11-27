import { faUser } from '@fortawesome/free-regular-svg-icons'
import { partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData } from 'types/pages/door'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={faUser} header="Door">
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
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="name"
        label="Door Name"
        value={formData?.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Description"
        value={formData?.description?.toString()}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {(disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="node"
            label="Node"
            value={formData?.node}
            onChange={handleInputChange}
            isLoading={isLoading}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.node}
          />
        )}
      </div>
      <div>
        {(disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="port"
            label="Door Port"
            type="number"
            value={formData?.port}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.port}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default DoorForm
