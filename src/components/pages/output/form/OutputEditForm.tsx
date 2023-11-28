import { inputApi, partitionApi } from '../../../../api/urls'
import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Input from '../../../../components/atomic/Input'
import SwitchButtonSelect from '../../../../components/atomic/SelectSwitch'
import Selector from '../../../../components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors, IListServerResponse } from '../../../../types/pages/common'
import { IInputResult } from '../../../../types/pages/input'
import { IOutputEditFormData, outputTypeOptions } from '../../../../types/pages/output'
import { IPartitionResult } from '../../../../types/pages/partition'
import { SERVER_QUERY } from '../../../../utils/config'
import { doorIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData?: IOutputEditFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function OutputEditForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: inputIsLoading, data: inputData } = useSWR<
    IListServerResponse<IInputResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined' || formData?.FollowInput?.value === '0'
      ? null
      : inputApi.list(`${SERVER_QUERY.selectorDataQuery}&NodeNo=${formData?.Node?.value}`)
  )

  return (
    <FormCardWithHeader icon={doorIcon} header={t`Output`}>
      <Selector
        name="Partition"
        label={t`Partition`}
        value={formData?.Partition}
        options={partitionData?.data.map((result) => ({
          value: result.PartitionNo.toString(),
          label: result.PartitionName,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Partition}
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="OutputName"
        label={t`Output Name`}
        value={formData?.OutputName}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.OutputName}
        isLoading={isLoading}
      />
      <Input
        name="OutputDesc"
        label={t`Description`}
        value={formData?.OutputDesc}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.OutputDesc}
        isLoading={isLoading}
      />
      <SwitchButtonSelect
        name="FollowInput"
        label={t`Follow Input`}
        value={formData?.FollowInput}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.FollowInput?.value === '1' && (
        <Selector
          name="Input"
          label={t`Input`}
          value={formData?.Input}
          options={inputData?.data.map((result) => ({
            value: result.InputNo.toString(),
            label: result.InputName,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.Input}
          isLoading={isLoading || inputIsLoading}
        />
      )}
      <Selector
        name="OutputType"
        label={t`Output Type`}
        value={formData?.OutputType}
        options={outputTypeOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.OutputType}
        isLoading={isLoading}
      />
      <Input
        name="OnTime"
        type="number"
        label={t`On Time`}
        value={formData?.OnTime}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.OnTime}
        isLoading={isLoading}
      />
      <Input
        name="OffTime"
        type="number"
        label={t`Off Time`}
        value={formData?.OffTime}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.OffTime}
        isLoading={isLoading}
      />
      <Input
        name="Repeat"
        type="number"
        label={t`Repeat`}
        value={formData?.Repeat}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Repeat}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default OutputEditForm
