import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { ILicenseFormData, licenseNodeTypesOptions } from 'types/pages/license'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: ILicenseFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function LicenseForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  // const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
  //     IListServerResponse<IPartitionResult[]>
  // >(
  //     disabled || typeof handleInputChange === "undefined"
  //         ? null
  //         : partitionApi.list(SERVER_QUERY.selectorDataQuery),
  // );

  return (
    <FormCardWithHeader icon={doorIcon} header="License">
      <Input
        name="key"
        label="Key"
        value={formData?.key}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.key}
        isLoading={isLoading}
      />
      <Input
        name="mac"
        label="MAC"
        value={formData?.mac}
        onChange={handleInputChange}
        disabled
        error={formErrors?.mac}
        isLoading={isLoading}
      />
      <Input
        name="product"
        label="Product"
        value={formData?.product}
        onChange={handleInputChange}
        disabled
        error={formErrors?.product}
        isLoading={isLoading}
      />
      <Input
        name="model"
        label="Model"
        value={formData?.model}
        onChange={handleInputChange}
        disabled
        error={formErrors?.model}
        isLoading={isLoading}
      />
      <Input
        name="type"
        label="Type"
        value={formData?.type}
        onChange={handleInputChange}
        disabled
        error={formErrors?.type}
        isLoading={isLoading}
      />
      <Input
        name="options"
        label="Options"
        value={formData?.options}
        onChange={handleInputChange}
        disabled
        error={formErrors?.options}
        isLoading={isLoading}
      />
      <Input
        name="oem"
        label="OEM"
        value={formData?.oem}
        onChange={handleInputChange}
        disabled
        error={formErrors?.oem}
        isLoading={isLoading}
      />
      <Input
        name="camera"
        label="Camera"
        value={formData?.camera}
        onChange={handleInputChange}
        disabled
        error={formErrors?.camera}
        isLoading={isLoading}
      />
      <Input
        name="channel"
        label="Channel"
        value={formData?.channel}
        onChange={handleInputChange}
        disabled
        error={formErrors?.channel}
        isLoading={isLoading}
      />

      <Input
        name="lockset"
        label="Lockset"
        value={formData?.lockset}
        onChange={handleInputChange}
        disabled
        error={formErrors?.lockset}
        isLoading={isLoading}
      />
      <Input
        name="facegate"
        label="Facegate"
        value={formData?.facegate}
        onChange={handleInputChange}
        disabled
        error={formErrors?.facegate}
        isLoading={isLoading}
      />
      <Input
        name="subnode"
        label="Subnode"
        value={formData?.subnode}
        onChange={handleInputChange}
        disabled
        error={formErrors?.subnode}
        isLoading={isLoading}
      />
      <Selector
        name="node_type"
        label="Node Type"
        value={formData?.node_type}
        options={licenseNodeTypesOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.node_type}
        isLoading={isLoading}
      />
      <SwitchButton
        name="elevator"
        label="Elevator"
        checked={formData?.elevator}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <Input
        name="lockset2"
        label="Lockset 2"
        value={formData?.lockset2}
        onChange={handleInputChange}
        disabled
        error={formErrors?.lockset2}
        isLoading={isLoading}
      />
      <Input
        name="version"
        label="Version"
        value={formData?.version}
        onChange={handleInputChange}
        disabled
        error={formErrors?.version}
        isLoading={isLoading}
      />
      <div>
        {disabled ||
          (typeof handleInputChange === 'undefined' && (
            <Input
              name="licensed"
              label="Licensed"
              value={formData?.licensed ? 'Yes' : 'No'}
              onChange={handleInputChange}
              disabled={disabled || typeof handleInputChange === 'undefined'}
              error={formErrors?.licensed}
              isLoading={isLoading}
            />
          ))}
      </div>
      <div>
        {disabled ||
          (typeof handleInputChange === 'undefined' && (
            <Input
              name="eula"
              label="EULA"
              value={formData?.eula ? 'Yes' : 'No'}
              onChange={handleInputChange}
              disabled={disabled || typeof handleInputChange === 'undefined'}
              error={formErrors?.eula}
              isLoading={isLoading}
            />
          ))}
      </div>
    </FormCardWithHeader>
  )
}

export default LicenseForm
