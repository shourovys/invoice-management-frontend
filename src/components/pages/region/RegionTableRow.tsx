import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IRegionResult } from 'types/pages/region'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IRegionResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function RegionTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.regionInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.deadman_stat ? 'Yes' : 'No'}</TableData>
      <TableData>{row.hazmat_stat ? 'Yes' : 'No'}</TableData>
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

export default RegionTableRow
