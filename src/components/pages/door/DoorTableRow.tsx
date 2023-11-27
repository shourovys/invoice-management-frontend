import TableData from 'components/HOC/style/table/TableData'
import TableDataAction from 'components/HOC/style/table/TableDataAction'
import TableRow from 'components/HOC/style/table/TableRow'
import routeProperty from 'routes/routeProperty'
import { IDoorResult } from 'types/pages/door'

import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IDoorResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}
function DoorTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.id}
      link={routeProperty.doorInfo.path(row.id)}
      selected={selected.indexOf(row.id.toString()) !== -1}
    >
      <TableData>{row.id}</TableData>
      <TableData>{row.partition.name}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{row.node.name}</TableData>
      <TableData>{row.port}</TableData>
      {/* <TableData>{row.door_stat ? "Yes" : "NO"}</TableData> */}
      {/* <TableData>{row.lock_stat ? "Locked" : "UnLocked"}</TableData> */}
      {/* <TableData>{row.contact_stat ? "Open" : "Close"}</TableData> */}
      {/* <TableData>{row.alert_stat ? "Yes" : "Node"}</TableData> */}

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

export default DoorTableRow
