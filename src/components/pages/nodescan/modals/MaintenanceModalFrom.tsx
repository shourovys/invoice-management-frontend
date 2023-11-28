import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Selector from '../../../../components/atomic/Selector'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import {
  INodeScanUpdateFormData,
  nodeScanDefaultTypeOptions,
  nodeScanRebootTypeOptions,
  nodeScanUpdateTypeOptions,
} from '../../../../types/pages/nodeScan'
import { defaultIcon, rebootIcon, updateIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData: INodeScanUpdateFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function UpdateModalFieldFrom({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={updateIcon} header={t`Update`}>
      <Selector
        name="Type"
        label={t`Update Type`}
        value={formData.Type}
        options={nodeScanUpdateTypeOptions}
        isClearable={false}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Type}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

function RebootModalFieldFrom({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={rebootIcon} header={t`Reboot`}>
      <Selector
        name="Type"
        label={t`Reboot Type`}
        value={formData.Type}
        options={nodeScanRebootTypeOptions}
        isClearable={false}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Type}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

function DefaultModalFieldFrom({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={defaultIcon} header={t`Default`}>
      <Selector
        name="Type"
        label={t`Default Type`}
        value={formData.Type}
        options={nodeScanDefaultTypeOptions}
        isClearable={false}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Type}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export { DefaultModalFieldFrom, RebootModalFieldFrom, UpdateModalFieldFrom }
