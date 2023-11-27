import { updateApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import FileInput from 'components/atomic/FileInput'
import RadioButtons from 'components/atomic/RadioButtons'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, ISingleServerResponse } from 'types/pages/common'
import {
  IRestoreFormData,
  IUpdateServerFilesResult,
  maintenanceMediaOptions,
} from 'types/pages/maintenance'
import { restoreIcon } from 'utils/icons'

interface IProps {
  formData: IRestoreFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function RestoreFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
  const { isLoading: serverFilesLoading, data: serverFilesData } = useSWR<
    ISingleServerResponse<IUpdateServerFilesResult>
  >(
    !formData.media_type?.value || disabled || typeof handleInputChange === 'undefined'
      ? null
      : updateApi.details(`media_type=${formData.media_type?.value}`)
  )

  return (
    <FormCardWithHeader icon={restoreIcon} header="Restore">
      <Selector
        name="media_type"
        label="Media"
        value={formData.media_type}
        options={maintenanceMediaOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
        error={formErrors?.media_type}
      />
      <div>
        {formData.media_type?.value === '0' ? (
          <FileInput
            name="file"
            label="File"
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
            error={formErrors?.file}
          />
        ) : (
          <Selector
            name="name"
            label="File"
            value={formData.name}
            options={serverFilesData?.results.available_files.map((option) => ({
              label: option.name,
              value: option.name,
            }))}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading || serverFilesLoading}
            error={formErrors?.name}
          />
        )}
      </div>
      <RadioButtons
        name="source"
        inputLabel="Backup Data"
        checked={formData.source}
        radios={[
          {
            label: 'Node DB',
            value: '0',
          },
          {
            label: 'System DB',
            value: '1',
          },
          {
            label: 'Log DB',
            value: '2',
          },
          {
            label: 'Image File',
            value: '3',
          },
        ]}
        onChange={handleInputChange}
        isLoading={isLoading}
        error={formErrors?.source}
      />
    </FormCardWithHeader>
  )
}

export default RestoreFrom
