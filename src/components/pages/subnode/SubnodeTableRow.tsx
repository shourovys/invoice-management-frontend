import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { ISubnodeResult, subnodeModelOptionsObject } from 'types/pages/subnode'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: ISubnodeResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function SubnodeTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.subnodeInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.serial.name}</TableData>
      <TableData>{row.address}</TableData>
      <TableData>{subnodeModelOptionsObject[row.model]}</TableData>
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

export default SubnodeTableRow
