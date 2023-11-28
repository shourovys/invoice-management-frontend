import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IScheduleResult } from '../../../types/pages/schedule'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IScheduleResult
  selected: string[]
  handleSelectRow: (_selectedNo: string) => void
}

function ScheduleTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.ScheduleNo}
      link={routeProperty.scheduleInfo.path(row.ScheduleNo.toString())}
      selected={selected.indexOf(row.ScheduleNo.toString()) !== -1}
    >
      <TableData>{row.ScheduleNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.ScheduleName}</TableData>
      <TableData>{row.ScheduleDesc}</TableData>
      <TableDataAction selected={selected.indexOf(row.ScheduleNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.ScheduleNo}`}
          checked={selected.indexOf(row.ScheduleNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.ScheduleNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default ScheduleTableRow
