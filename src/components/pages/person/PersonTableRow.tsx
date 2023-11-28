import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IDefinedFieldResult } from '../../../types/pages/definedField'
import { IPersonResult } from '../../../types/pages/person'
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
      key={row.PersonNo}
      link={routeProperty.personInfo.path(row.PersonNo)}
      selected={selected.indexOf(row.PersonNo.toString()) !== -1}
    >
      <TableData>{row.PersonNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.LastName}</TableData>
      <TableData>{row.FirstName}</TableData>
      <TableData>{row.Email}</TableData>
      {definedFields?.map((item) => (
        <DefinedFieldsRows definedField={item} row={row} key={item.FieldNo} />
      ))}
      <TableDataAction selected={selected.indexOf(row.PersonNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.PersonNo}`}
          checked={selected.indexOf(row.PersonNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.PersonNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default PersonTableRow
