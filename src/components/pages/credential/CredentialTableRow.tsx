import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import {
  ICredentialResult,
  credentialStatsObject,
  credentialTypesObject,
} from 'types/pages/credential'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: ICredentialResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function CredentialTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.credentialInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.format.name}</TableData>
      <TableData>{row.number}</TableData>
      <TableData>{credentialTypesObject[row.type]}</TableData>
      <TableData>{credentialStatsObject[row.stat]}</TableData>
      <TableData>{row.person.last_name}</TableData>

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

export default CredentialTableRow
