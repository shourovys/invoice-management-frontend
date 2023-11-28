import classNames from 'classnames'
import { THandleInputSelect } from '../../types/components/common'
import { ERROR_CLASS, INPUT_FIELD_HEIGHT } from '../../utils/config'
import InputLoading from '../loading/atomic/InputLoading'
import Checkbox from './Checkbox'

interface IProps {
  name: string
  label?: string
  multiple?: boolean
  isLoading?: boolean
  helpText?: string
  error?: string | null
  onChange?: (name: string, value: FileList | null) => void
  disabled?: boolean
  // props for checkbox in label
  isSelected?: boolean
  handleSelect?: THandleInputSelect
}

function FileInput({
  name,
  label = '',
  multiple,
  isLoading,
  helpText,
  error,
  onChange,
  disabled = false,
  isSelected,
  handleSelect,
}: IProps) {
  return (
    <div className="w-full space-y-0.5">
      {label && (
        <>
          {handleSelect ? (
            <div className="py-0.5">
              <Checkbox
                label={label}
                value={name}
                checked={isSelected}
                onChange={(checked) => {
                  handleSelect(name, checked)
                }}
              />
            </div>
          ) : (
            <label className="inline-block w-full text-sm text-gray-700 form-label" htmlFor={name}>
              {label}
            </label>
          )}
        </>
      )}
      {isLoading ? (
        <InputLoading />
      ) : (
        <input
          id={name}
          name={name}
          type="file"
          multiple={multiple}
          onChange={(e) => (onChange ? onChange(name, e.target.files) : null)}
          className={classNames(
            'form-control block w-full file:px-3 text-sm font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none disabled:bg-[#F0F1F3] disabled:text-gray-600',
            // button colors
            ' file:text-gray-800',
            // button shape and spacing
            'file:rounded-md file:rounded-tr-none file:rounded-br-none',
            'file:px-4 file:py-1.5 file:mr-4 file:border-none',
            // overall input styling
            'hover:cursor-pointer border rounded-lg text-gray-400',
            !disabled && label && 'shadow-all-side',
            error && ERROR_CLASS
          )}
          style={{ height: INPUT_FIELD_HEIGHT }}
          disabled={disabled}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default FileInput
