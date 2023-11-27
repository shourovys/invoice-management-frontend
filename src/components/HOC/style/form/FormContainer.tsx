import { ReactNode } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

interface IProps {
  twoPart?: boolean
  sameHeight?: boolean
  children: ReactNode
}

function FormContainer({ twoPart = true, sameHeight = false, children }: IProps) {
  if (twoPart && sameHeight) {
    return <form className="grid gap-5 lg:grid-cols-2">{children}</form>
  }
  if (twoPart) {
    return (
      <ResponsiveMasonry columnsCountBreakPoints={{ 900: 1, 1180: 2 }}>
        <Masonry gutter="20px">{children} </Masonry>
      </ResponsiveMasonry>
    )
  }
  return <div className="space-y-5">{children}</div>
}

export default FormContainer
