import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IDefinedFieldResult } from 'types/pages/definedField'
import { IPersonResult } from 'types/pages/person'
import Checkbox from '../../atomic/Checkbox'
import DefinedFieldsRows from './DefinedFieldsRows'

type IProps = {
  row: IPersonResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
  definedFields?: IDefinedFieldResult[]
}
function PersonTableRow({ row, selected, handleSelectRow, definedFields }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.personInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.last_name}</TableData>
      <TableData>{row.first_name}</TableData>
      <TableData>{row.email}</TableData>
      {definedFields?.map((item) => (
        <DefinedFieldsRows definedField={item} row={row} key={item.id} />
      ))}
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

export default PersonTableRow
