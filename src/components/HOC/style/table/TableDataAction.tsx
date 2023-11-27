import classNames from 'classnames'

interface IProps {
  selected?: boolean
  children: JSX.Element | JSX.Element[]
}

function TableDataAction({ selected, children }: IProps) {
  return (
    <td
      className={classNames(
        'custom_transition sticky right-0 w-1/12 px-4 text-sm text-center text-gray-900 bg-white whitespace-nowrap group-hover:bg-gray-100 ',
        selected && 'bg-blue-50'
      )}
    >
      <div className="flex items-center justify-end md:mr-0.5 lg:mr-2.5">
        <button
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {children}
        </button>
      </div>
    </td>
  )
}
export default TableDataAction
