import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IDoorRuleResult, doorRuleTypeObject } from '../../../types/pages/doorRule'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IDoorRuleResult
  selected: string[]
  handleSelectRow: (selectedId: string) => void
}

function DoorRuleTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.RuleNo}
      link={routeProperty.doorRuleInfo.path(row.RuleNo.toString())}
      selected={selected.includes(row.RuleNo.toString())}
    >
      <TableData>{row.RuleNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.RuleName}</TableData>
      <TableData>{row.RuleDesc}</TableData>
      <TableData>{doorRuleTypeObject[row.RuleType]}</TableData>
      <TableData>{row.Door?.DoorName}</TableData>
      <TableData>{row.Schedule?.ScheduleName}</TableData>
      <TableDataAction selected={selected.includes(row.RuleNo.toString())}>
        <Checkbox
          value={`select-row-${row.RuleNo}`}
          checked={selected.includes(row.RuleNo.toString())}
          onChange={() => {
            handleSelectRow(row.RuleNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default DoorRuleTableRow
