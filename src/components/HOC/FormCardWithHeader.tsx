import { ReactNode } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { IActionsButton } from 'types/components/actionButtons'
import Icon, { TIcon } from 'utils/icons'
import ActionButtons from '../common/ActionButtons'

interface IProps {
  header: string
  icon: TIcon
  twoPart?: boolean
  headerActionButtons?: IActionsButton[]
  children: ReactNode
}

function FormCardWithHeader({
  icon,
  header,
  twoPart = true,
  headerActionButtons,
  children,
}: IProps) {
  return (
    <div className="w-full bg-white rounded-md overscroll-auto">
      <div className="bg-[#E9E9E9] rounded-t-md px-4 py-2 flex items-center justify-between">
        <h2 className="text-[#A7A8A9] text-base md:font-medium flex items-center gap-2">
          <Icon icon={icon} />
          {header}
        </h2>
        {headerActionButtons ? <ActionButtons actionButtons={headerActionButtons} /> : null}
      </div>
      {twoPart ? (
        <section className="px-4 py-3 h-fit basis-1/2 max-h-min ">
          <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2 }}>
            <Masonry gutter="0.75rem" className="masonry_inputs_parent">
              {children}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      ) : (
        <section className="px-4 py-3 space-y-3">{children}</section>
      )}
    </div>
  )
}

export default FormCardWithHeader
