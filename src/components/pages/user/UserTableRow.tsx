import TableData from '../../../components/HOC/style/table/TableData'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IUserResult } from '../../../types/pages/user'

type IProps = {
  row: IUserResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function UserTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row._id}
      link={routeProperty.userInfo.path(row._id)}
      selected={selected.indexOf(row._id.toString()) !== -1}
    >
      <TableData>{row.no}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.email}</TableData>
      <TableData>{row.contactNumber}</TableData>
      {/* <TableDataAction selected={selected.indexOf(row._id.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row._id}`}
          checked={selected.indexOf(row._id.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row._id.toString())
          }}
        />
      </TableDataAction> */}
    </TableRow>
  )
}

export default UserTableRow
