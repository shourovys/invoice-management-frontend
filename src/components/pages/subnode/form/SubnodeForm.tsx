import { serialApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { ISerialResult } from 'types/pages/serial'
import { ISubnodeFormData, subnodeModelOptions } from 'types/pages/subnode'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: ISubnodeFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function SubnodeForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: serialIsLoading, data: serialData } = useSWR<
    IListServerResponse<ISerialResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : serialApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={doorIcon} header="Subnode">
      <Input
        name="name"
        label="Subnode Name"
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
        name="serial"
        label="Serial"
        value={formData?.serial}
        options={serialData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.serial}
        isLoading={isLoading || serialIsLoading}
      />
      <Input
        name="address"
        label="Address"
        value={formData?.address}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.address}
        isLoading={isLoading}
      />
      <Selector
        name="model"
        label="Model"
        value={formData?.model}
        options={subnodeModelOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.model}
        isLoading={isLoading}
      />
      {(disabled || typeof handleInputChange === 'undefined') && (
        <Input
          name="online"
          label="Online"
          value={formData?.online ? 'Yes' : 'No'}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.online}
          isLoading={isLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default SubnodeForm
