import classNames from 'classnames'
import { ERROR_CLASS } from 'utils/config'
import InputLoading from '../loading/atomic/InputLoading'

interface IProps {
  type?: string
  name: string
  label?: string
  value?: string | number
  placeholder?: string
  isLoading?: boolean
  helpText?: string
  error?: string | null
  onChange?: (name: string, value: string) => void
  disabled?: boolean
}
function Input({
  type = 'text',
  name,
  label = '',
  value,
  placeholder,
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
        <input
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={(e) => (onChange ? onChange(name, e.target.value) : null)}
          className={classNames(
            'form-control block w-full px-3 py-1.5 text-sm font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none disabled:bg-[#F0F1F3] disabled:text-gray-600',
            !disabled && label && 'shadow-all-side',
            error && ERROR_CLASS,
            !value &&
              placeholder &&
              `before:content-['${placeholder}'] before:mr-4 before:text-gray-400`
          )}
          disabled={disabled}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default Input
