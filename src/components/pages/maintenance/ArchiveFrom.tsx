import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IArchiveFormData, maintenanceMediaOptions } from 'types/pages/maintenance'
import { archiveIcon } from 'utils/icons'

interface IProps {
  formData: IArchiveFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function ArchiveFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={archiveIcon} header="Archive">
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
      <Input
        name="log_no"
        label="Log No"
        value={formData?.log_no}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.log_no}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default ArchiveFrom
