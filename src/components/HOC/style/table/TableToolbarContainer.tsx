import { Disclosure, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Icon, { filterIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'
import React from 'react'

interface IProps {
  padding?: boolean
  getSetOpenModalFC?: (setOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => void
  children: JSX.Element | JSX.Element[]
}

function TableToolbarContainer({ padding = true, children }: IProps) {
  return (
    <>
      <div className={classNames('space-y-2 hidden md:block', padding && 'pb-3 md:pb-4')}>
        {children}
      </div>
      <div className={classNames('space-y-2 md:hidden', padding && 'pb-3 md:pb-4')}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className="inline-flex items-center justify-center text-sm font-normal rounded-md gap-1.5 px-3 py-1.5 md:py-2 base min-w-[80px] md:min-w-[100px] bg-btnPrimaryBg text-btnPrimaryText hover:bg-btnPrimaryText hover:text-btnPrimaryBg cursor-pointer hover:shadow-all-side"
                type="button"
              >
                <Icon icon={filterIcon} />
                <span>{t`Filter`}</span>
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel static>
                  <div className="w-full space-y-2 md:hidden">{children}</div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}

export default TableToolbarContainer
