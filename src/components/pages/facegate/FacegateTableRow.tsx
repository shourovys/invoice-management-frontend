import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IFacegateResult } from 'types/pages/facegate'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IFacegateResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function FacegateTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.facegateInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.node.name}</TableData>
      <TableData>{row.ip_address}</TableData>
      <TableData>{row.online ? 'Yes' : 'No'}</TableData>
      <TableData>{row.lock_stat ? 'Yes' : 'No'}</TableData>
      <TableData>{row.contact_stat ? 'Yes' : 'No'}</TableData>
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

export default FacegateTableRow
