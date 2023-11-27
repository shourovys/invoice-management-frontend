import { nodeApi, partitionApi, threatApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IElevatorFormData, readerTypeOptions, threatLevelOptions } from 'types/pages/elevator'
import { INodeResult } from 'types/pages/node'
import { IPartitionResult } from 'types/pages/partition'
import { IThreatResult } from 'types/pages/threat'
import { SERVER_QUERY } from 'utils/config'
import { elevatorIcon } from 'utils/icons'

interface IProps {
  formData?: IElevatorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function ElevatorForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: threatIsLoading, data: threatData } = useSWR<
    IListServerResponse<IThreatResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : threatApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={elevatorIcon} header="Elevator">
      <Selector
        name="partition"
        label="Partition"
        value={formData?.partition}
        options={partitionData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.partition}
        isLoading={isLoading || partitionIsLoading}
      />

      <Input
        name="name"
        label="Elevator Name"
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
        isLoading={isLoading || nodeIsLoading}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.node}
      />

      <Input
        name="elevator_stat"
        type="number"
        label="Elevator Stat"
        value={formData?.elevator_stat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.elevator_stat}
        isLoading={isLoading}
      />

      <Selector
        name="reader_type"
        label="Reader Type"
        value={formData?.reader_type}
        options={readerTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.reader_type}
        isLoading={isLoading}
      />

      <Selector
        name="threat"
        label="Threat"
        value={formData?.threat}
        options={threatData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.threat}
        isLoading={isLoading || threatIsLoading}
      />

      <Selector
        name="threat_level"
        label="Threat Level"
        value={formData?.threat_level}
        options={threatLevelOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.threat_level}
        isLoading={isLoading}
      />

      <SwitchButton
        name="relay_only"
        label="Relay Only"
        checked={formData?.relay_only}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default ElevatorForm
