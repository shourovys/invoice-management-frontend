import classNames from 'classnames'
import Datepicker from 'react-tailwindcss-datepicker'
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'
import { ERROR_CLASS } from 'utils/config'
import InputLoading from '../loading/atomic/InputLoading'

interface IProps {
  name: string
  label?: string
  value: {
    startDate: null | string
    endDate: null | string
  }
  placeholder?: string
  singleDate?: boolean
  isLoading?: boolean
  helpText?: string
  error?: string | null
  onChange?: (name: string, value: DateValueType) => void
  disabled?: boolean
}
function DateInput({
  name,
  label = '',
  value,
  placeholder,
  singleDate = true,
  isLoading,
  helpText,
  error,
  onChange,
  disabled = false,
}: IProps) {
  return (
    <div className="w-full space-y-0.5">
      {label && (
        <label className="inline-block w-full text-sm text-gray-700 form-label" htmlFor={name}>
          {label}
        </label>
      )}
      {isLoading ? (
        <InputLoading />
      ) : (
        <Datepicker
          primaryColor="#006AFE"
          asSingle={singleDate}
          useRange={!singleDate}
          value={value}
          placeholder={placeholder}
          onChange={(newValue) => (onChange ? onChange(name, newValue) : null)}
          inputClassName={classNames(
            'form-control w-full h-[33.6px] px-3 text-sm font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 focus:border-gray-300 dark:border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none focus:ring-0',
            !disabled && label && 'shadow-all-side',
            disabled && 'bg-[#F0F1F3] disabled:text-gray-600 disabled:opacity-100',
            error && ERROR_CLASS
          )}
          containerClassName={classNames(
            disabled && 'bg-[#F0F1F3] text-gray-600 rounded-md cursor-default'
          )}
          disabled={disabled}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default DateInput
