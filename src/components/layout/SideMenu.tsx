import classNames from 'classnames'
import { useState } from 'react'
import usePermittedLabelRoutes from '../../hooks/usePermittedLabelRoutes'
import Icon, { leftArrowIcon, rightArrowIcon } from '../../utils/icons'
import menuIcons from '../../utils/menuIcons'
import t from '../../utils/translator'
import SideMenuIconButton from './SideMenuIconButton'

interface SidebarProps {
  isSidebarShowing: boolean
  toggleSidebar: () => void
  selectedRouteGroup: string
  setSelectedRouteGroup: React.Dispatch<React.SetStateAction<string>>
}

function SideMenu({
  isSidebarShowing,
  toggleSidebar,
  selectedRouteGroup,
  setSelectedRouteGroup,
}: SidebarProps) {
  const permittedLabeledRoutes = usePermittedLabelRoutes()

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  const handleToggleSidebar = () => {
    toggleSidebar()
    setIsHovering(false)
  }

  return (
    <div
      className={classNames(
        'duration-300 z-40 md:bg-sidebarBg top-0 bottom-0 flex mx-4 mt-5 md:mx-0 md:mt-0 md:shrink-0 md:h-full relative ',
        isSidebarShowing ? 'md:w-52' : 'md:w-12 ',
        isHovering && 'md:hover:w-52'
      )}
    >
      <span
        role="button"
        className={classNames(
          'absolute z-40 items-center justify-center w-7 h-7 text-sidebarBtnText bg-sidebarBg border-2 shadow border-white rounded-full cursor-pointer hidden md:flex top-16 -right-3.5'
        )}
        onClick={handleToggleSidebar}
        title={t`Menu collapse button`}
        onMouseEnter={!isSidebarShowing && isHovering ? handleMouseEnter : undefined}
        onMouseLeave={!isSidebarShowing && isHovering ? handleMouseLeave : undefined}
      >
        <Icon icon={isSidebarShowing ? leftArrowIcon : rightArrowIcon} className="text-lg" />
      </span>

      <nav
        className="flex flex-row gap-3 pr-12 mb-1 overflow-x-auto md:pt-14 md:mt-8 md:flex-col md:mb-0 md:pr-0 md:border-r scrollbar-hide md:overflow-x-hidden border-gray-primary md:overflow-y-auto md:grow group:"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/*<SideMenuIconButton*/}
        {/*  icon={menuIcons.favorite}*/}
        {/*  label={'favorite'}*/}
        {/*  isActive={'favorite' === selectedRouteGroup}*/}
        {/*  handleClick={setSelectedRouteGroup}*/}
        {/*  isSidebarShowing={isSidebarShowing}*/}
        {/*  isHovering={isHovering}*/}
        {/*/>*/}
        {Object.keys(permittedLabeledRoutes).map((routeType, index) => (
          <SideMenuIconButton
            icon={menuIcons[routeType]}
            label={routeType}
            isActive={routeType === selectedRouteGroup}
            handleClick={setSelectedRouteGroup}
            key={index}
            isSidebarShowing={isSidebarShowing}
            isHovering={isHovering}
          />
        ))}
      </nav>
    </div>
  )
}

export default SideMenu
