import { Menu, Transition } from '@headlessui/react'
import { fetcher } from 'api/swrConfig'
import { authApi } from 'api/urls'
import useAuth from 'hooks/useAuth'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import routeProperty from 'routes/routeProperty'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from 'types/components/actionButtons'
import Icon, { favoriteIcon, menuIcon } from 'utils/icons'
import LeftDrawer from '../HOC/LeftDrawer'
import TextButton from '../atomic/TextButton'
import Flyout from '../common/Flyout'
import Hamburger from './Hamburger'
import NavbarMenu from './NavbarMenu'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout: contextLogout } = useAuth()

  const { trigger: logout, isMutating } = useSWRMutation(authApi.logout, fetcher, {
    onSuccess: () => {
      navigate(routeProperty.login.path())
      contextLogout()
    },
  })

  const handleLogout = async () => {
    await logout()
  }

  const userNavigation: IActionsButton[] = [
    { text: 'Your Profile', link: routeProperty.profile.path() },
    { text: 'Sign out', onClick: handleLogout, isLoading: isMutating },
  ]

  return (
    <div className="z-50 flex flex-col">
      <div className="relative z-10 flex flex-shrink-0 h-12 bg-white shadow md:h-14">
        <Link to={routeProperty.dashboard.path()} className="flex items-center flex-shrink-0 px-4 ">
          <img className="w-auto h-7 md:h-8" src="/images/logo/full_logo.svg" alt="Workflow" />
        </Link>
        <div className="flex justify-end flex-1 px-4">
          <div className="flex items-center gap-4 ml-4 md:gap-8 md:ml-6">
            <Link
              to={'/'}
              // to={routeProperty.favorite.path()}
              className="flex items-center gap-2 p-1 font-semibold bg-white rounded-full customer_text_hover"
            >
              <Icon icon={favoriteIcon} className="w-5 h-5" />
              <span className="hidden text-sm md:block">Favorite</span>
            </Link>

            {/* mobile menu button  */}
            <LeftDrawer drawer={<Hamburger />} className="md:hidden">
              <span className="flex items-center gap-2 p-1 font-semibold bg-white rounded-full md:hidden customer_text_hover focus:outline-none">
                <Icon icon={menuIcon} className="w-5 h-5" />
              </span>
            </LeftDrawer>
            {/* desktop menu button  */}
            <Flyout flyout={<NavbarMenu />} className="hidden md:block">
              <div className="items-center hidden gap-2 p-1 font-semibold bg-white rounded-full md:flex customer_text_hover">
                <Icon icon={menuIcon} className="w-5 h-5" />
                <span className="hidden text-sm md:block">Menu</span>
              </div>
            </Flyout>
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center justify-center max-w-xs gap-2 p-1 text-sm bg-white rounded-full md:rounded-md">
                  <div className="hidden text-sm leading-4 text-right md:block">
                    <p className="font-semibold">{user?.username}</p>
                    <p>{user?.email}</p>
                  </div>
                  <img
                    className="w-8 h-8 rounded-full md:w-9 md:h-9 md:rounded-md "
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.text}>
                      <TextButton link={item.link} onClick={item.onClick}>
                        {item.text}
                      </TextButton>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
