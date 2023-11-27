import { getBackApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import FileInput from 'components/atomic/FileInput'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, ISingleServerResponse } from 'types/pages/common'
import {
  IGetBackFormData,
  IGetBackServerFilesResult,
  getBackMediaOptions,
} from 'types/pages/maintenance'
import { getBackIcon } from 'utils/icons'

interface IProps {
  formData: IGetBackFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function GetBackFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
  const { isLoading: serverFilesLoading, data: serverFilesData } = useSWR<
    ISingleServerResponse<IGetBackServerFilesResult[]>
  >(
    !formData.media_type?.value || disabled || typeof handleInputChange === 'undefined'
      ? null
      : getBackApi.details(`media_type=${formData.media_type?.value}`)
  )

  return (
    <FormCardWithHeader icon={getBackIcon} header="GetBack">
      <Selector
        name="media_type"
        label="Media"
        value={formData.media_type}
        options={getBackMediaOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
        error={formErrors?.media_type}
      />
      <div>
        {formData.media_type?.value === 'user_pc' ? (
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
            options={serverFilesData?.results?.map((option) => ({
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
      <SwitchButton
        name="delete_existing"
        label="Delete Existing Data"
        checked={formData.delete_existing}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default GetBackFrom
