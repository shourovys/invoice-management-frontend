import TableData from 'components/HOC/style/table/TableData'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { ILogReportResult } from 'types/pages/logReport'

type IProps = {
  row: ILogReportResult
}
function LogReportTableRow({ row }: IProps) {
  return (
    <TableRow key={row.id} link={routeProperty.logInfo.path(row.id)}>
      <TableData>{row.id}</TableData>
      <TableData>{row.event_time}</TableData>
      <TableData>{row.event_name}</TableData>
      <TableData>{row.device_name}</TableData>
      <TableData>{row.person_name}</TableData>
    </TableRow>
  )
}

export default LogReportTableRow
