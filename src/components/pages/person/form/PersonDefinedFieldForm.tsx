import { definedFieldApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDefinedFieldResult } from 'types/pages/definedField'
import { IPersonFormData } from 'types/pages/person'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'
import PersonDefinedFieldInputs from './PersonDefinedFieldInputs'

interface IProps {
  formData?: IPersonFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function PersonDefinedFieldForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const { isLoading: definedFieldIsLoading, data: definedFieldData } = useSWR<
    IListServerResponse<IDefinedFieldResult[]>
  >(definedFieldApi.list(SERVER_QUERY.selectorDataQuery))

  return (
    <FormCardWithHeader icon={listIcon} header="Defined Field">
      {definedFieldData?.results?.map((item) => (
        <PersonDefinedFieldInputs
          key={item.id}
          definedField={item}
          formData={formData}
          handleInputChange={handleInputChange}
          formErrors={formErrors}
          disabled={disabled}
          isLoading={isLoading}
        />
      ))}
      {definedFieldIsLoading && (
        <Input
          name="field1"
          label=" "
          value={formData?.field1}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.field1}
          isLoading={isLoading || definedFieldIsLoading}
        />
      )}
      {definedFieldIsLoading && (
        <Input
          name="field2"
          label=" "
          value={formData?.field2}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.field2}
          isLoading={isLoading || definedFieldIsLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default PersonDefinedFieldForm
