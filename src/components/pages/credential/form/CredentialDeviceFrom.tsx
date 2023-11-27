import { groupApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IElementsResult, IFormErrors, IListServerResponse } from 'types/pages/common'
import { ICredentialFormData, credentialSelectType } from 'types/pages/credential'
import { IGroupResult } from 'types/pages/group'
import { SERVER_QUERY } from 'utils/config'
import { credentialAccessIcon } from 'utils/icons'

interface IProps {
  formData: ICredentialFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function CredentialAccessFrom({
  formData,
  formErrors,
  handleInputChange,
  disabled,
  isLoading,
}: IProps) {
  // Fetch elements by type from the server
  const { isLoading: accesses_idsIsLoading, data: accesses_idsData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'individual' ? null : ElementsApi.list(`type=access`)
  )

  const { isLoading: groupIsLoading, data: groupData } = useSWR<
    IListServerResponse<IGroupResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'group'
      ? null
      : groupApi.list(`${SERVER_QUERY.selectorDataQuery}&type=access`)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange(name, selectedValue)
      handleInputChange('accesses_ids', [])
      handleInputChange('groups_ids', [])
    }
  }

  return (
    <FormCardWithHeader icon={credentialAccessIcon} header="Credential Access" twoPart={false}>
      <Selector
        name="select_type"
        label="Select Type"
        value={formData.select_type}
        options={credentialSelectType}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.select_type}
        isLoading={isLoading}
      />

      <div>
        {formData.select_type?.value !== 'individual' && (
          <MultiSelect
            name="groups_ids"
            label="Credential Access"
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
      </div>

      <div>
        {formData.select_type?.value === 'individual' && (
          <MultiSelect
            name="accesses_ids"
            label="Credential Access"
            value={formData?.accesses_ids}
            options={accesses_idsData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading || accesses_idsIsLoading}
            error={formErrors?.accesses_ids}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default CredentialAccessFrom
