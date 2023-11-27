import { nodeApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { parityOptions } from 'types/pages/format'
import { INodeResult } from 'types/pages/node'
import { ISerialFormData, serialProtocolOptions } from 'types/pages/serial'
import { SERVER_QUERY } from 'utils/config'
import { serialIcon } from 'utils/icons'

interface IProps {
  formData?: ISerialFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function SerialForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={serialIcon} header="Serial">
      <Input
        name="name"
        label="Serial Name"
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
        name="node"
        label="Node"
        value={formData?.node}
        options={nodeData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.node}
        isLoading={isLoading || nodeIsLoading}
      />
      <Input
        name="device"
        label="Device"
        value={formData?.device}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.device}
        isLoading={isLoading}
      />
      <Input
        name="band_rate"
        type="number"
        label="Baudrate"
        value={formData?.band_rate}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.band_rate}
        isLoading={isLoading}
      />
      <Input
        name="data_bit"
        type="number"
        label="Databit"
        value={formData?.data_bit}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.data_bit}
        isLoading={isLoading}
      />
      <Input
        name="stop_bit"
        type="number"
        label="Stopbit"
        value={formData?.stop_bit}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.stop_bit}
        isLoading={isLoading}
      />
      <Selector
        name="parity"
        label="Parity"
        value={formData?.parity}
        options={parityOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.parity}
        isLoading={isLoading}
      />
      <Selector
        name="protocol"
        label="Protocol"
        value={formData?.protocol}
        options={serialProtocolOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.protocol}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default SerialForm
