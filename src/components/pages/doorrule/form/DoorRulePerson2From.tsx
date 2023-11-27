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

function DoorRulePerson2From({
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
    formData.select_type_two?.value !== 'individual' ? null : ElementsApi.list(`type=person`)
  )

  const { isLoading: groupIsLoading, data: groupData } = useSWR<
    IListServerResponse<IGroupResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type_two?.value !== 'group'
      ? null
      : groupApi.list(`${SERVER_QUERY.selectorDataQuery}&type=person`)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange('devices', [])
      handleInputChange('groups_two', [])
      handleInputChange(name, selectedValue)
    }
  }

  return (
    <FormCardWithHeader icon={doorRuleIcon} header="Rule Person" twoPart={false}>
      <Selector
        name="select_type_two"
        label="Select Type"
        value={formData.select_type_two}
        options={doorRuleSelectType}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.select_type_two}
        isLoading={isLoading}
      />

      <div>
        {formData.select_type_two?.value !== 'individual' && (
          <MultiSelect
            name="groups_two"
            label="Rule Person"
            value={formData?.groups_two}
            options={groupData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={groupIsLoading}
            error={formErrors?.groups_two}
          />
        )}
      </div>

      <div>
        {formData.select_type_two?.value === 'individual' && (
          <MultiSelect
            name="persons_two"
            label="Rule Person"
            value={formData?.persons_two}
            options={personData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading || personIsLoading}
            error={formErrors?.persons_two}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default DoorRulePerson2From
