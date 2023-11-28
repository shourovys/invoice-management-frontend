import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export type TimeFormatType = 'HH:mm:ss' | 'hh:mm A'
export type DateFormatType = 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY'

export const timeFormat: TimeFormatType =
  (localStorage.getItem('time_format') as TimeFormatType) || 'HH:mm:ss'

export const dateFormat: DateFormatType =
  (localStorage.getItem('date_format') as DateFormatType) || 'YYYY-MM-DD'

export const systemTimezone = localStorage.getItem('timezone') || 'UTC'

export const dateTimeFormat = `${dateFormat} ${timeFormat}`

// export const formatTimeView = (timeStr: string) => {
//   return dayjs(timeStr).format(timeFormat)
// }

// export const formatTimeViewFromNumber = (timestamp: number) => {
//   return dayjs.unix(timestamp).format(timeFormat)
// }

export const formatDateView = (dateStr: string) => {
  return dayjs(dateStr).utcOffset(0).format(dateFormat)
}

export const formatDateTzView = (dateStr: string) => {
  return dayjs(dateStr).tz(systemTimezone).format(dateFormat)
}

//
// export const formatDateViewFromNumber = (timestamp: number) => {
//   return dayjs.unix(timestamp).format(dateFormat)
// }

export const formatDateTimeView = (dateStr: string | number) => {
  if (typeof dateStr === 'number') {
    return dayjs.unix(dateStr).utcOffset(0).format(dateTimeFormat)
  }
  return dayjs(dateStr).utcOffset(0).format(dateTimeFormat)
}

export const formatDateTimeTzView = (timestamp: number) => {
  return dayjs.unix(timestamp).tz(systemTimezone).format(dateTimeFormat)
}

// export const formatMomentView = (datetime: dayjs.Dayjs) => {
//   return datetime.format(dateTimeFormat)
// }

export const htmlInputDatetimeFormatter = (
  dateStr: string | number,
  timezone: string | null = null
) => {
  if (timezone) {
    // todo: fix timezone
    return dayjs(dateStr).format('YYYY-MM-DDTHH:mm:ss')
  }
  return dayjs(dateStr).format('YYYY-MM-DDTHH:mm:ss')
}
