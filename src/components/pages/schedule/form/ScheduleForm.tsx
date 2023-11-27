import { holidayApi, partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IHolidayResult } from 'types/pages/holiday'
import { IPartitionResult } from 'types/pages/partition'
import { IScheduleFormData } from 'types/pages/schedule'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IScheduleFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function ScheduleForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: holidayIsLoading, data: holidayData } = useSWR<
    IListServerResponse<IHolidayResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : holidayApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={doorIcon} header="Schedule">
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
        label="Schedule Name"
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
        name="holiday"
        label="Holiday"
        value={formData?.holiday}
        options={holidayData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.holiday}
        isLoading={isLoading || holidayIsLoading}
      />
    </FormCardWithHeader>
  )
}

export default ScheduleForm
