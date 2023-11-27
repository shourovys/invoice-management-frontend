import { Link } from 'react-router-dom'
import labeledRoutes from 'routes/menu'
import { ILabeledRoute } from 'types/routes'
import Icon from 'utils/icons'
import menuIcons from 'utils/menuIcons'

function NavbarMenu() {
  return (
    <ul className="mx-auto mt-3 navbar-nav">
      <li className="static mx-auto">
        <div className="absolute right-5 mt-0 w-[calc(100%-2rem)] max-w-7xl bg-white rounded-b-lg shadow-lg min-w-max min-h-max top-full overflow-y-auto max-h-[90vh]">
          <div className="z-50 px-6 py-5 lg:px-8">
            <div className="grid justify-between grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Object.keys(labeledRoutes).map((routeType, index) => (
                <div className="w-max min-w-max gap-y-10" key={index}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Icon icon={menuIcons[routeType]} />
                      <h3 className="text-sm font-medium capitalize ">{routeType}</h3>
                    </div>
                    <ul className="flex flex-col flex-wrap justify-between w-full gap-x-8 max-h-64 gap-y-1.5">
                      {labeledRoutes[routeType].map((route: ILabeledRoute, routeIndex) => (
                        <Link to={route.path()} key={routeIndex}>
                          <li key={route.path()} className="py-1 cursor-pointer">
                            <p className="text-xs text-gray-600 hover:text-black">{route.label}</p>
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
