import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IInputResult } from 'types/pages/input'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IInputResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function InputTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.inputInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.node.name}</TableData>
      <TableData>{row.port}</TableData>
      <TableData>{row.type}</TableData>
      <TableData>{row.stat}</TableData>
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

export default InputTableRow
