import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import ImageInput from '../../../../components/atomic/ImageInput'
import Input from '../../../../components/atomic/Input'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import { IPartitionFormData } from '../../../../types/pages/partition'
import { doorIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData?: IPartitionFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function PartitionForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={doorIcon} header={t`Partition`}>
      <Input
        name="PartitionName"
        label={t`Partition Name`}
        value={formData?.PartitionName}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.PartitionName}
        isLoading={isLoading}
      />
      <Input
        name="PartitionDesc"
        label={t`Description`}
        value={formData?.PartitionDesc}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.PartitionDesc}
        isLoading={isLoading}
      />
      <ImageInput
        name="ImageFile"
        label={t`Image File`}
        value={formData?.ImageFile}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.ImageFile}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default PartitionForm
