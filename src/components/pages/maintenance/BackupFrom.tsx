import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import RadioButtons from 'components/atomic/RadioButtons'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import {
  IBackupFormData,
  maintenanceBackupOptions,
  maintenanceMediaOptions,
} from 'types/pages/maintenance'
import { backupIcon } from 'utils/icons'

interface IProps {
  formData: IBackupFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function BackupFrom({ formData, formErrors, handleInputChange, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={backupIcon} header="Backup">
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
      <RadioButtons
        name="source"
        inputLabel="Backup Data"
        checked={formData.source}
        radios={maintenanceBackupOptions}
        onChange={handleInputChange}
        isLoading={isLoading}
        error={formErrors?.source}
      />
    </FormCardWithHeader>
  )
}

export default BackupFrom
