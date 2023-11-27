import { channelApi, partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IChannelResult } from 'types/pages/channel'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IPartitionResult } from 'types/pages/partition'
import { IViewFormData } from 'types/pages/view'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IViewFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function ViewForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: channelIsLoading, data: channelData } = useSWR<
    IListServerResponse<IChannelResult[]>
  >(channelApi.list(SERVER_QUERY.selectorDataQuery))

  return (
    <FormCardWithHeader icon={doorIcon} header="View">
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
        label="View Name"
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
        name="channel_ids"
        label="View Channel"
        value={formData?.channel_ids}
        onChange={handleInputChange}
        options={channelData?.results.map((item) => ({
          id: item.id.toString(),
          label: item.name,
        }))}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || channelIsLoading}
      />
    </FormCardWithHeader>
  )
}

export default ViewForm
