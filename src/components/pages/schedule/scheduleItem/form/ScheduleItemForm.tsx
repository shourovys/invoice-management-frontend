import FormCardWithHeader from '../../../../../components/HOC/FormCardWithHeader'
import DateInput from '../../../../../components/atomic/DateInput'
import Input from '../../../../../components/atomic/Input'
import MultipleCheckbox from '../../../../../components/atomic/MultipleCheckbox'
import Selector from '../../../../../components/atomic/Selector'
import { THandleDateChange, THandleInputChange } from '../../../../../types/components/common'
import { INewFormErrors } from '../../../../../types/pages/common'
import {
  IScheduleItemFormData,
  scheduleTimeTypeOptions,
  scheduleTypeOptions,
  scheduleWeekdaysOptions,
} from '../../../../../types/pages/scheduleItem'
import { scheduleIcon } from '../../../../../utils/icons'
import t from '../../../../../utils/translator'
import TimeInput from '../../../../atomic/Generic/TimeInput'

interface IProps {
  formData?: IScheduleItemFormData
  handleInputChange?: THandleInputChange
  formErrors?: INewFormErrors<IScheduleItemFormData>
  disabled?: boolean
  isLoading?: boolean
}

function ScheduleItemForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const handleDateChange: THandleDateChange = (name, value) => {
    if (handleInputChange) {
      handleInputChange(name, value?.startDate)
    }
  }

  return (
    <FormCardWithHeader icon={scheduleIcon} header={t`Schedule Item`} twoPart={false}>
      <div className="grid grid-cols-1 gap-y-3 gap-x-8 sm:grid-cols-2">
        <Selector
          name="ScheduleType"
          label={t`Schedule Type`}
          value={formData?.ScheduleType}
          options={scheduleTypeOptions}
          isClearable={false}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.ScheduleType}
          isLoading={isLoading}
        />

        {formData?.ScheduleType?.value === '1' && (
          <MultipleCheckbox
            name="Weekdays"
            inputLabel="Weekdays"
            checkboxData={scheduleWeekdaysOptions}
            checked={formData?.Weekdays}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.Weekdays}
            isLoading={isLoading}
          />
        )}

        {formData?.ScheduleType?.value === '2' && (
          <Input
            name="Monthday"
            label={t`Month Day`}
            type="number"
            value={formData?.Monthday}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.Monthday}
            isLoading={isLoading}
          />
        )}

        {formData?.ScheduleType?.value === '3' && (
          <DateInput
            name="OneDate"
            label={t`One Date`}
            value={{
              startDate: formData.OneDate ? formData.OneDate : null,
              endDate: formData.OneDate ? formData.OneDate : null,
            }}
            onChange={handleDateChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.OneDate}
            isLoading={isLoading}
            // format="YYYY-MM-DD"
          />
        )}

        <Selector
          name="TimeType"
          label={t`Time Type`}
          value={formData?.TimeType}
          options={scheduleTimeTypeOptions}
          isClearable={false}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.TimeType}
          isLoading={isLoading}
        />

        {formData?.TimeType?.value === '0' && (
          <TimeInput
            name="StartTime"
            label={t`Start Time`}
            value={formData?.StartTime}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.StartTime}
            isLoading={isLoading}
            // format="HH:mm"
          />
        )}

        {formData?.TimeType?.value === '0' && (
          <TimeInput
            name="EndTime"
            label={t`End Time`}
            value={formData?.EndTime}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.EndTime}
            isLoading={isLoading}
            // format="HH:mm"
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default ScheduleItemForm
