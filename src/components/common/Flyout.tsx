import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface IProps {
  children: JSX.Element | JSX.Element[] | string
  flyout: JSX.Element | JSX.Element[]
  className?: string
}
export default function Flyout({ children, flyout, className }: IProps) {
  return (
    <Popover as="div" className={className}>
      <div>
        <Popover.Button className="flex items-center justify-center max-w-xs gap-2 p-1 text-sm bg-white rounded-full md:rounded-md">
          {children}
        </Popover.Button>
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
        <Popover.Panel className="absolute left-0 right-0">
          <div className="w-full max-w-full min-w-max">{flyout}</div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
