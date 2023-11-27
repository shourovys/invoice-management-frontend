import { gatewayApi, partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IGatewayResult } from 'types/pages/gateway'
import { ILocksetFormData } from '../../../../types/pages/lockset'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'
import { locksetIcon } from 'utils/icons'

interface IProps {
  formData?: ILocksetFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function LocksetForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: gatewayIsLoading, data: gatewayData } = useSWR<
    IListServerResponse<IGatewayResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : gatewayApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={locksetIcon} header="Device">
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
        label="Lockset Name"
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
        name="gateway"
        label="Gateway"
        value={formData?.gateway}
        options={gatewayData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.gateway}
        isLoading={isLoading || gatewayIsLoading}
      />

      <Input
        name="link_id"
        label="Link ID"
        type="number"
        value={formData?.link_id}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.link_id}
        isLoading={isLoading}
      />
      <Input
        name="model"
        label="Model"
        value={formData?.model}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.model}
        isLoading={isLoading}
      />
      <Input
        name="device_id"
        label="Device ID"
        type="number"
        value={formData?.device_id}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.device_id}
        isLoading={isLoading}
      />
      <Input
        name="lock_stat"
        label="Lock Stat"
        type="number"
        value={formData?.lock_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.lock_stat}
        isLoading={isLoading}
      />
      <Input
        name="contact_stat"
        label="Contact Start"
        type="number"
        value={formData?.contact_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.contact_stat}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default LocksetForm
