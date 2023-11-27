import { useEffect, useState } from 'react'

type ClockProps = {
  date?: string
  timeZone?: string
}

const useClock = ({ date, timeZone = 'America/New_York' }: ClockProps = {}) => {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    if (date) {
      const parsedDate = new Date(date)
      if (!Number.isNaN(parsedDate.getTime())) {
        setTime(parsedDate)
      }
    }

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [date])

  return time.toLocaleString('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export default useClock
