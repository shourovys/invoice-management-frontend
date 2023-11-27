import classNames from 'classnames'
import Select from 'react-tailwindcss-select'
import { ERROR_CLASS } from 'utils/config'
import InputLoading from '../loading/atomic/InputLoading'

export interface ISelectOption {
  value: string
  label: string
}
export type TSelectValue = ISelectOption | ISelectOption[] | null | undefined

interface IProps {
  name: string
  label?: string
  value?: ISelectOption | null
  options?: ISelectOption[]
  placeholder?: string
  isLoading?: boolean
  multiple?: boolean
  helpText?: string
  error?: string | null
  onChange?: (name: string, selectedValue: TSelectValue) => void
  disabled?: boolean
}

function Selector({
  name,
  label = '',
  value = null,
  options = [],
  placeholder = 'Select your option',
  isLoading,
  multiple = false,
  helpText,
  error,
  onChange,
  disabled = false,
}: IProps) {
  const handleChange = (selected: TSelectValue) => {
    if (onChange) {
      onChange(name, selected)
    }
  }

  return (
    <div className="w-full space-y-0.5">
      {label && (
        <label htmlFor={name} className="inline-block w-full text-sm text-gray-700 form-label">
          {label}
        </label>
      )}
      {isLoading ? (
        <InputLoading />
      ) : (
        <Select
          primaryColor="#006AFE"
          // name={name}
          // id={name}
          value={value}
          onChange={handleChange}
          isMultiple={multiple}
          isDisabled={disabled}
          classNames={{
            menuButton: (arg) =>
              classNames(
                'flex pl-3 h-[34px] items-center justify-between text-sm font-normal bg-white border border-solid border-gray-300 rounded-md focus:text-gray-700',
                !arg?.isDisabled && label && 'shadow-all-side text-gray-600',

                !arg?.isDisabled
                  ? 'focus:bg-white focus:border-primary focus:outline-none '
                  : 'bg-[#F0F1F3]',
                value?.label ? 'text-black' : 'text-gray-400',
                error && ERROR_CLASS
              ),
            // menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
            // listItem: ({ isSelected }) =>
            //     `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
            //         isSelected
            //             ? `text-white bg-blue-500`
            //             : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
            //     }`,
          }}
          options={options}
          placeholder={placeholder}
          isClearable
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}

      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default Selector
