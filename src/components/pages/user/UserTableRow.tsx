import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IUserResult } from '../../../types/pages/user'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IUserResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function UserTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.UserNo}
      link={routeProperty.userInfo.path(row.UserNo)}
      selected={selected.indexOf(row.UserNo.toString()) !== -1}
    >
      <TableData>{row.UserNo}</TableData>
      <TableData>{row.Partition?.PartitionName}</TableData>
      <TableData>{row.UserId}</TableData>
      <TableData>{row.UserDesc}</TableData>
      <TableData>{row.Role.role}</TableData>
      <TableDataAction selected={selected.indexOf(row.UserNo.toString()) !== -1}>
        {row.UserNo !== 0 && (
          <Checkbox
            value={`select-row-${row.UserNo}`}
            checked={selected.indexOf(row.UserNo.toString()) !== -1}
            onChange={() => {
              handleSelectRow(row.UserNo.toString())
            }}
          />
        )}
      </TableDataAction>
    </TableRow>
  )
}

export default UserTableRow
