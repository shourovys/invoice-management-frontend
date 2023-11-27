import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { ILogFormData } from 'types/pages/log'
import { LogIcon } from 'utils/icons'

interface IProps {
  formData?: ILogFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function LogForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={LogIcon} header="Log">
      <Input
        name="id"
        label="Log No"
        value={formData?.id}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.id}
        isLoading={isLoading}
      />
      <Input
        name="partition"
        label="Partition"
        value={formData?.partition}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.partition}
        isLoading={isLoading}
      />
      <Input
        name="log_time"
        label="Log Time"
        value={formData?.log_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.log_time}
        isLoading={isLoading}
      />
      <Input
        name="event_time"
        label="Event Time"
        value={formData?.event_time}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.event_time}
        isLoading={isLoading}
      />
      <Input
        name="event_code"
        label="Event Code"
        value={formData?.event_code}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.event_code}
        isLoading={isLoading}
      />
      <Input
        name="event_name"
        label="Event Name"
        value={formData?.event_name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.event_name}
        isLoading={isLoading}
      />
      <Input
        name="device_type"
        label="Device Type"
        value={formData?.device_type}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.device_type}
        isLoading={isLoading}
      />
      <Input
        name="person_name"
        label="Person Name"
        value={formData?.person_name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.person_name}
        isLoading={isLoading}
      />
      <Input
        name="message"
        label="Message"
        value={formData?.message}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.message}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default LogForm
