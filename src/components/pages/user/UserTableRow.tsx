import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IUserResult } from 'types/pages/user'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IUserResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function UserTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.userInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition?.name}</TableData>
      <TableData>{row.username}</TableData>
      <TableData>{row.description}</TableData>
      {/* <TableData>{row.role.name}</TableData> */}
      <TableDataAction selected={selected.indexOf(row.id.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.id}`}
          checked={selected.indexOf(row.id.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.id.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default UserTableRow
