import classNames from 'classnames'
import Icon, { TIcon } from 'utils/icons'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TIconButtonColor } from 'types/components/buttons'

interface IProps {
  color?: TIconButtonColor
  icon: TIcon
  tooltip: string
  iconClass?: string
  disabled?: boolean
  disabledText?: string
  link?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
function IconButton({
  color = 'black',
  icon,
  tooltip,
  iconClass,
  disabled,
  disabledText,
  link,
  onClick,
}: IProps) {
  const [isHover, setIsHover] = useState(false)

  const styleClass = classNames(
    'text-lg outline-none group',
    color === 'primary' && 'text-primary',
    color === 'red' && 'text-red-500 ',
    color === 'gray' && 'text-gray-500 ',
    color === 'black' && 'text-black',
    disabled ? 'opacity-20' : 'opacity-80 hover:opacity-100',
    iconClass
  )
  return (
    <div className="relative flex max-w-min">
      {link ? (
        <Link to={link}>
          <button
            className="p-1"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <Icon icon={icon} className={styleClass} />
          </button>
        </Link>
      ) : (
        <button
          className="p-1"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={onClick}
        >
          <Icon icon={icon} className={styleClass} />
        </button>
      )}

      <span
        className={classNames(
          'whitespace-nowrap absolute hidden md:block px-1.5 pt-0.5 pb-1 m-2 mx-auto text-xs text-gray-100 transition-opacity -translate-x-1/2 translate-y-full bg-gray-800 rounded-md left-1/2 z-50',
          isHover ? 'opacity-100' : 'opacity-0'
        )}
      >
        {disabled && disabledText ? disabledText : tooltip}
      </span>
    </div>
  )
}

export default IconButton
