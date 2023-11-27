interface IProps {
  children: JSX.Element | JSX.Element[]
}

function TableContainer({ children }: IProps) {
  return <div className="p-4 bg-white rounded-md md:p-3">{children}</div>
}

export default TableContainer
