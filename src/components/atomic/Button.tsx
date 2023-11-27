import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { TButtonColor, TButtonSize, TButtonType } from 'types/components/buttons'
import LoadingTextWithSvg from '../loading/atomic/LoadingTextWithSvg'

interface IProps {
  type?: TButtonType
  size?: TButtonSize
  color?: TButtonColor
  isLoading?: boolean
  link?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  children: JSX.Element | JSX.Element[] | string
}

function Button({
  type = 'button',
  size = 'base',
  color = 'primary',
  isLoading,
  link,
  onClick,
  className,
  children,
}: IProps) {
  const buttonClassNames = classNames(
    'custom_transition inline-flex items-center justify-center text-sm font-normal rounded-md hover:shadow-all-side gap-1.5 px-3',
    size === 'small' && 'py-1 small min-w-[74px]',
    size === 'base' && 'py-2 base min-w-[100px]',
    size === 'large' && 'py-3 large min-w-[120px]',
    color === 'primary'
      ? 'bg-primary text-white hover:bg-white hover:text-primary'
      : 'bg-[#e9e9e989] text-primary hover:bg-white',
    isLoading ? 'cursor-wait' : 'cursor-pointer',
    className
  )

  if (link) {
    return (
      <Link to={link} className={buttonClassNames}>
        {isLoading ? <LoadingTextWithSvg size={size} /> : children}
      </Link>
    )
  }
  return (
    <button className={buttonClassNames} type={type} onClick={onClick}>
      {isLoading ? <LoadingTextWithSvg size={size} /> : children}
    </button>
  )
}

export default Button
