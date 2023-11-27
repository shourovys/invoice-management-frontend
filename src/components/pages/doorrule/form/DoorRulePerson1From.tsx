import { groupApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IElementsResult, IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorRuleFormData, doorRuleSelectType } from 'types/pages/doorRule'
import { IGroupResult } from 'types/pages/group'
import { SERVER_QUERY } from 'utils/config'
import { doorRuleIcon } from 'utils/icons'

interface IProps {
  formData: IDoorRuleFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function DoorRulePerson1From({
  formData,
  formErrors,
  handleInputChange,
  disabled,
  isLoading,
}: IProps) {
  // Fetch elements by type from the server
  const { isLoading: personIsLoading, data: personData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'individual' ? null : ElementsApi.list(`type=person`)
  )

  const { isLoading: groupIsLoading, data: groupData } = useSWR<
    IListServerResponse<IGroupResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'group'
      ? null
      : groupApi.list(`${SERVER_QUERY.selectorDataQuery}&type=person`)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange('devices', [])
      handleInputChange('groups', [])
      handleInputChange(name, selectedValue)
    }
  }

  return (
    <FormCardWithHeader icon={doorRuleIcon} header="Rule Person" twoPart={false}>
      <Selector
        name="select_type"
        label="Select Type"
        value={formData.select_type}
        options={doorRuleSelectType}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.select_type}
        isLoading={isLoading}
      />

      <div>
        {formData.select_type?.value !== 'individual' && (
          <MultiSelect
            name="groups"
            label="Rule Person"
            value={formData?.groups}
            options={groupData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={groupIsLoading}
            error={formErrors?.groups}
          />
        )}
      </div>

      <div>
        {formData.select_type?.value === 'individual' && (
          <MultiSelect
            name="persons"
            label="Rule Person"
            value={formData?.persons}
            options={personData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading || personIsLoading}
            error={formErrors?.persons}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default DoorRulePerson1From
