import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import { INodeScanResult } from 'types/pages/nodeScan'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: INodeScanResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function NodeScanTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      // link={routeProperty.nodeScanInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.mac}</TableData>
      <TableData>{row.product}</TableData>
      <TableData>{row.model}</TableData>
      <TableData>{row.type}</TableData>
      <TableData>{row.node_type}</TableData>
      <TableData>{row.elevator ? 'Yes' : 'No'}</TableData>
      <TableData>{row.licensed ? 'Yes' : 'No'}</TableData>
      <TableData>{row.address}</TableData>
      <TableData>{row.version}</TableData>
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

export default NodeScanTableRow
