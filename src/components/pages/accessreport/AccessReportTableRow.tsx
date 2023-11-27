import TableData from 'components/HOC/style/table/TableData'
import TableRow from 'components/HOC/style/table/TableRow'
import { IAccessReportResult } from 'types/pages/accessReport'

type IProps = {
  row: IAccessReportResult
}
function AccessReportTableRow({ row }: IProps) {
  return (
    <TableRow key={row.id}>
      <TableData>{row.event_time}</TableData>
      <TableData>{row.event_name}</TableData>
      <TableData>{row.person.id}</TableData>
      <TableData>{row.person_name}</TableData>
      <TableData>{row.credential_numb}</TableData>
      <TableData>{row.device_name}</TableData>
      <TableData>{row.region.name}</TableData>
    </TableRow>
  )
}

export default AccessReportTableRow
