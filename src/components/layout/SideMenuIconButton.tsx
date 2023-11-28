import classNames from 'classnames'
import { useEffect } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useFavoritePages } from '../../hooks/useFavoritePages'
import usePermittedLabelRoutes from '../../hooks/usePermittedLabelRoutes'
import { routesArrayInGroup } from '../../routes/menu'
import { ILabeledRoutes, IRoute } from '../../types/routes'
import capitalize from '../../utils/capitalize'
import Icon, { TIcon } from '../../utils/icons'
import t from '../../utils/translator'

interface IProps {
  icon: TIcon
  label: string
  isActive: boolean
  handleClick: React.Dispatch<React.SetStateAction<string>>
  isSidebarShowing: boolean
  isHovering: boolean
}

function SideMenuIconButton({
  icon,
  label,
  isActive,
  handleClick,
  isSidebarShowing,
  isHovering: isHover,
}: IProps) {
  const permittedLabeledRoutes = usePermittedLabelRoutes()
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const { favoritePages } = useFavoritePages()

  const isRouteActiveGroup = routesArrayInGroup[label]?.find((route: IRoute) =>
    matchPath(pathname, route.routePath)
  )
  useEffect(() => {
    if (isRouteActiveGroup) {
      handleClick(label)
    }
  }, [pathname])

  const modifiedLabeledRoutes: ILabeledRoutes = {
    ...permittedLabeledRoutes,
    favorite: favoritePages,
  }

  const handleGroupClick = () => {
    handleClick(label)
    modifiedLabeledRoutes[label].length && navigate(modifiedLabeledRoutes[label][0].path())
  }

  return (
    <div
      className={classNames(
        'group md:overflow-hidden flex justify-center md:justify-start items-center px-3 md:px-0.5 md:mx-1 py-1.5 md:py-2 md:mb-0.5 text-xs md:rounded-md font-medium gap-1.5 md:gap-1 rounded-full relative cursor-pointer border border-solid',
        isActive ? 'border-primary' : 'border-transparent',
        isRouteActiveGroup
          ? 'text-sidebarBtnActiveText bg-sidebarBtnActiveBg'
          : 'text-sidebarBtnText bg-sidebarBtnBg hover:text-sidebarBtnHoverText  hover:bg-sidebarBtnHoverBg custom_transition'
      )}
      onClick={handleGroupClick}
    >
      <Icon
        icon={icon}
        className={classNames(
          // isRouteActiveGroup?'':'',
          isActive
            ? 'text-sidebarBtnActiveText'
            : 'text-sidebarBtnText md:text-sidebarBtnText group-hover:text-sidebarBtnHoverText md:group-hover:text-sidebarBtnHoverText',
          'shrink-0 outline-none group text-base md:text-xl md:h-[22px] md:w-[22px] md:mx-1.5 cursor-pointer'
        )}
      />

      <span
        className={classNames(
          'text-sm leading-4 text-center whitespace-nowrap custom_transition opacity-100 transition-opacity rounded-md',
          !isSidebarShowing && 'md:scale-0 md:group-hover:scale-100',
          isHover && 'md:scale-100'
        )}
      >
        {t(capitalize(label))}
      </span>
    </div>
  )
}

export default SideMenuIconButton
