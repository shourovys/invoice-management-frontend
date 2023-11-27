import TableData from 'components/HOC/style/table/TableData'
import TableRow from 'components/HOC/style/table/TableRow'
import { IArkReportResult } from 'types/pages/arkReport'

type IProps = {
  row: IArkReportResult
}
function ArkReportTableRow({ row }: IProps) {
  return (
    <TableRow key={row.id}>
      <TableData>{row.id}</TableData>
      <TableData>{row.event_time}</TableData>
      <TableData>{row.event_name}</TableData>
      <TableData>{row.device_name}</TableData>
      <TableData>{row.person_name}</TableData>
      <TableData>{row.ack_time}</TableData>
      <TableData>{row.ack_user}</TableData>
      <TableData>{row.comment}</TableData>
    </TableRow>
  )
}

export default ArkReportTableRow
