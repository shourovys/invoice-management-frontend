import { inputApi, outputApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData } from 'types/pages/door'
import { IInputResult } from 'types/pages/input'
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

function DoorBuglarAlarmForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const { isLoading: outputIsLoading, data: outputData } = useSWR<
    IListServerResponse<IOutputResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : outputApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: inputIsLoading, data: inputData } = useSWR<
    IListServerResponse<IInputResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : inputApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={listIcon} header="Buglar Alarm">
      <SwitchButton
        name="burg_alarm_enable"
        checked={formData?.burg_alarm_enable}
        onChange={handleInputChange}
        label="Burg Alarm Enable"
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.burg_alarm_enable && (
        <Selector
          name="burg_output"
          label="Burglar Alarm Output"
          value={formData?.burg_output}
          options={outputData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.burg_output}
          isLoading={isLoading || outputIsLoading}
        />
      )}

      {formData?.burg_alarm_enable && (
        <Selector
          name="burg_input"
          label="Burglar Alarm Input"
          value={formData?.burg_input}
          options={outputData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.burg_input}
          isLoading={isLoading || outputIsLoading}
        />
      )}

      {formData?.burg_alarm_enable && (
        <SwitchButton
          name="burg_zone_enable"
          checked={formData?.burg_zone_enable}
          onChange={handleInputChange}
          label="Burg Alarm Enable"
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading}
        />
      )}

      {formData?.burg_alarm_enable && formData?.burg_zone_enable && (
        <Selector
          name="burg_zone_input"
          label="Burglar Zone Input"
          value={formData?.burg_zone_input}
          options={inputData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.burg_zone_input}
          isLoading={isLoading || inputIsLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorBuglarAlarmForm
