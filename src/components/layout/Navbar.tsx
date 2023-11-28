import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '../../api/swrConfig'
import { authApi } from '../../api/urls'
import useAuth from '../../hooks/useAuth'
import routeProperty from '../../routes/routeProperty'
import { IActionsButton } from '../../types/components/actionButtons'
import Icon, { avatarIcon } from '../../utils/icons'
import t from '../../utils/translator'
import Modal from '../HOC/modal/Modal'
import TextButton from '../atomic/TextButton'
import ProfileModal from './ProfileModal'

function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout: contextLogout } = useAuth()

  const [openProfileModal, setOpenProfileModal] = useState(false)

  const { trigger: logout, isMutating } = useSWRMutation(authApi.logout, fetcher, {
    onSuccess: (data) => {
      navigate(routeProperty.login.path(), { state: { previousPath: pathname } })
      contextLogout()
    },
  })

  const handleLogout = async () => {
    await logout()
  }

  const handleProfileModalOpen = () => {
    setOpenProfileModal(true)
  }

  const userNavigation: IActionsButton[] = [
    { text: t`Your Profile`, onClick: handleProfileModalOpen },
    { text: t`Sign out`, onClick: handleLogout, isLoading: isMutating },
  ]

  return (
    <div className="z-50 flex flex-col">
      <div className="relative z-10 flex h-12 shadow shrink-0 bg-navbarBg md:h-14">
        <div className="flex items-center px-4 shrink-0 ">
          {/* <img className="w-auto h-7 md:h-8" src={'/images/logo/full_logo.svg'} alt="Workflow" /> */}
          <h1 className="text-xl font-medium md:text-2xl">Invoice Management</h1>
        </div>
        <div className="flex justify-end flex-1 px-4 py-2">
          <div className="flex items-center gap-8 ml-4 md:gap-10 md:ml-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative" style={{ width: 'fit-content' }}>
              <div>
                <Menu.Button className="flex items-center justify-center max-w-xs gap-2 text-sm rounded-full bg-navbarBtnBg text-navbarBtnText hover:bg-navbarBtnHoverBg hover:text-navbarBtnHoverText md:rounded-md md:h-full md:p-1">
                  <div className="hidden leading-4 text-right capitalize md:block">
                    <div style={{ fontSize: '.9rem' }}>{user?.name}</div>
                    <div style={{ fontSize: '.6rem' }} className="text-gray-700">
                      {user?.role}
                    </div>
                  </div>
                  {/* {user?.Person?.ImageFile ? (
                    <img
                      className="w-8 h-8 rounded-full md:w-9 md:h-9 md:rounded-md"
                      src={IMAGE_URL + user?.Person?.ImageFile}
                      alt=""
                    />
                  ) : ( */}
                  <Icon
                    icon={avatarIcon}
                    className="w-6 h-6 rounded-full md:w-7 md:h-7 md:rounded-md"
                  />
                  {/* )} */}
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
      <Modal openModal={openProfileModal} setOpenModal={setOpenProfileModal}>
        <ProfileModal setOpenModal={setOpenProfileModal} />
      </Modal>
    </div>
  )
}

export default Navbar
