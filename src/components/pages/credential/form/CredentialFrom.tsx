import { formatApi, personApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { ICredentialFormData, credentialStats, credentialTypes } from 'types/pages/credential'
import { IFormatResult } from 'types/pages/format'
import { IPersonResult } from 'types/pages/person'
import { SERVER_QUERY } from 'utils/config'
import { credentialIcon } from 'utils/icons'

interface IProps {
  formData: ICredentialFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function CredentialFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
  const { isLoading: personIsLoading, data: personData } = useSWR<
    IListServerResponse<IPersonResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : personApi.list(SERVER_QUERY.selectorDataQuery)
  )
  const { isLoading: formatIsLoading, data: formatData } = useSWR<
    IListServerResponse<IFormatResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : formatApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={credentialIcon} header="Credential">
      <Selector
        name="format"
        label="Format"
        value={formData.format}
        options={formatData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || formatIsLoading}
        error={formErrors?.format}
      />
      <Input
        name="number"
        label="Credential Number"
        type="number"
        value={formData.number}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.number}
        isLoading={isLoading}
      />
      <Input
        name="sub_key_number"
        label="Sub Key Number"
        type="number"
        value={formData.sub_key_number}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.sub_key_number}
        isLoading={isLoading}
      />
      <Selector
        name="type"
        label="Credential Type"
        value={formData.type}
        options={credentialTypes}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Selector
        name="stat"
        label="Credential Status"
        value={formData.stat}
        options={credentialStats}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.stat}
        isLoading={isLoading}
      />
      <Selector
        name="person"
        label="Credential Owner"
        value={formData.person}
        options={personData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.last_name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || personIsLoading}
        error={formErrors?.person}
      />
      <SwitchButton
        name="never_expired"
        label="Never Expire"
        checked={formData.never_expired}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.never_expired && (
        <Input
          name="start_time"
          label="Start Time"
          type="datetime-local"
          value={formData.start_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.start_time}
          isLoading={isLoading}
        />
      )}

      {formData?.never_expired && (
        <Input
          name="end_time"
          label="End Time"
          type="datetime-local"
          value={formData.end_time}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.end_time}
          isLoading={isLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default CredentialFrom
