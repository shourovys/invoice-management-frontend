import { partitionApi } from '../../../../api/urls'
import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import ImageInput from '../../../../components/atomic/ImageInput'
import Input from '../../../../components/atomic/Input'
import Selector from '../../../../components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from '../../../../types/components/common'
import { IListServerResponse, INewFormErrors } from '../../../../types/pages/common'
import { IPartitionResult } from '../../../../types/pages/partition'
import { IPersonFormData } from '../../../../types/pages/person'
import { SERVER_QUERY } from '../../../../utils/config'
import { personIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData: IPersonFormData
  handleInputChange?: THandleInputChange
  formErrors?: INewFormErrors<IPersonFormData>
  disabled?: boolean
  isLoading?: boolean
}

function PersonPersonalForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={personIcon} header={t`Person`} masonry>
      <Selector
        name="Partition"
        label={t`Partition`}
        value={formData.Partition}
        options={partitionData?.data.map((result) => ({
          value: result.PartitionNo.toString(),
          label: result.PartitionName,
        }))}
        isClearable={false}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Partition}
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="LastName"
        label={t`Last Name`}
        value={formData.LastName}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.LastName}
        isLoading={isLoading}
      />
      <Input
        name="MiddleName"
        label={t`Middle Name`}
        value={formData.MiddleName}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.MiddleName}
        isLoading={isLoading}
      />
      <Input
        name="FirstName"
        label={t`First Name`}
        value={formData.FirstName}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.FirstName}
        isLoading={isLoading}
      />
      <ImageInput
        name="ImageFile"
        label={t`User profile`}
        placeholder={t`Upload an image`}
        value={formData.ImageFile}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.ImageFile}
        isLoading={isLoading}
      />
      <Input
        name="Email"
        label={t`Email`}
        value={formData.Email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Email}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default PersonPersonalForm
