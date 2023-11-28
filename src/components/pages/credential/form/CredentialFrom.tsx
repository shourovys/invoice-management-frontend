import { formatApi } from '../../../../api/urls'
import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Input from '../../../../components/atomic/Input'
import SwitchButtonSelect from '../../../../components/atomic/SelectSwitch'
import Selector from '../../../../components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange, THandleInputSelect } from '../../../../types/components/common'
import {
  IFormErrors,
  IListServerResponse,
  ISelectedInputFields,
} from '../../../../types/pages/common'
import {
  ICredentialBulkLoadFormData,
  ICredentialFormData,
  ICredentialGroupEditFormData,
  credentialStatsOptions,
  credentialTypesOptions,
} from '../../../../types/pages/credential'
import { IFormatResult } from '../../../../types/pages/format'
import { SERVER_QUERY } from '../../../../utils/config'
import { credentialIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'
import DateTimeInput from '../../../atomic/DateTimeInput'

interface IProps {
  formData: ICredentialFormData | ICredentialGroupEditFormData | ICredentialBulkLoadFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
  queryFormatIsLoading?: boolean
  // props for checkbox in header
  selectedInputFields?: ISelectedInputFields<ICredentialGroupEditFormData>
  handleSelect?: THandleInputSelect
}

function CredentialForm({
  formData,
  formErrors,
  handleInputChange,
  disabled,
  isLoading,
  queryFormatIsLoading,
  selectedInputFields,
  handleSelect,
}: IProps) {
  const { isLoading: formatIsLoading, data: formatData } = useSWR<
    IListServerResponse<IFormatResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : formatApi.list(SERVER_QUERY.selectorDataQuery)
  )

  // const isStartCredentialNumbPresent = 'StartCredentialNumb' in formData

  return (
    <FormCardWithHeader icon={credentialIcon} header={t`Credential`}>
      <Selector
        name="Format"
        label={t`Format`}
        value={formData.Format}
        options={formatData?.data.map((result) => ({
          value: result.FormatNo.toString(),
          label: result.FormatName,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || formatIsLoading || queryFormatIsLoading}
        error={formErrors?.Format}
        isSelected={selectedInputFields?.Format}
        handleSelect={handleSelect}
      />
      {'CredentialNumb' in formData && (
        <Input
          name="CredentialNumb"
          label={t`Credential Number`}
          type="number"
          value={formData.CredentialNumb}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.CredentialNumb}
          isLoading={isLoading}
          isSelected={selectedInputFields?.CredentialNumb}
          handleSelect={handleSelect}
        />
      )}
      {'StartCredentialNumb' in formData && (
        <Input
          name="StartCredentialNumb"
          label={t`Start Credential Number`}
          type="number"
          value={formData.StartCredentialNumb}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.StartCredentialNumb}
          isLoading={isLoading}
        />
      )}
      {'BulkCount' in formData && (
        <Input
          name="BulkCount"
          label={t`Bulk Count`}
          type="number"
          value={formData.BulkCount}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.BulkCount}
          isLoading={isLoading}
        />
      )}
      <Input
        name="SubKeyNumb"
        label={t`Sub Key Number`}
        type="number"
        value={formData.SubKeyNumb}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.SubKeyNumb}
        isLoading={isLoading}
        isSelected={selectedInputFields?.SubKeyNumb}
        handleSelect={handleSelect}
      />
      <Selector
        name="CredentialType"
        label={t`Credential Type`}
        value={formData.CredentialType}
        options={credentialTypesOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.CredentialType}
        isLoading={isLoading}
        isSelected={selectedInputFields?.CredentialType}
        handleSelect={handleSelect}
      />
      <Selector
        name="CredentialStat"
        label={t`Credential Stat`}
        value={formData.CredentialStat}
        options={credentialStatsOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.CredentialStat}
        isLoading={isLoading}
        isSelected={selectedInputFields?.CredentialStat}
        handleSelect={handleSelect}
      />
      {/* <Selector
        name="person"
        label={t`Credential Owner`}
        value={formData.person}
        options={personData?.data.map((result) => ({
          value: result.id.toString(),
          label: result.last_name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading || personIsLoading}
        error={formErrors?.person}
      /> */}
      <SwitchButtonSelect
        name="NeverExpired"
        label={t`Never Expire`}
        value={formData.NeverExpired}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
        isSelected={selectedInputFields?.NeverExpired}
        handleSelect={handleSelect}
      />
      {formData.NeverExpired?.value === '0' && (
        <DateTimeInput
          name="StartTime"
          label={t`Start Time`}
          // type="datetime-local"
          value={formData.StartTime}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.StartTime}
          isLoading={isLoading}
          isSelected={selectedInputFields?.NeverExpired}
          handleSelect={handleSelect}
          format="yyyy-MM-dd HH:mm"
        />
      )}

      {formData.NeverExpired?.value === '0' && (
        <DateTimeInput
          name="EndTime"
          label={t`End Time`}
          // type="datetime-local"
          value={formData.EndTime}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.EndTime}
          isLoading={isLoading}
          isSelected={selectedInputFields?.NeverExpired}
          handleSelect={handleSelect}
          format="yyyy-MM-dd HH:mm"
        />
      )}
    </FormCardWithHeader>
  )
}

export default CredentialForm
