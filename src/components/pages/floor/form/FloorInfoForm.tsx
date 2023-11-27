import { partitionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import IconButton from 'components/atomic/IconButton'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import { useNavigate, useSearchParams } from 'react-router-dom'
import routeProperty from 'routes/routeProperty'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IFloorInfoFormData } from 'types/pages/floor'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from 'utils/config'
import { doorIcon, editIcon } from 'utils/icons'

interface IProps {
  formData?: IFloorInfoFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function FloorInfoForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const navigate = useNavigate()
  // Get the floor ID from the router query
  const [searchParams] = useSearchParams()
  const queryId = searchParams.get('id') as string

  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const handleFloorInfoEdit = (type: string) =>
    navigate(routeProperty.floorInfoEdit.path(`${queryId}?type=${type}`))

  return (
    <FormCardWithHeader icon={doorIcon} header="Floor">
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
        label="Floor Name"
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
      <div className="flex items-end gap-2">
        <Input
          name="node"
          label="Node"
          value={formData?.node.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.node}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('node')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="door"
          label="Door"
          value={formData?.door.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.door}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('door')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="region"
          label="Region"
          value={formData?.region.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.region}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('region')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="input"
          label="Input"
          value={formData?.input.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.input}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('input')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="output"
          label="Output"
          value={formData?.output.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.output}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('output')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="elevator"
          label="Elevator"
          value={formData?.elevator.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.elevator}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('elevator')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="relay"
          label="Relay"
          value={formData?.relay.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.relay}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('relay')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="camera"
          label="Camera"
          value={formData?.camera.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.camera}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('camera')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="nvr"
          label="NVR"
          value={formData?.nvr.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.nvr}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('nvr')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="channel"
          label="Channel"
          value={formData?.channel.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.channel}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('channel')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="gateway"
          label="Gateway"
          value={formData?.gateway.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.gateway}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('gateway')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="logset"
          label="Logset"
          value={formData?.logset?.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.logset}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('logset')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="facegate"
          label="Facegate"
          value={formData?.facegate.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.facegate}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('facegate')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="serial"
          label="Serial"
          value={formData?.serial.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.serial}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('serial')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="subnode"
          label="Subnode"
          value={formData?.subnode.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.subnode}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('subnode')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="tigger"
          label="Trigger"
          value={formData?.tigger.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.tigger}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('tigger')}
        />
      </div>
      <div className="flex items-end gap-2">
        <Input
          name="threat"
          label="Threat"
          value={formData?.threat.map((item) => item.name).join(', ')}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.threat}
          isLoading={isLoading}
        />
        <IconButton
          icon={editIcon}
          tooltip="Edit"
          iconClass="mb-.5"
          onClick={() => handleFloorInfoEdit('threat')}
        />
      </div>
    </FormCardWithHeader>
  )
}

export default FloorInfoForm
