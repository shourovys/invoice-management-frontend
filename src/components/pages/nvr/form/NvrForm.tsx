import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INvrFormData, NVR_TYPE_OPTIONS } from 'types/pages/nvr'
import { nvrIcon } from 'utils/icons'

interface IProps {
  formData?: INvrFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NvrForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={nvrIcon} header="NVR">
      <Input
        name="name"
        label="NVR Name"
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
      <Selector
        name="type"
        label="NVR Type"
        value={formData?.type}
        options={NVR_TYPE_OPTIONS}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Input
        name="ip_address"
        label="IP Address"
        value={formData?.ip_address}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.ip_address}
        isLoading={isLoading}
      />
      <Input
        name="rtsp_port"
        type="number"
        label="RTSP Port"
        value={formData?.rtsp_port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.rtsp_port}
        isLoading={isLoading}
      />
      <Input
        name="data_port"
        type="number"
        label="Data Port"
        value={formData?.data_port}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.data_port}
        isLoading={isLoading}
      />
      <Input
        name="user_id"
        label="User ID"
        value={formData?.user_id}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.user_id}
      />
      <Input
        name="password"
        label="Password"
        value={formData?.password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.password}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default NvrForm
