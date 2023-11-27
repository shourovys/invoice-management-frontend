import classNames from 'classnames'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { TABLE_ROW_HEIGHT } from 'utils/config'

interface IProps {
  link?: string
  selected?: boolean
  children: ReactNode
}

function TableRow({ link, selected, children }: IProps) {
  const navigate = useNavigate()
  return (
    <tr
      className={classNames(
        'custom_transition bg-white group border-x border-x-white hover:border-x-gray-200 border-b border-gray-200 hover:bg-gray-100 group last:border-b-0',
        selected && 'bg-blue-50',
        link && 'cursor-pointer'
      )}
      style={{ height: TABLE_ROW_HEIGHT }}
      onClick={() => (link ? navigate(link) : '')}
    >
      {children}
    </tr>
  )
}

export default TableRow
