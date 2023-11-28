import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const useClock = (date?: string | null) => {
  let d = dayjs().unix()
  if (date) {
    // yyyy-mm-ddThh:mm:ss
    d = dayjs(date, { utc: true }).unix()
  }

  const [timeUnix, setTimeUnix] = useState<number>(d)

  useEffect(() => {
    if (date) {
      setTimeUnix(dayjs(date, { utc: true }).unix())
    }
  }, [date])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUnix((prevState) => prevState + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return timeUnix
}

export default useClock
