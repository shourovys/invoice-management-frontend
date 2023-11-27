import { partitionApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IElementsResult, IFormErrors, IListServerResponse } from 'types/pages/common'
import { IGroupFormData, groupTypes } from 'types/pages/group'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IGroupFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function GroupForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  // Fetch elements by type from the server
  const { isLoading: group_object_idsIsLoading, data: group_object_idsData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    !formData?.type?.value
      ? // ||
        //     disabled ||
        //     typeof handleInputChange === "undefined"
        null
      : ElementsApi.list(`type=${formData?.type?.value}`)
  )

  // call handleInputChange with reset group_object_ids when type changes
  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange(name, selectedValue)
      handleInputChange('group_object_ids', [])
    }
  }
  return (
    <FormCardWithHeader icon={doorIcon} header="Group">
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
        label="Group Name"
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
        name="type"
        label="Group Type"
        value={formData?.type}
        options={groupTypes}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
      />

      <MultiSelect
        name="group_object_ids"
        label="Group Item"
        value={formData?.group_object_ids}
        onChange={handleInputChange}
        options={group_object_idsData?.results.map((item) => ({
          id: item.id.toString(),
          label: item.name,
        }))}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || group_object_idsIsLoading}
      />
    </FormCardWithHeader>
  )
}

export default GroupForm
