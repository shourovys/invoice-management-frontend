import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { booleanSelectObject } from '../../../types/pages/common'
import {
  IIntercomResult,
  intercomContactStatObject,
  intercomLockStatObject,
} from '../../../types/pages/intercom'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IIntercomResult
  selected: string[]
  handleSelectRow: (selectedId: string) => void
}

function IntercomTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.IntercomNo}
      link={routeProperty.intercomInfo.path(row.IntercomNo.toString())}
      selected={selected.indexOf(row.IntercomNo.toString()) !== -1}
    >
      <TableData>{row.IntercomNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.IntercomName}</TableData>
      <TableData>{row.IntercomDesc}</TableData>
      <TableData>{row.Node?.NodeName}</TableData>
      <TableData>{row.IpAddress}</TableData>
      <TableData>{booleanSelectObject[row.Online]}</TableData>
      <TableData>{booleanSelectObject[row.Busy]}</TableData>
      <TableData>{intercomLockStatObject[row.LockStat]}</TableData>
      <TableData>{intercomContactStatObject[row.ContactStat]}</TableData>
      <TableDataAction selected={selected.indexOf(row.IntercomNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.IntercomNo}`}
          checked={selected.indexOf(row.IntercomNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.IntercomNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default IntercomTableRow