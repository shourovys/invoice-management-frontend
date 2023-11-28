import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { groupTypesOptions, IGroupResult } from '../../../types/pages/group'
import { findSelectOption } from '../../../utils/findSelectOption'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IGroupResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function GroupTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.GroupNo}
      link={routeProperty.groupInfo.path(row.GroupNo)}
      selected={selected.indexOf(row.GroupNo.toString()) !== -1}
    >
      <TableData>{row.GroupNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.GroupName}</TableData>
      <TableData>{row.GroupDesc}</TableData>
      <TableData>{findSelectOption(groupTypesOptions, row.GroupType)?.label}</TableData>
      <TableDataAction selected={selected.indexOf(row.GroupNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.GroupNo}`}
          checked={selected.indexOf(row.GroupNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.GroupNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default GroupTableRow
