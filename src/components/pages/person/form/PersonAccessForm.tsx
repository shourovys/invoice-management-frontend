import { groupApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IElementsResult, IFormErrors, IListServerResponse } from 'types/pages/common'
import { IGroupResult } from 'types/pages/group'
import { IPersonFormData, personAccessOptions } from 'types/pages/person'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'

interface IProps {
  formData: IPersonFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function PersonAccessForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  // Fetch elements by type from the server
  const { isLoading: accesses_idsIsLoading, data: accesses_idsData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.access_type?.value !== 'individual' ? null : ElementsApi.list(`type=access`)
  )

  const { isLoading: groupIsLoading, data: groupData } = useSWR<
    IListServerResponse<IGroupResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.access_type?.value !== 'group'
      ? null
      : groupApi.list(`${SERVER_QUERY.selectorDataQuery}&type=access`)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange('doors_ids', [])
      handleInputChange('groups_ids', [])
      handleInputChange(name, selectedValue)
    }
  }
  return (
    <FormCardWithHeader icon={listIcon} header="Person Access" twoPart={false}>
      <Selector
        name="access_type"
        label="Select Type"
        value={formData.access_type}
        options={personAccessOptions}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.access_type}
        isLoading={isLoading}
      />
      {formData.access_type?.value !== 'individual' && (
        <MultiSelect
          name="groups_ids"
          label="Person Access"
          value={formData?.groups_ids}
          options={groupData?.results.map((item) => ({
            id: item.id.toString(),
            label: item.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={groupIsLoading}
          error={formErrors?.groups_ids}
        />
      )}

      {formData.access_type?.value === 'individual' && (
        <MultiSelect
          name="doors_ids"
          label="Person Access"
          value={formData?.doors_ids}
          options={accesses_idsData?.results.map((item) => ({
            id: item.id.toString(),
            label: item.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading || accesses_idsIsLoading}
          error={formErrors?.doors_ids}
        />
      )}
    </FormCardWithHeader>
  )
}

export default PersonAccessForm
