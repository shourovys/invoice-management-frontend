import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IFormatResult } from 'types/pages/format'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IFormatResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function FormatTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.formatInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.default_format ? 'Yes' : 'No'}</TableData>
      <TableData>{row.key_format ? 'Yes' : 'No'}</TableData>
      <TableData>{row.total_length}</TableData>
      <TableData>{row.facility_code}</TableData>
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

export default FormatTableRow
