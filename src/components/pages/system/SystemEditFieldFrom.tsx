import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { ISystemEditFormData, systemMediaOptions } from 'types/pages/system'
import { personIcon } from 'utils/icons'

interface IProps {
  formData: ISystemEditFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function SystemEditFieldFrom({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={personIcon} header="Person">
      <Input
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Selector
        name="backup_media"
        label="Backup Media"
        value={formData.backup_media}
        options={systemMediaOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.backup_media}
        isLoading={isLoading}
      />
      <Selector
        name="record_media"
        label="Record Media"
        value={formData.record_media}
        options={systemMediaOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.record_media}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default SystemEditFieldFrom
