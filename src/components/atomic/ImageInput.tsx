import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { ERROR_CLASS, serverImageUrlBase } from 'utils/config'
import ImageInputLoading from '../loading/atomic/ImageInputLoading'

interface IProps {
  name: string
  label?: string
  value?: File | string | null | undefined
  placeholder?: string
  isLoading?: boolean
  helpText?: string
  error?: string | null
  onChange?: (name: string, value: File) => void
  disabled?: boolean
}
function ImageInput({
  name,
  label = '',
  value,
  placeholder = 'Select a photo',
  isLoading,
  helpText,
  error,
  onChange,
  disabled = false,
}: IProps) {
  const [previewSrc, setPreviewSrc] = useState<File | string | null | undefined>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0])
      setPreviewSrc(src)
      if (onChange) {
        onChange(name, event.target.files[0])
      }
    }
  }

  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreviewSrc(value)
    }
  }, [value])

  const isServerUrl =
    previewSrc && typeof previewSrc === 'string' && previewSrc.split('/')[1] === 'images'

  return (
    <div className="space-y-0.5 min-w-max w-full">
      {label && (
        <label className="inline-block text-sm text-gray-700 form-label" htmlFor={name}>
          {label}
        </label>
      )}
      {isLoading ? (
        <ImageInputLoading />
      ) : (
        <div className="flex items-center justify-center w-auto max-w-min">
          <label
            htmlFor={name}
            className={classNames(
              'flex flex-col h-[106px] border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 w-[250px] rounded-md',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              error && ERROR_CLASS
            )}
          >
            <div className="relative flex flex-col items-center justify-center pt-2">
              {!isServerUrl && previewSrc && typeof previewSrc === 'string' && (
                <img
                  id="preview"
                  className="absolute inset-0 w-full h-[98px] object-contain"
                  src={previewSrc}
                  alt=""
                />
              )}
              {isServerUrl && (
                <img
                  id="preview"
                  className="absolute inset-0 w-full h-[98px] object-contain"
                  src={serverImageUrlBase + previewSrc}
                  alt=""
                />
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                {placeholder}
              </p>
            </div>
            <input
              id={name}
              type="file"
              ref={fileInputRef}
              className="opacity-0"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled}
            />
          </label>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500 md:text-sm">{error}</p>}
      {helpText && <p className="mt-1 text-xs text-gray-500 md:text-sm">{helpText}</p>}
    </div>
  )
}

export default ImageInput
