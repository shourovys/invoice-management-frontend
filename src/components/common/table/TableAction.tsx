import classNames from 'classnames'
import IconButton from 'components/atomic/IconButton'
import { ITableAction } from 'types/components/table'

interface IProps {
  tableActions: ITableAction[]
  numSelected: number
}
function TableAction({ tableActions, numSelected }: IProps) {
  return (
    <div className="relative w-full pb-1 lg:pb-0">
      <div className="ml-auto overflow-x-scroll lg:absolute right-2 -top-8 scrollbar-hide md:overflow-visible">
        <div
          className={classNames(
            'flex items-center gap-3 md:gap-4 mr-3 sm:mr-3.5 md:mr-4',
            tableActions.length > 7 ? 'justify-start sm:justify-end' : 'justify-end'
          )}
        >
          {tableActions.map((button) => (
            <IconButton
              key={button.tooltip}
              icon={button.icon}
              tooltip={button.tooltip}
              color={button.color}
              iconClass={button.iconClass}
              disabled={numSelected ? button.disabled : true}
              disabledText="Select table row"
              link={button.link}
              onClick={button.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableAction
