import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { activeSelectObject } from '../../../types/pages/common'
import { ILocksetResult } from '../../../types/pages/lockset'
import Checkbox from '../../atomic/Checkbox'
import t from '../../../utils/translator'

type IProps = {
  row: ILocksetResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function LocksetTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.LocksetNo}
      link={routeProperty.locksetInfo.path(row.LocksetNo.toString())}
      selected={selected.indexOf(row.LocksetNo.toString()) !== -1}
    >
      <TableData>{row.LocksetNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.LocksetName}</TableData>
      <TableData>{row.LocksetDesc}</TableData>
      <TableData>{row.Gateway?.GatewayName}</TableData>
      <TableData>{row.LinkId}</TableData>
      <TableData>{row.Online ? t`Yes` : t`No`}</TableData>
      <TableData>{activeSelectObject[row.LockStat]}</TableData>
      <TableData>{activeSelectObject[row.ContactStat]}</TableData>
      <TableDataAction selected={selected.indexOf(row.LocksetNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.LocksetNo}`}
          checked={selected.indexOf(row.LocksetNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.LocksetNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default LocksetTableRow
