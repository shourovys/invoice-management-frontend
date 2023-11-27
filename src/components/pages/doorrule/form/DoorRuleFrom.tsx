import { doorApi, partitionApi, scheduleApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorResult } from 'types/pages/door'
import { IDoorRuleFormData, doorRuleType } from 'types/pages/doorRule'
import { IPartitionResult } from 'types/pages/partition'
import { IScheduleResult } from 'types/pages/schedule'
import { SERVER_QUERY } from 'utils/config'
import { doorRuleIcon } from 'utils/icons'

interface IProps {
  formData: IDoorRuleFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function DoorRuleFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
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

  const { isLoading: doorIsLoading, data: doorData } = useSWR<IListServerResponse<IDoorResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : doorApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={doorRuleIcon} header="DoorRule">
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
        label="DoorRule Name"
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
        name="type"
        label="Rule Type"
        value={formData.type}
        options={doorRuleType}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      {(formData.type?.value === '2' || formData.type?.value === '4') && (
        <Input
          name="card_time"
          label="Card Time"
          type="number"
          value={formData.card_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.card_time}
          isLoading={isLoading}
        />
      )}
      <Selector
        name="door"
        label="Door"
        value={formData.door}
        options={doorData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.door}
        isLoading={isLoading || doorIsLoading}
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
    </FormCardWithHeader>
  )
}

export default DoorRuleFrom
