import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IEventActionResult } from 'types/pages/eventAction'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IEventActionResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function EventActionTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.eventActionInfo.path(row.id)}
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

export default EventActionTableRow
