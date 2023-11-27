interface IProps {
  children: JSX.Element | JSX.Element[]
}

function TableToolbarContainer({ children }: IProps) {
  return <div className="pb-3 space-y-2 md:pb-4">{children}</div>
}

export default TableToolbarContainer
