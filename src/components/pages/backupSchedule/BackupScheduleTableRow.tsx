import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IBackupScheduleResult, backupScheduleMediaObject } from 'types/pages/backupSchedule'
import { maintenanceBackupObject } from 'types/pages/maintenance'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IBackupScheduleResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function BackupScheduleTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.backupScheduleInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{backupScheduleMediaObject[row.media.toString()]}</TableData>
      <TableData>{maintenanceBackupObject[row.backup_type.toString()]}</TableData>
      <TableData>{row.schedule?.name}</TableData>
      <TableData>{row.backup_time}</TableData>
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

export default BackupScheduleTableRow
