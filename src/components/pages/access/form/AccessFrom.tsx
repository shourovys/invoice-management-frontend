import { partitionApi, scheduleApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IAccessFormData, accessDeviceTypes } from 'types/pages/access'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IPartitionResult } from 'types/pages/partition'
import { IScheduleResult } from 'types/pages/schedule'
import { SERVER_QUERY } from 'utils/config'
import { accessIcon } from 'utils/icons'

interface IProps {
  formData: IAccessFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function AccessAccessFrom({
  formData,
  formErrors,
  handleInputChange,
  disabled,
  isLoading,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: scheduleIsLoading, data: scheduleData } = useSWR<
    IListServerResponse<IScheduleResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : scheduleApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange(name, selectedValue)
      handleInputChange('devices', [])
      handleInputChange('groups', [])
    }
  }
  return (
    <FormCardWithHeader icon={accessIcon} header="Access">
      <Selector
        name="partition"
        label="Partition"
        value={formData.partition}
        options={partitionData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || partitionIsLoading}
        error={formErrors?.partition}
      />
      <Input
        name="name"
        label="Access Name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.description}
        isLoading={isLoading}
      />
      <Selector
        name="schedule"
        label="Schedule"
        value={formData.schedule}
        options={scheduleData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || scheduleIsLoading}
        error={formErrors?.schedule}
      />
      <Selector
        name="device_type"
        label="Device Type"
        value={formData.device_type}
        options={accessDeviceTypes}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.device_type}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default AccessAccessFrom
