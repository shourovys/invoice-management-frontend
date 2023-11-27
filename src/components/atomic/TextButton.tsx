import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { TButtonColor, TButtonType } from 'types/components/buttons'
import Icon, { TIcon } from 'utils/icons'
import LoadingSvg from '../loading/atomic/LoadingSvg'

interface IInputProps {
  type?: TButtonType
  icon?: TIcon
  color?: TButtonColor
  iconClass?: string
  isLoading?: boolean
  link?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: string
  // children: JSX.Element | JSX.Element[] | string;
}

function TextButton({
  type = 'button',
  icon,
  color,
  iconClass,
  link,
  isLoading,
  onClick,
  children,
}: IInputProps) {
  const buttonIcon = isLoading ? (
    <div className={classNames(color === 'gray' ? 'text-primary' : 'text-black')}>
      <LoadingSvg size="small" />
    </div>
  ) : (
    icon && (
      <Icon
        icon={icon}
        className={classNames(color === 'gray' ? 'text-primary' : 'text-black', iconClass)}
      />
    )
  )

  if (link) {
    return (
      <Link
        to={link}
        className={classNames(
          'flex items-center w-full gap-2 px-4 py-2 text-sm',
          isLoading ? 'text-gray-400' : 'text-black'
        )}
      >
        {buttonIcon}
        {children}
      </Link>
    )
  }
  return (
    <button
      className={classNames(
        'flex items-center w-full gap-2 px-4 py-2 text-sm',
        isLoading ? 'text-gray-400' : 'text-black'
      )}
      type={type}
      onClick={onClick}
    >
      {buttonIcon}
      {children}
    </button>
  )
}

export default TextButton
