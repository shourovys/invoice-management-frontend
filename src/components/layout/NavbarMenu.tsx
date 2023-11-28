import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import usePermittedLabelRoutes from '../../hooks/usePermittedLabelRoutes'
import { ILabeledRoute } from '../../types/routes'
import capitalize from '../../utils/capitalize'
import Icon from '../../utils/icons'
import menuIcons from '../../utils/menuIcons'
import t from '../../utils/translator'

interface IProps {
  close: () => void
}

function NavbarMenu({ close }: IProps) {
  const { pathname } = useLocation()
  const permittedLabeledRoutes = usePermittedLabelRoutes()

  return (
    <ul className="mx-auto mt-3 navbar-nav">
      <li className="static mx-auto">
        <div className="absolute right-5 mt-0 w-[calc(100%-2rem)] max-w-[1400px] bg-white rounded-b-lg shadow-lg min-w-max min-h-max top-full overflow-y-auto overflow-x-auto max-h-[90vh]">
          <div className="z-[60] px-6 py-5 lg:px-8">
            <div className="grid justify-between grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10">
              {Object.keys(permittedLabeledRoutes).map((routeType, index) => (
                <div className="w-max min-w-max gap-y-10" key={index}>
                  <div className="space-y-2">
                    <div
                      className={classNames(
                        'flex items-center gap-2',
                        permittedLabeledRoutes[routeType]
                          .map((route: ILabeledRoute) => route.path())
                          .includes(pathname)
                          ? 'text-topMenuCustomBtnHoverText'
                          : 'text-topMenuCustomBtnText'
                      )}
                    >
                      <Icon icon={menuIcons[routeType]} />
                      <h3 className="text-sm font-medium capitalize ">
                        {t(capitalize(routeType))}
                      </h3>
                    </div>
                    <ul className="flex flex-col flex-wrap justify-between w-full gap-x-8 max-h-52 xl:max-h-full gap-y-1.5">
                      {permittedLabeledRoutes[routeType].map((route: ILabeledRoute, routeIndex) => (
                        <Link to={route.path()} key={routeIndex} onClick={close}>
                          <li key={route.path()} className="cursor-pointer">
                            <div
                              className={classNames(
                                'text-sm py-1',
                                route.path() === pathname
                                  ? 'text-topMenuCustomBtnHoverText'
                                  : 'text-topMenuCustomBtnText hover:text-topMenuCustomBtnHoverText'
                              )}
                            >
                              {route.label}
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default NavbarMenu
