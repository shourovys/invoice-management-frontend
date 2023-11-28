import { ReactNode } from 'react'
import { TTextAlign } from '../../../../types/components/common'

interface IProps {
  align?: TTextAlign
  children: ReactNode
}

function TableData({ align = 'center', children }: IProps) {
  return (
    <td className={`px-3 text-sm text-gray-900 whitespace-nowrap text-${align}`}>{children}</td>
  )
}

export default TableData
