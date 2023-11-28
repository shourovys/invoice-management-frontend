import { IActionsButton } from '../../../../types/components/actionButtons'
import { IFormErrors } from '../../../../types/pages/common'
import { deleteIcon, oneBoxIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'
import FormCardWithHeader from '../../../HOC/FormCardWithHeader'
import Input from '../../../atomic/Input'

interface IProps {
  formData?: {
    id: string
    name: string
    code: string
    description: string
    price: number
    quantity: number
  }
  handleInputChange?: (productId: string, field: string, value: string | number) => void
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
  onDelete?: (productId: string) => void
}

function InvoiceProductFrom({
  formData,
  handleInputChange,
  formErrors = {},
  disabled,
  isLoading,
  onDelete,
}: IProps) {
  if (!formData?.id) {
    return null
  }

  // Define the actions for the card
  const headerActionButtons: IActionsButton[] = [
    {
      icon: deleteIcon,
      color: 'danger',
      text: t`Delete Product`,
      onClick: () => onDelete && onDelete(formData.id),
    },
  ]

  return (
    <FormCardWithHeader
      icon={oneBoxIcon}
      header={t`Product`}
      headerActionButtons={
        disabled || typeof handleInputChange === 'undefined' ? [] : headerActionButtons
      }
    >
      <Input
        name="name"
        label={t`Name`}
        value={formData?.name}
        onChange={(name, value) => handleInputChange?.(formData?.id, name, value)}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors[`product.${formData?.id}.name`]}
        isLoading={isLoading}
      />

      <Input
        name="code"
        label={t`Code`}
        value={formData?.code}
        onChange={(name, value) => handleInputChange?.(formData?.id, name, value)}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors[`product.${formData?.id}.code`]}
        isLoading={isLoading}
      />

      <Input
        name="description"
        label={t`Description`}
        value={formData?.description}
        onChange={(name, value) => handleInputChange?.(formData?.id, name, value)}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors[`product.${formData?.id}.description`]}
        isLoading={isLoading}
      />

      <Input
        name="quantity"
        label={t`Quantity`}
        type="number"
        value={formData?.quantity?.toString() || ''}
        onChange={(name, value) => handleInputChange?.(formData?.id, name, parseFloat(value))}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors[`product.${formData?.id}.quantity`]}
        isLoading={isLoading}
      />

      <Input
        name="price"
        label={t`Price`}
        type="number"
        value={formData?.price?.toString() || ''}
        onChange={(name, value) => handleInputChange?.(formData?.id, name, parseFloat(value))}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors[`product.${formData?.id}.price`]}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default InvoiceProductFrom
