import { partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import DateInput from 'components/atomic/DateInput'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleDateChange, THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IHolidayFormData } from 'types/pages/holiday'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'
import { holidayIcon } from 'utils/icons'

interface IProps {
  formData?: IHolidayFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function HolidayForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const handleDateChange: THandleDateChange = (name, value) => {
    if (handleInputChange) {
      handleInputChange('start_time', value?.startDate)
      handleInputChange('end_time', value?.endDate)
    }
  }

  return (
    <FormCardWithHeader icon={holidayIcon} header="Holiday">
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
        label="Holiday Name"
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
      <DateInput
        name="Start & End Time"
        label="Start & End Time"
        singleDate={false}
        value={{
          startDate: formData?.start_time ? formData?.start_time : null,
          endDate: formData?.end_time ? formData?.end_time : null,
        }}
        onChange={handleDateChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.start_time}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default HolidayForm
