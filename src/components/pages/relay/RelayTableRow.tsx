import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IRelayResult } from 'types/pages/relay'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IRelayResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function RelayTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.relayInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition?.name}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.node?.name}</TableData>
      <TableData>{row.port}</TableData>
      <TableData>{row.elevator?.name}</TableData>
      <TableData>{row.type}</TableData>
      <TableData>{row.relay_stat}</TableData>
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

export default RelayTableRow
