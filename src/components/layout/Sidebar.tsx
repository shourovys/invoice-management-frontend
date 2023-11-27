import classNames from 'classnames'
import useLocalStorage from 'hooks/useLocalStorage'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import routes from 'routes'
import Icon, { TIcon, addIcon, leftArrowIcon, rightArrowIcon } from 'utils/icons'

interface IProps {
  item: {
    name: string
    href: string
    icon: TIcon
  }
}

function SidebarIconButton({ item }: IProps) {
  const location = useLocation()
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => setIsHover(true)
  const handleMouseLeave = () => setIsHover(false)

  const isActive = item.href === location.pathname

  return (
    <Link
      key={item.name}
      to={item.href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(
        isActive
          ? 'text-primary border-primary '
          : 'text-gray-500 hover:text-gray-900 border-gray-300',
        'group md:mx-auto flex flex-row md:flex-col justify-center items-center px-3 md:px-1 py-1.5 md:py-2 md:pb-5 text-xs md:rounded-md font-medium gap-1.5 md:gap-1 border md:border-0 rounded-full relative'
      )}
      title={item.name}
    >
      <Icon
        icon={item.icon}
        className={classNames(
          isActive
            ? 'text-primary'
            : 'text-gray-400 md:text-gray-700 group-hover:text-gray-500 md:group-hover:text-gray-900',
          'flex-shrink-0 outline-none group text-base md:text-xl'
        )}
      />

      <span
        className={classNames(
          'text-sm leading-4 text-center md:text-xs md:break-words md:leading-none whitespace-nowrap md:hidden md:px-1.5 md:pt-0.5 md:pb-1 md:mt-3 md:mx-auto md:transition-opacity md:-translate-x-1/2 md:translate-y-full md:left-1/2 md:z-50 custom_transition opacity-100 md:text-gray-100 transition-opacity md:bg-gray-800 rounded-md',
          isHover ? 'md:opacity-100' : 'md:opacity-0'
        )}
      >
        {item.name}
      </span>
      {/* <span
                className={classNames(
                    "text-sm leading-4 text-center md:text-xs md:break-words md:leading-none whitespace-nowrap md:absolute md:px-1.5 md:pt-0.5 md:pb-1 md:mt-3 md:mx-auto  md:transition-opacity md:-translate-x-1/2 md:translate-y-full  rounded-md md:left-1/2 md:z-50 custom_transition opacity-100",
                )}
            >
                {item.name}
            </span> */}
    </Link>
  )
}

function Sidebar() {
  const [isShowing, setIsShowing] = useLocalStorage<boolean>('SIDEBAR_IS_SHOWING', true)

  const toggleSidebar = () => setIsShowing((state) => !state)

  return (
    <div className={classNames('relative', isShowing ? 'md:w-12' : 'md:w-4')}>
      <span
        role="button"
        tabIndex={0}
        className={classNames(
          'absolute z-[1] items-center justify-center w-7 h-7 text-gray-700 bg-[#F1F1F1] border-2 shadow border-gray-50 rounded-full cursor-pointer hidden md:flex top-2 right-0',
          isShowing ? '-right-3.5' : '-right-3'
        )}
        onClick={toggleSidebar}
        onKeyDown={toggleSidebar}
        title="Menu colups button"
      >
        <Icon icon={isShowing ? leftArrowIcon : rightArrowIcon} className="text-lg" />
      </span>

      <div
        className={classNames(
          'md:absolute top-0 bottom-0 flex mx-4 mt-5 overflow-hidden transform md:mx-0 md:mt-0 md:flex-shrink-0',
          !isShowing && 'md:-translate-x-[70%]'
        )}
      >
        <div className="flex flex-col w-screen md:w-12">
          <div className="flex flex-col scrollbar-hide overflow-x-auto md:overflow-x-hidden border-r border-gray-primary md:bg-[#F1F1F1] md:overflow-y-auto md:flex-grow">
            <div className="flex my-0 md:my-0 md:mt-8 md:flex-grow">
              <nav className="md:flex-1 md:px-1.5 gap-3 md:gap-3 flex md:flex-col flex-row mb-1 md:mb-0 pr-12">
                {routes.map((item) => (
                  <SidebarIconButton item={item} key={item.href} />
                ))}
                {routes.length < 10 && (
                  <div className="hidden pt-4 border-t border-gray-300 md:block">
                    <SidebarIconButton
                      item={{
                        href: '/',
                        // href: routeProperty.favorite.path(),
                        icon: addIcon,
                        name: 'Add favorite',
                      }}
                    />
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
