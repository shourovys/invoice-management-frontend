import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import ImageInput from 'components/atomic/ImageInput'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IPartitionFormData } from 'types/pages/partition'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: IPartitionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function PartitionForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={doorIcon} header="Partition">
      <Input
        name="name"
        label="Partition Name"
        value={formData?.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Description"
        value={formData?.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.description}
        isLoading={isLoading}
      />
      <ImageInput
        name="image"
        label="Image File"
        value={formData?.image}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.image}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default PartitionForm
