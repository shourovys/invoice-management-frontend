import classNames from 'classnames'
import useAuth from '../../hooks/useAuth'
import { Link, useLocation } from 'react-router-dom'
import { ReactRoutes } from '../../routes/routeProperty'
import { IRoute } from '../../types/routes'
import checkPermission from '../../utils/checkPermission'
import Icon from '../../utils/icons'

interface IProps {
  item: IRoute
}

function NavMenuIconButton({ item }: IProps) {
  const location = useLocation()

  const isActive = item.path() === location.pathname

  return (
    <Link
      key={item.routePath}
      to={item.path()}
      className={classNames(
        isActive
          ? 'text-primary border-primary bg-blue-100'
          : 'text-gray-500 hover:text-gray-900 border-gray-300 hover:bg-white custom_transition',
        'group flex justify-center items-center px-3 py-1.5 text-xs  font-medium gap-1.5 md:gap-2 border rounded-full relative'
      )}
      // title={item.name}
    >
      {item.icon && (
        <Icon
          icon={item.icon}
          className={classNames(
            isActive ? 'text-primary' : 'text-gray-400  group-hover:text-gray-500 ',
            'shrink-0 outline-none group text-base '
          )}
        />
      )}

      <span
        className={classNames(
          'text-sm leading-4 text-center whitespace-nowrap custom_transition opacity-100 transition-opacity rounded-md'
        )}
      >
        {item.label}
      </span>
    </Link>
  )
}

// interface INavbarProps {}

function NavMenu() {
  const { permissions } = useAuth()

  const premisedRoutes = ReactRoutes.filter(
    (route) =>
      Object.prototype.hasOwnProperty.call(route, 'label') &&
      route.label &&
      route.id &&
      checkPermission(route.permissions, permissions)
  )

  // console.log("Permisso", premisedRoutes)

  return (
    <div className={classNames('duration-300 z-40 top-0 bottom-0 flex mx-4 mt-5 relative ')}>
      <nav className="flex flex-row gap-3 pr-12 mb-1 overflow-x-auto md:gap-5 scrollbar-hide border-gray-primary ">
        {premisedRoutes.map((item) => (
          <NavMenuIconButton item={item} key={item.routePath} />
        ))}
      </nav>
    </div>
  )
}

export default NavMenu
