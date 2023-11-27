import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { ITriggerResult } from 'types/pages/trigger'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: ITriggerResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function TriggerTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.triggerInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
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

export default TriggerTableRow
