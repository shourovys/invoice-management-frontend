import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { INodeFormData, nodeFaultTypeOptions } from 'types/pages/node'
import { nodeIcon } from 'utils/icons'

interface IProps {
  formData?: INodeFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function NodeForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
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
      <Selector
        name="power_fault_type"
        label="Power Fault Type"
        value={formData?.power_fault_type}
        options={nodeFaultTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.power_fault_type}
        isLoading={isLoading}
      />
      <Selector
        name="tamper_type"
        label="Tamper Type"
        value={formData?.tamper_type}
        options={nodeFaultTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.tamper_type}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default NodeForm
