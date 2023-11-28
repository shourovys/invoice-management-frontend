import useSWR from 'swr'
import { invoiceRoleApi, partitionApi, personApi } from '../../../../api/urls'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors, IListServerResponse } from '../../../../types/pages/common'
import { IInvoiceFormData } from '../../../../types/pages/invoice'
import { IInvoiceRoleResult } from '../../../../types/pages/invoiceRole'
import { IPartitionResult } from '../../../../types/pages/partition'
import { IPersonResult } from '../../../../types/pages/person'
import { SERVER_QUERY } from '../../../../utils/config'
import { invoiceIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'
import FormCardWithHeader from '../../../HOC/FormCardWithHeader'
import Input from '../../../atomic/Input'
import Selector from '../../../atomic/Selector'

interface IProps {
  formData?: IInvoiceFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function InvoiceEditForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: roleIsLoading, data: roleData } = useSWR<
    IListServerResponse<IInvoiceRoleResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : invoiceRoleApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: personIsLoading, data: personData } = useSWR<
    IListServerResponse<IPersonResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : personApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={invoiceIcon} header={t`Invoice`}>
      <Selector
        name="Partition"
        label={t`Partition`}
        value={formData?.Partition}
        options={partitionData?.data.map((result) => ({
          value: result.PartitionNo.toString(),
          label: result.PartitionDesc,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Partition}
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="InvoiceId"
        label={t`Invoice ID`}
        value={formData?.InvoiceId}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.InvoiceId}
        isLoading={isLoading}
      />
      <Input
        name="Password"
        label={t`Password`}
        type="password"
        value={formData?.Password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Password}
        isLoading={isLoading}
      />
      <Input
        name="InvoiceDesc"
        label={t`Description`}
        value={formData?.InvoiceDesc}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.InvoiceDesc}
        isLoading={isLoading}
      />
      <Input
        name="Email"
        label={t`Email`}
        value={formData?.Email}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Email}
        isLoading={isLoading}
      />
      <Selector
        name="Role"
        label={t`Invoice Role`}
        value={formData?.Role}
        options={roleData?.data.map((result) => ({
          value: result.RoleNo.toString(),
          label: result.role,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Role}
        isLoading={isLoading || roleIsLoading}
      />
      <Selector
        name="Person"
        label={t`Person`}
        value={formData?.Person}
        options={personData?.data.map((result) => ({
          value: result.PersonNo.toString(),
          label: result.LastName,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Person}
        isLoading={isLoading || personIsLoading}
      />
    </FormCardWithHeader>
  )
}

export default InvoiceEditForm
