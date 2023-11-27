import { outputApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData } from 'types/pages/door'
import { IOutputResult } from 'types/pages/output'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorAlertForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: outputIsLoading, data: outputData } = useSWR<
    IListServerResponse<IOutputResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : outputApi.list(SERVER_QUERY.selectorDataQuery)
  )
  return (
    <FormCardWithHeader icon={listIcon} header="Alert">
      <SwitchButton
        name="forced_enable"
        label="Forced Alert Enable"
        checked={formData?.forced_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <SwitchButton
        name="propped_enable"
        label="Propped Alert Enable"
        checked={formData?.propped_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.forced_enable && formData?.propped_enable && (
        <Selector
          name="alert_output"
          label="Alert Output"
          value={formData?.alert_output}
          options={outputData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.alert_output}
          isLoading={isLoading || outputIsLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorAlertForm
