import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import useSWRGlobalState from '../../hooks/useSWRGlobalState'
import { Fragment } from 'react'
import { IActionsButton } from '../../types/components/actionButtons'
import Icon, { threeDotsIcon } from '../../utils/icons'
import Button from '../atomic/Button'
import TextButton from '../atomic/TextButton'
import ButtonWithFileUpload from './ButtonWithFileUpload'
import t from '../../utils/translator'

interface IActionButtonProps {
  button: IActionsButton
}
function ActionButton({ button }: IActionButtonProps) {
  return (
    <>
      {/* action button */}
      {button?.handleFile ? (
        <ButtonWithFileUpload
          key={button.text}
          handleFile={button.handleFile}
          accept={button.accept}
          disabled={button.disabled}
        >
          <Button
            color={button.color || 'primary'}
            key={button.text}
            size={button.size}
            link={button.link}
            isLoading={button.isLoading}
            disabled={button.disabled}
          >
            <>
              {button.icon && <Icon icon={button.icon} className={button.iconClass} />}
              <span>{button.text}</span>
            </>
          </Button>
        </ButtonWithFileUpload>
      ) : (
        <Button
          color={button.color || 'primary'}
          key={button.text}
          size={button.size}
          link={button.link}
          onClick={button.onClick}
          isLoading={button.isLoading}
          disabled={button.disabled}
        >
          <>
            {button.icon && <Icon icon={button.icon} className={button.iconClass} />}
            <span>{button.text}</span>
          </>
        </Button>
      )}
    </>
  )
}
interface IProps {
  actionButtons: IActionsButton[]
  showInSm?: boolean
  allowsShow?: boolean
}
function ActionButtons({ actionButtons, showInSm, allowsShow }: IProps) {
  const [, setIsMenuOpen] = useSWRGlobalState<boolean>('menuOpenState', false)

  return (
    <>
      {/* action buttons */}
      <div
        className={classNames(
          'gap-x-3.5 lg:gap-x-4',
          allowsShow ? 'flex' : showInSm ? 'hidden sm:flex' : 'hidden lg:flex'
        )}
      >
        {actionButtons.map((button) => (
          <ActionButton button={button} key={button.text} />
        ))}
      </div>

      {/* mobile action buttons in dropdown menu */}
      {!!actionButtons.length && (
        <div
          className={classNames(
            'z-40 relative',
            showInSm || allowsShow ? 'hidden' : 'block lg:hidden'
          )}
        >
          <Menu as="div" className="relative">
            <div>
              <Menu.Button
                className=""
                onClick={() => {
                  setIsMenuOpen(true)
                }}
              >
                <Icon icon={threeDotsIcon} className="px-1 text-xl sm:px-2" />
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
                    {buttonData?.handleFile ? (
                      <ButtonWithFileUpload
                        key={buttonData.text}
                        handleFile={buttonData.handleFile}
                        accept={buttonData.accept}
                        disabled={buttonData.disabled}
                      >
                        <TextButton
                          link={buttonData.link}
                          icon={buttonData.icon}
                          color={buttonData.color}
                          iconClass={buttonData.iconClass}
                          isLoading={buttonData.isLoading}
                          disabled={buttonData.disabled}
                          disabledText={t`Button disabled`}
                        >
                          {buttonData.text}
                        </TextButton>
                      </ButtonWithFileUpload>
                    ) : (
                      <TextButton
                        link={buttonData.link}
                        onClick={buttonData.onClick}
                        icon={buttonData.icon}
                        color={buttonData.color}
                        iconClass={buttonData.iconClass}
                        isLoading={buttonData.isLoading}
                        disabled={buttonData.disabled}
                        disabledText={t`Button disabled`}
                      >
                        {buttonData.text}
                      </TextButton>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </>
  )
}

export default ActionButtons
