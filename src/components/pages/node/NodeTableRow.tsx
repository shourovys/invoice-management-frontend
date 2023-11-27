import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { INodeResult } from 'types/pages/node'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: INodeResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function NodeTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.nodeInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.mac}</TableData>
      <TableData>{row.product}</TableData>
      {/* <TableData>{row.node}</TableData> */}
      <TableData>{row.model ? 'Yse' : 'No'}</TableData>
      <TableData>{row.version}</TableData>
      <TableData>{row.address}</TableData>
      <TableData>{row.timezone}</TableData>
      <TableData>{row.online ? 'Yse' : 'No'}</TableData>
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

export default NodeTableRow
