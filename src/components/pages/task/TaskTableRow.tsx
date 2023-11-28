import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { ITaskResult, taskActionTypesObject } from '../../../types/pages/task'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: ITaskResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function TaskTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.TaskNo}
      link={routeProperty.taskInfo.path(row.TaskNo.toString())}
      selected={selected.indexOf(row.TaskNo.toString()) !== -1}
    >
      <TableData>{row.TaskNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.TaskName}</TableData>
      <TableData>{row.TaskDesc}</TableData>
      <TableData>{taskActionTypesObject[row.ActionType]}</TableData>
      <TableDataAction selected={selected.indexOf(row.TaskNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.TaskNo}`}
          checked={selected.indexOf(row.TaskNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.TaskNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default TaskTableRow
