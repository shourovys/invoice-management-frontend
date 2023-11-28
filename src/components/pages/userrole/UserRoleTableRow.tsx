import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IUserRoleResult } from '../../../types/pages/userRole'
import Checkbox from '../../atomic/Checkbox'

interface IProps {
  row: IUserRoleResult
  selected: string[]
  handleSelectRow: (id: string) => void
}

function UserRoleTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.RoleNo}
      link={routeProperty.userRoleInfo.path(row.RoleNo)}
      selected={selected.indexOf(row.RoleNo.toString()) !== -1}
    >
      <TableData>{row.RoleNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.RoleName}</TableData>
      <TableData>{row.RoleDesc}</TableData>
      <TableDataAction selected={selected.indexOf(row.RoleNo.toString()) !== -1}>
        {row.RoleNo !== 0 && (
          <Checkbox
            value={`select-row-${row.RoleNo}`}
            checked={selected.indexOf(row.RoleNo.toString()) !== -1}
            onChange={() => {
              handleSelectRow(row.RoleNo.toString())
            }}
          />
        )}
      </TableDataAction>
    </TableRow>
  )
}

export default UserRoleTableRow
