import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INodeInfoFormData } from 'types/pages/node'
import { nodeIcon } from 'utils/icons'

interface IProps {
  formData?: INodeInfoFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NodeInfoForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  return (
    <FormCardWithHeader icon={nodeIcon} header="Node">
      <Input
        name="name"
        label="Node Name"
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
      <Input
        name="mac"
        label="MAC Address"
        value={formData?.mac}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.mac}
        isLoading={isLoading}
      />
      <Input
        name="product"
        label="Product"
        value={formData?.product}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.product}
        isLoading={isLoading}
      />
      <Input
        name="model"
        label="Model"
        value={formData?.model}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.model}
        isLoading={isLoading}
      />
      <Input
        name="type"
        label="Type"
        value={formData?.type}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Input
        name="oem_no"
        label="OEM Number"
        value={formData?.oem_no}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.oem_no}
        isLoading={isLoading}
      />
      <Input
        name="version"
        label="Version"
        value={formData?.version ?? ''}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.version}
        isLoading={isLoading}
      />
      <Input
        name="address"
        label="Address"
        value={formData?.address ?? ''}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.address}
        isLoading={isLoading}
      />
      <Input
        name="timezone"
        label="Timezone"
        value={formData?.timezone ?? ''}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.timezone}
        isLoading={isLoading}
      />
      <Input
        name="online"
        label="Online"
        value={formData?.online ? 'Yes' : 'No'}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.online}
        isLoading={isLoading}
      />

      <Input
        name="power_fault_type"
        label="Power Fault Type"
        value={formData?.power_fault_type}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.power_fault_type}
        isLoading={isLoading}
      />
      <Input
        name="tamper_type"
        label="Tamper Type"
        value={formData?.tamper_type}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.tamper_type}
        isLoading={isLoading}
      />

      <Input
        name="power_fault_stat"
        label="Power Fault Stat"
        value={formData?.power_fault_stat ? 'Yes' : 'No'}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.power_fault_stat}
        isLoading={isLoading}
      />
      <Input
        name="tamper_stat"
        label="Tamper Stat"
        value={formData?.tamper_stat ? 'Yes' : 'No'}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.tamper_stat}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default NodeInfoForm
