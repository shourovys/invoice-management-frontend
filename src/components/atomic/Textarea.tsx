import classNames from 'classnames'
import { ERROR_CLASS } from 'utils/config'

interface IInputProps {
  name: string
  label?: string
  value?: string
  placeholder?: string
  helpText?: string
  error?: string | null
  row?: number
  onChange: (name: string, value: string) => void
  disabled?: boolean
}
function Textarea({
  name,
  label = '',
  value,
  placeholder,
  helpText,
  error,
  row = 8,
  onChange,
  disabled = false,
}: IInputProps) {
  return (
    <div className="w-full space-y-0.5">
      {label && (
        <label className="inline-block w-full text-sm text-gray-700 form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        rows={row}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={classNames(
          'form-control block w-full px-3 py-1.5 text-sm font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none disabled:bg-[#F0F1F3] disabled:text-gray-600',
          !disabled && label && 'shadow-all-side',
          error && ERROR_CLASS
        )}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default Textarea
