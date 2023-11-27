import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IArchiveScheduleResult, archiveScheduleMediaObject } from 'types/pages/archiveSchedule'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IArchiveScheduleResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function ArchiveScheduleTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.archiveScheduleInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{archiveScheduleMediaObject[row.media.toString()]}</TableData>
      <TableData>{row.usage_based ? 'Yes' : 'No'}</TableData>
      <TableData>{row.usage_percent}</TableData>
      <TableData>{row.schedule?.name}</TableData>
      <TableData>{row.archive_time}</TableData>
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

export default ArchiveScheduleTableRow
