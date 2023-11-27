import classNames from 'classnames'
import Checkbox from 'components/atomic/Checkbox'
import { ITableHead } from 'types/components/table'
import Icon, { downArrowIcon, upArrowIcon } from 'utils/icons'

interface IProps {
  order: 'asc' | 'desc'
  orderBy: string
  numSelected?: number
  rowCount?: number
  handleSort: (orderBy: string, order: 'asc' | 'desc') => void
  handleOrder: (order: 'asc' | 'desc') => void
  selectAllRow?: (selected: boolean) => void
  headerData: ITableHead[]
}
function TableHeader({
  order,
  orderBy,
  numSelected,
  rowCount,
  handleSort,
  handleOrder,
  selectAllRow,
  headerData,
}: IProps) {
  return (
    <thead className="bg-[#F0F1F3]">
      <tr className="">
        {headerData.map((item) => (
          <th
            key={item.id}
            scope="col"
            className={classNames(
              'px-6 py-2 text-sm font-medium text-center text-gray-400 whitespace-nowrap',
              item.filter ? 'cursor-pointer' : 'cursor-default'
            )}
            onClick={() => {
              if (item.filter) {
                handleOrder(order === 'asc' ? 'desc' : 'asc')
                handleSort(item.id, order === 'asc' ? 'desc' : 'asc')
              }
            }}
          >
            {item.filter && (
              <>
                <Icon
                  icon={upArrowIcon}
                  className={classNames(
                    'w-2 h-full',
                    orderBy === item.id && order === 'asc' && 'text-primary'
                  )}
                />
                <Icon
                  icon={downArrowIcon}
                  className={classNames(
                    'w-2 h-full mr-2',
                    orderBy === item.id && order === 'desc' && 'text-primary'
                  )}
                />
              </>
            )}

            {!item.checkbox && item.label}

            {item.checkbox && (
              <div className="flex gap-2">
                {item.label}
                <Checkbox
                  value="select-all-row"
                  onChange={(checked) => {
                    item.handleTableHeaderCheckboxAction(item.id, checked)
                  }}
                />
              </div>
            )}
          </th>
        ))}
        {selectAllRow && (
          <th
            scope="col"
            className="sticky px-4 py-3 text-sm font-medium text-center text-gray-400 bg-[#F0F1F3] right-0"
          >
            <div className="flex items-center justify-end md:mr-0.5 lg:mr-2.5">
              <Checkbox
                value="select-all-row"
                checked={rowCount !== 0 && rowCount === numSelected}
                onChange={(checked) => {
                  selectAllRow(checked)
                }}
                disabled={rowCount === 0}
              />
            </div>
            {/* <div className="absolute top-[50%] transform translate-y-[-50%] right-4 hidden lg:block">
                        {!!numSelected && numSelected}
                    </div> */}
          </th>
        )}
      </tr>
    </thead>
  )
}

export default TableHeader
