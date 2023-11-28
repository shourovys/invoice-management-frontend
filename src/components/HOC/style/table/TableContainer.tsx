import classNames from 'classnames'
import { ReactNode } from 'react'

interface IProps {
  padding?: boolean
  children: ReactNode
}

function TableContainer({ padding = true, children }: IProps) {
  return (
    <div className={classNames('bg-white rounded-md shadow', padding && 'p-4 md:p-3')}>
      {children}
    </div>
  )
}

export default TableContainer
