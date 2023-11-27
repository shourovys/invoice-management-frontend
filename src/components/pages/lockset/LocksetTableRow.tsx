import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { ILocksetResult } from '../../../types/pages/lockset'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: ILocksetResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function LocksetTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.locksetInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.gateway.name}</TableData>
      <TableData>{row.link_id}</TableData>
      <TableData>{row.online ? 'Yes' : 'No'}</TableData>
      <TableData>{row.lock_stat}</TableData>
      <TableData>{row.contact_stat}</TableData>
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

export default LocksetTableRow
