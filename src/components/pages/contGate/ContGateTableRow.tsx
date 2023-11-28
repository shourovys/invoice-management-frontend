import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { booleanSelectObject } from '../../../types/pages/common'
import { IContGateResult } from '../../../types/pages/contGate'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IContGateResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function ContGateTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.ContGateNo}
      link={routeProperty.contGateInfo.path(row.ContGateNo.toString())}
      selected={selected.indexOf(row.ContGateNo.toString()) !== -1}
    >
      <TableData>{row.ContGateNo}</TableData>
      <TableData>{row.ContGateName}</TableData>
      <TableData>{row.ContGateDesc}</TableData>
      <TableData>{row.Node.NodeName}</TableData>
      <TableData>{row.IpAddress}</TableData>
      <TableData>{booleanSelectObject[row.Online]}</TableData>
      <TableData>{booleanSelectObject[row.Busy]}</TableData>

      <TableDataAction selected={selected.indexOf(row.ContGateNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.ContGateNo}`}
          checked={selected.indexOf(row.ContGateNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.ContGateNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default ContGateTableRow
