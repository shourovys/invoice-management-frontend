import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IActionsButton } from 'types/components/actionButtons'
import Icon, { threeDotsIcon } from 'utils/icons'
import Button from '../atomic/Button'
import TextButton from '../atomic/TextButton'

interface IProps {
  actionButtons: IActionsButton[]
}
function ActionButtons({ actionButtons }: IProps) {
  return (
    <>
      {/* action buttons */}
      <div className="gap-3.5 lg:gap-4 hidden lg:flex">
        {actionButtons.map((button) =>
          button?.icon ? (
            <Button
              color={button.color || 'primary'}
              key={button.text}
              size={button.size}
              link={button.link}
              onClick={button.onClick}
              isLoading={button.isLoading}
            >
              <Icon icon={button.icon} className={button.iconClass} />
              <span>{button.text}</span>
            </Button>
          ) : (
            <Button
              color={button.color || 'primary'}
              key={button.text}
              size={button.size}
              link={button.link}
              onClick={button.onClick}
              isLoading={button.isLoading}
            >
              {button.text}
            </Button>
          )
        )}
      </div>

      {/* mobile action buttons in dropdown menu */}
      <div className="z-40 block lg:hidden">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="">
              <Icon icon={threeDotsIcon} className="px-4 text-xl" />
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
            <Menu.Items className="absolute right-0 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg min-w-max py -1 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {actionButtons.map((buttonData) => (
                <Menu.Item key={buttonData.text}>
                  <TextButton
                    link={buttonData.link}
                    onClick={buttonData.onClick}
                    icon={buttonData.icon}
                    color={buttonData.color}
                    iconClass={buttonData.iconClass}
                    isLoading={buttonData.isLoading}
                  >
                    {buttonData.text}
                  </TextButton>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  )
}

export default ActionButtons
