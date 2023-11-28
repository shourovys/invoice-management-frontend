import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import { IInvoiceFormData } from '../../../../types/pages/invoice'
import { invoiceIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'
import FormCardWithHeader from '../../../HOC/FormCardWithHeader'
import Input from '../../../atomic/Input'

interface IProps {
  formData?: IInvoiceFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function InvoiceSellerForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={invoiceIcon} header={t`Seller Form`}>
      <Input
        name="name"
        label={t`Name`}
        value={formData?.sellerInfo.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.['sellerInfo.name']}
        isLoading={isLoading}
      />

      <Input
        name="email"
        label={t`Email`}
        value={formData?.sellerInfo.email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.['sellerInfo.email']}
        isLoading={isLoading}
      />

      <Input
        name="contactNumber"
        label={t`Contact Number`}
        value={formData?.sellerInfo.contactNumber}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.['sellerInfo.contactNumber']}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default InvoiceSellerForm
