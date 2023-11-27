import { INPUT_FIELD_HEIGHT } from 'utils/config'
import InputLoading from '../loading/atomic/InputLoading'
import Checkbox from './Checkbox'

interface ICheckboxData {
  value: string
  label: string
}

interface IProps {
  name: string
  inputLabel?: string
  checked?: string[]
  checkboxData?: ICheckboxData[]
  isLoading?: boolean
  helpText?: string
  error?: string | null
  onChange?: (name: string, value: string[]) => void
  disabled?: boolean
}

function MultipleCheckbox({
  name,
  inputLabel,
  checked,
  checkboxData,
  isLoading,
  helpText,
  error,
  onChange,
  disabled = false,
}: IProps) {
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (onChange) {
      if (isChecked) {
        if (typeof checked !== 'undefined') {
          onChange(name, [...checked, value])
        } else {
          onChange(name, [value])
        }
      } else if (typeof checked !== 'undefined') {
        onChange(
          name,
          checked.filter((val) => val !== value)
        )
      }
    }
  }

  return (
    <div className="space-y-0.5">
      {inputLabel && (
        <p className="inline-block w-full text-sm text-gray-700 form-inputLabel">{inputLabel}</p>
      )}

      {isLoading ? (
        <InputLoading />
      ) : (
        <div className="flex gap-4" style={{ minHeight: INPUT_FIELD_HEIGHT }}>
          {checkboxData?.map(({ value, label }) => (
            <Checkbox
              key={value}
              value={value}
              checked={checked?.includes(value)}
              label={label}
              onChange={(isChecked) => handleCheckboxChange(value, isChecked)}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default MultipleCheckbox
