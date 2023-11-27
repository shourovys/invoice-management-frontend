import { groupApi, partitionApi, scheduleApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IElementsResult, IFormErrors, IListServerResponse } from 'types/pages/common'
import { IGroupResult } from 'types/pages/device'
import { IPartitionResult } from 'types/pages/partition'
import { IScheduleResult } from 'types/pages/schedule'
import { ITaskFormData, taskDeviceTypes, taskSelectType } from 'types/pages/task'
import { SERVER_QUERY } from 'utils/config'
import { taskIcon } from 'utils/icons'

interface IProps {
  formData: ITaskFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function TaskFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
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

  // Fetch elements by type from the server
  const { isLoading: devicesIsLoading, data: devicesData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'individual' || !formData.action_type?.value
      ? null
      : ElementsApi.list(`type=${formData?.action_type?.value}`)
  )

  const { isLoading: groupIsLoading, data: groupData } = useSWR<
    IListServerResponse<IGroupResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'group' || !formData.action_type?.value
      ? null
      : groupApi.list(`${SERVER_QUERY.selectorDataQuery}&type=${formData.action_type?.value}`)
  )

  return (
    <FormCardWithHeader icon={taskIcon} header="Task">
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
        label="Task Name"
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
        name="action_type"
        label="Action Type"
        value={formData.action_type}
        options={taskDeviceTypes}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.action_type}
        isLoading={isLoading}
      />

      <Selector
        name="select_type"
        label="Select Type"
        value={formData.select_type}
        options={taskSelectType}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.select_type}
        isLoading={isLoading}
      />

      <SwitchButton
        name="start_only"
        label="Start Only"
        checked={formData.start_only}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />

      <div>
        {formData.select_type?.value !== 'individual' && (
          <MultiSelect
            name="groups"
            label="Task Item"
            value={formData?.groups}
            options={groupData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={
              disabled || typeof handleInputChange === 'undefined' || !formData.action_type?.value
            }
            isLoading={groupIsLoading}
          />
        )}
      </div>

      <div>
        {formData.select_type?.value === 'individual' && (
          <MultiSelect
            name="devices"
            label="Task Item"
            value={formData?.devices}
            options={devicesData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={
              disabled || typeof handleInputChange === 'undefined' || !formData.action_type?.value
            }
            isLoading={devicesIsLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default TaskFrom
