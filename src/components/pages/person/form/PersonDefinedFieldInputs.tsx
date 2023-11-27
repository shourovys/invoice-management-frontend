import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IDefinedFieldResult } from 'types/pages/definedField'
import { IPersonFormData } from 'types/pages/person'
import Input from '../../../atomic/Input'

interface IProps {
  definedField: IDefinedFieldResult
  formData?: IPersonFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function PersonDefinedFieldInputs({
  definedField,
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const { id, enable, name } = definedField
  if (enable) {
    switch (id) {
      case 1:
        return (
          <Input
            name="field1"
            label={name}
            value={formData?.field1}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field1}
            isLoading={isLoading}
          />
        )
      case 2:
        return (
          <Input
            name="field2"
            label={name}
            value={formData?.field2}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field2}
            isLoading={isLoading}
          />
        )
      case 3:
        return (
          <Input
            name="field3"
            label={name}
            value={formData?.field3}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field3}
            isLoading={isLoading}
          />
        )
      case 4:
        return (
          <Input
            name="field4"
            label={name}
            value={formData?.field4}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field4}
            isLoading={isLoading}
          />
        )
      case 5:
        return (
          <Input
            name="field5"
            label={name}
            value={formData?.field5}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field5}
            isLoading={isLoading}
          />
        )
      case 6:
        return (
          <Input
            name="field6"
            label={name}
            value={formData?.field6}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field6}
            isLoading={isLoading}
          />
        )
      case 7:
        return (
          <Input
            name="field7"
            label={name}
            value={formData?.field7}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field7}
            isLoading={isLoading}
          />
        )
      case 8:
        return (
          <Input
            name="field8"
            label={name}
            value={formData?.field8}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field8}
            isLoading={isLoading}
          />
        )
      case 9:
        return (
          <Input
            name="field9"
            label={name}
            value={formData?.field9}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field9}
            isLoading={isLoading}
          />
        )
      case 10:
        return (
          <Input
            name="field10"
            label={name}
            value={formData?.field10}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field10}
            isLoading={isLoading}
          />
        )
      case 11:
        return (
          <Input
            name="field11"
            label={name}
            value={formData?.field11}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field11}
            isLoading={isLoading}
          />
        )
      case 12:
        return (
          <Input
            name="field12"
            label={name}
            value={formData?.field12}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field12}
            isLoading={isLoading}
          />
        )
      case 13:
        return (
          <Input
            name="field13"
            label={name}
            value={formData?.field13}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field13}
            isLoading={isLoading}
          />
        )
      case 14:
        return (
          <Input
            name="field14"
            label={name}
            value={formData?.field14}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field14}
            isLoading={isLoading}
          />
        )
      case 15:
        return (
          <Input
            name="field15"
            label={name}
            value={formData?.field15}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.field15}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return null
}

export default PersonDefinedFieldInputs
