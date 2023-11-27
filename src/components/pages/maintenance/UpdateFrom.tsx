import { updateApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import FileInput from 'components/atomic/FileInput'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, ISingleServerResponse } from 'types/pages/common'
import {
  IUpdateFormData,
  IUpdateServerFilesResult,
  maintenanceMediaOptions,
} from 'types/pages/maintenance'
import { updateIcon } from 'utils/icons'

interface IProps {
  formData: IUpdateFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function UpdateFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
  const { isLoading: serverFilesLoading, data: serverFilesData } = useSWR<
    ISingleServerResponse<IUpdateServerFilesResult>
  >(
    !formData.media_type?.value || disabled || typeof handleInputChange === 'undefined'
      ? null
      : updateApi.details(`media_type=${formData.media_type?.value}`)
  )

  return (
    <FormCardWithHeader icon={updateIcon} header="Update">
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
    </FormCardWithHeader>
  )
}

export default UpdateFrom
