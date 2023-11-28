import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import useSWR from 'swr'
import { timeApi } from '../../../api/urls'
import Selector from '../../../components/atomic/Selector'
import SwitchButtonSelect from '../../../components/atomic/SelectSwitch'
import FormCardWithHeader from '../../../components/HOC/FormCardWithHeader'
import useClock from '../../../hooks/useClock'
import { THandleInputChange } from '../../../types/components/common'
import { IFormErrors, ISingleServerResponse } from '../../../types/pages/common'
import { ITimeFormData } from '../../../types/pages/time'
import { doorIcon } from '../../../utils/icons'
import t from '../../../utils/translator'
import DateTimeInput from '../../atomic/DateTimeInput'

dayjs.extend(utc)

interface IProps {
  formData?: ITimeFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function TimeForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const currentTime = useClock(formData?.CurrentTime)

  const currentTimeDayjs = dayjs.unix(currentTime).utc(false).format('YYYY-MM-DDTHH:mm')

  const { isLoading: allTimezoneLoading, data: allTimezoneData } = useSWR<
    ISingleServerResponse<string[]>
  >(disabled || typeof handleInputChange === 'undefined' ? null : timeApi.timezone)

  return (
    <FormCardWithHeader icon={doorIcon} header={t`Time`}>
      <Selector
        name="Timezone"
        label={t`Timezone`}
        value={formData?.Timezone}
        options={allTimezoneData?.data.map((option) => ({
          label: option,
          value: option,
        }))}
        onChange={handleInputChange}
        isSearchable
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Timezone}
        isLoading={isLoading || allTimezoneLoading}
      />
      <SwitchButtonSelect
        name="Ntp"
        label={t`NTP`}
        value={formData?.Ntp}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {/*{(formData?.Ntp?.value === '0' || disabled || typeof handleInputChange === 'undefined') && (*/}
      {/*  <Input*/}
      {/*    name="CurrentTime"*/}
      {/*    type={disabled || typeof handleInputChange === 'undefined' ? 'text' : 'datetime-local'}*/}
      {/*    label={t`Current Time`}*/}
      {/*    value={currentTime}*/}
      {/*    onChange={handleInputChange}*/}
      {/*    disabled={disabled || typeof handleInputChange === 'undefined'}*/}
      {/*    error={formErrors?.CurrentTime}*/}
      {/*    isLoading={isLoading}*/}
      {/*    step={1}*/}
      {/*  />*/}
      {/*)} */}

      {(formData?.Ntp?.value === '0' || disabled || typeof handleInputChange === 'undefined') && (
        <DateTimeInput
          name="CurrentTime"
          label={t`Current Time`}
          value={currentTimeDayjs}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.CurrentTime}
          isLoading={isLoading}
          format="yyyy-MM-dd HH:mm"
        />
      )}
    </FormCardWithHeader>
  )
}

export default TimeForm
