import { partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import ImageInput from 'components/atomic/ImageInput'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IPartitionResult } from 'types/pages/partition'
import { IPersonFormData } from 'types/pages/person'
import { SERVER_QUERY } from 'utils/config'
import { personIcon } from 'utils/icons'

interface IProps {
  formData: IPersonFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
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
    <FormCardWithHeader icon={personIcon} header="Person">
      <Selector
        name="partition"
        label="Partition"
        value={formData.partition}
        options={partitionData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.partition}
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="last_name"
        label="Last Name"
        value={formData.last_name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.last_name}
        isLoading={isLoading}
      />
      <Input
        name="middle_name"
        label="Middle Name"
        value={formData.middle_name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.middle_name}
        isLoading={isLoading}
      />
      <Input
        name="first_name"
        label="First Name"
        value={formData.first_name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.first_name}
        isLoading={isLoading}
      />
      <ImageInput
        name="image"
        label="User profile"
        placeholder="Upload a image"
        value={formData.image}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.image}
        isLoading={isLoading}
      />
      <Input
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.email}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default PersonPersonalForm
