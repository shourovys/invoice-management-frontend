import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import { IAckDashboardResult } from 'types/pages/ackDashboard'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IAckDashboardResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function AckDashboardTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow key={row.id} selected={selected.indexOf(row.id.toString()) !== -1}>
      <TableData>{row.id}</TableData>
      <TableData>{row.event_time}</TableData>
      <TableData>{row.event_name}</TableData>
      <TableData>{row.device_name}</TableData>
      <TableData>{row.person_name}</TableData>
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

export default AckDashboardTableRow
