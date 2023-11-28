import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IPartitionResult } from '../../../types/pages/partition'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IPartitionResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function PartitionTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.PartitionNo}
      link={routeProperty.partitionInfo.path(row.PartitionNo)}
      selected={selected.indexOf(row.PartitionNo.toString()) !== -1}
    >
      <TableData>{row.PartitionNo}</TableData>
      <TableData>{row.PartitionName}</TableData>
      <TableData>{row.PartitionDesc}</TableData>
      <TableDataAction selected={selected.indexOf(row.PartitionNo.toString()) !== -1}>
        {row.PartitionNo !== 0 && (
          <Checkbox
            value={`select-row-${row.PartitionNo}`}
            checked={selected.indexOf(row.PartitionNo.toString()) !== -1}
            onChange={() => {
              handleSelectRow(row.PartitionNo.toString())
            }}
          />
        )}
      </TableDataAction>
    </TableRow>
  )
}
export default PartitionTableRow
