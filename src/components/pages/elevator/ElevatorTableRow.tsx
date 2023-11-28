import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IElevatorResult, elevatorStatTypesObject } from '../../../types/pages/elevator'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IElevatorResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function ElevatorTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.ElevatorNo}
      link={routeProperty.elevatorInfo.path(row.ElevatorNo.toString())}
      selected={selected.indexOf(row.ElevatorNo.toString()) !== -1}
    >
      <TableData>{row.ElevatorNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.ElevatorName}</TableData>
      <TableData>{row.ElevatorDesc}</TableData>
      <TableData>
        {row?.Node?.NodeName}
        {row.Subnode && ` - ${row.Subnode.SubnodeName}`}
      </TableData>
      <TableData>{elevatorStatTypesObject[row.ElevatorStat]}</TableData>
      <TableDataAction selected={selected.indexOf(row.ElevatorNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.ElevatorNo}`}
          checked={selected.indexOf(row.ElevatorNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.ElevatorNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default ElevatorTableRow
