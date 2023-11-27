import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import InputsContainer from 'components/HOC/style/form/InputsContainer'
import Input from 'components/atomic/Input'
import MultiSelectListLoading from 'components/loading/form/MultiSelectListLoading'
import compareArrays from 'utils/compareArrays'
import Icon, { leftArrowIcon, rightArrowIcon } from 'utils/icons'

interface MultiSelectOption {
  id: string
  label: string
}

interface MultiSelectProps {
  name: string
  label?: string
  value?: string[]
  onChange?: (name: string, value: string[]) => void
  options?: MultiSelectOption[]
  helpText?: string
  error?: string | null
  isLoading?: boolean
  disabled?: boolean
}

function MultiSelect({
  name,
  label,
  value = [],
  onChange,
  options = [],
  helpText,
  error,
  isLoading = false,
  disabled = false,
}: MultiSelectProps) {
  const [leftOptions, setLeftOptions] = useState<MultiSelectOption[]>([])
  const [rightOptions, setRightOptions] = useState<MultiSelectOption[]>([])
  const optionsRef = useRef<MultiSelectOption[]>()
  const valueRef = useRef<string[]>()

  const [selectedLeftOptions, setSelectedLeftOptions] = useState<string[]>([])
  const [selectedRightOptions, setSelectedRightOptions] = useState<string[]>([])
  const [leftSearch, setLeftSearch] = useState<string>('')
  const [rightSearch, setRightSearch] = useState<string>('')

  const [leftOptionsFiltered, setLeftOptionsFiltered] = useState<MultiSelectOption[]>([])
  const [rightOptionsFiltered, setRightOptionsFiltered] = useState<MultiSelectOption[]>([])

  useEffect(() => {
    if (
      JSON.stringify(options) !== JSON.stringify(optionsRef.current) ||
      (JSON.stringify(value) !== JSON.stringify(valueRef) && value.length)
    ) {
      setLeftOptions(options.filter((option) => !value.includes(option.id)))
      setRightOptions(options.filter((option) => value.includes(option.id)))
    }
    optionsRef.current = options
    valueRef.current = value
  }, [options])

  const handleLeftSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeftOptions(Array.from(e.target.selectedOptions).map((o) => o.value))
  }
  const handleRightSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRightOptions(Array.from(e.target.selectedOptions).map((o) => o.value))
  }

  const handleMoveLeft = () => {
    if (disabled || leftOptions.length === 0) {
      return
    }
    setRightOptions([
      ...rightOptions,
      ...leftOptions.filter((option) => selectedLeftOptions.includes(option.id)),
    ])
    setLeftOptions(leftOptions.filter((option) => !selectedLeftOptions.includes(option.id)))
    setSelectedLeftOptions([])
  }

  const handleMoveRight = () => {
    if (disabled || rightOptions.length === 0) {
      return
    }
    setLeftOptions([
      ...leftOptions,
      ...rightOptions.filter((option) => selectedRightOptions.includes(option.id)),
    ])
    setRightOptions(rightOptions.filter((option) => !selectedRightOptions.includes(option.id)))
    setSelectedRightOptions([])
  }

  useEffect(() => {
    if (leftSearch === '') {
      setLeftOptionsFiltered(leftOptions)
    } else {
      setLeftOptionsFiltered(
        leftOptions.filter((option) =>
          option.label.toLowerCase().includes(leftSearch.toLowerCase())
        )
      )
    }
  }, [leftSearch, leftOptions])

  useEffect(() => {
    if (rightSearch === '') {
      setRightOptionsFiltered(rightOptions)
    } else {
      setRightOptionsFiltered(
        rightOptions.filter((option) =>
          option.label.toLowerCase().includes(rightSearch.toLowerCase())
        )
      )
    }
  }, [rightSearch, rightOptions])

  useEffect(() => {
    const assignValue = rightOptions.map((option) => option.id)

    if (
      onChange &&
      !compareArrays(assignValue, value)
      // &&
      // !!assignValue.length
    ) {
      onChange(
        name,
        rightOptions.map((option) => option.id)
      )
    }
  }, [rightOptions])

  return (
    <div className="w-full space-y-0.5">
      {label && (
        <label className="inline-block w-full text-sm text-gray-700 form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="flex gap-4 sm:gap-6 md:gap-4 xl:gap-8">
        <InputsContainer>
          <Input
            name="leftSearch"
            value={leftSearch}
            onChange={(n, inputValue) => setLeftSearch(inputValue)}
            disabled={disabled}
            isLoading={isLoading}
          />

          <div>
            {isLoading ? (
              <MultiSelectListLoading />
            ) : (
              <select
                multiple
                onChange={handleLeftSelect}
                disabled={disabled}
                className="w-full px-1 py-1.5 text-sm m-0 transition ease-in-out border border-gray-300 border-solid rounded-md focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none min-h-[10rem]"
              >
                {leftOptionsFiltered.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </InputsContainer>

        <div className="min-h-max">
          <div className="flex items-center justify-center h-full">
            <div className="mt-16 space-y-2">
              <Icon
                icon={rightArrowIcon}
                className={classNames(
                  'px-3 py-1 text-lg text-white bg-gray-400 rounded-md md:text-2xl md:px-4 md:py-2'
                  // isRightArrowDisabled()
                  //     ? "opacity-50 cursor-default"
                  //     : "cursor-pointer",
                )}
                onClick={handleMoveLeft}
              />

              <Icon
                icon={leftArrowIcon}
                className={classNames(
                  'px-3 py-1 text-lg text-white bg-gray-400 rounded-md md:text-2xl md:px-4 md:py-2'
                  // isLeftArrowDisabled()
                  //     ? "opacity-50 cursor-default"
                  //     : "cursor-pointer",
                )}
                onClick={handleMoveRight}
              />
            </div>
          </div>
        </div>
        <InputsContainer>
          <Input
            name="searchRight"
            value={rightSearch}
            onChange={(n, inputValue) => setRightSearch(inputValue)}
            disabled={disabled}
            isLoading={isLoading}
          />
          <div>
            {isLoading ? (
              <MultiSelectListLoading />
            ) : (
              <select
                multiple
                onChange={handleRightSelect}
                disabled={disabled}
                className="w-full px-1 py-1.5 text-sm m-0 transition ease-in-out border border-gray-300 border-solid rounded-md focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none min-h-[10rem]"
              >
                {rightOptionsFiltered.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </InputsContainer>
      </div>
      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default MultiSelect
