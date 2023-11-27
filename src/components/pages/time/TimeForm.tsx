import { timeApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, ISingleServerResponse } from 'types/pages/common'
import { ITimeFormData } from 'types/pages/time'
import { doorIcon } from 'utils/icons'

interface IProps {
  formData?: ITimeFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function TimeForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: allTimezoneLoading, data: allTimezoneData } = useSWR<
    ISingleServerResponse<string[]>
  >(disabled || typeof handleInputChange === 'undefined' ? null : timeApi.timezone)

  return (
    <FormCardWithHeader icon={doorIcon} header="Time">
      <Selector
        name="timezone"
        label="Timezone"
        value={formData?.timezone}
        options={allTimezoneData?.results.map((option) => ({
          label: option,
          value: option,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.timezone}
        isLoading={isLoading || allTimezoneLoading}
      />
      <SwitchButton
        name="ntp"
        label="NTP"
        checked={formData?.ntp}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      <div>
        {(formData?.ntp || disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="current_time"
            type="datetime-local"
            label="Current Time"
            value={formData?.current_time}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.current_time}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default TimeForm
