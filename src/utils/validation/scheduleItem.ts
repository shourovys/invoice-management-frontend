import { ISelectOption } from '../../components/atomic/Selector'
import { INewFormErrors } from '../../types/pages/common'
import { IScheduleItemFormData } from '../../types/pages/scheduleItem'
import t from '../../utils/translator'

const validateScheduleItemFormData = (
  formData: IScheduleItemFormData
): INewFormErrors<IScheduleItemFormData> => {
  const errors: INewFormErrors<IScheduleItemFormData> = {}

  if (!formData.ScheduleType?.value) {
    errors.ScheduleType = t`Schedule Type is required`
  } else {
    const { value } = formData.ScheduleType as ISelectOption
    if (value === '1' && !formData.Weekdays) {
      errors.Weekdays = t`Weekdays are required for Weekly schedule type`
    } else if (value === '2' && !formData.Monthday) {
      errors.Monthday = t`Month Day is required for Monthly schedule type`
    } else if (value === '3' && !formData.OneDate) {
      errors.OneDate = t`One Date is required for OneTime schedule type`
    }
  }

  if (!formData.TimeType?.value) {
    errors.TimeType = t`Time Type is required`
  } else {
    const { value } = formData.TimeType as ISelectOption
    if (value === '0' && !formData.StartTime) {
      errors.StartTime = t`Start Time is required for Normal time type`
    }
    if (value === '0' && !formData.EndTime) {
      errors.EndTime = t`End Time is required for Normal time type`
    }
  }

  return errors
}

export default validateScheduleItemFormData
