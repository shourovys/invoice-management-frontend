import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { ISystemInfoFormData } from 'types/pages/system'
import { systemIcon } from 'utils/icons'

interface IProps {
  formData: ISystemInfoFormData
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function SystemInfoFieldFrom({ formData, handleInputChange, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={systemIcon} header="System">
      <Input
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="backup_media"
        label="Backup Media"
        value={formData.backup_media}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="record_media"
        label="Record Media"
        value={formData.record_media}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="system_total"
        label="System Total"
        value={formData.system_total}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="system_free"
        label="System Free"
        value={formData.system_free}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="sd_mounted"
        label="SD Mount"
        value={formData.sd_mounted ? 'Yes' : 'No'}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="sd_total"
        label="SD Total"
        value={formData.sd_total}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="sd_free"
        label="SD Free"
        value={formData.sd_free}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="usb_mounted"
        label="USB Mount"
        value={formData.usb_mounted ? 'Yes' : 'No'}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="usb_total"
        label="USB Total"
        value={formData.usb_total}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="usb_free"
        label="USB Free"
        value={formData.usb_free}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="start_time"
        label="Start Time"
        value={formData.start_time ?? ''}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default SystemInfoFieldFrom
