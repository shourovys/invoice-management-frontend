import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IInputResult, inputStatObject, inputTypeObject } from '../../../types/pages/input'
import Checkbox from '../../atomic/Checkbox'

interface IProps {
  row: IInputResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function InputTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.InputNo}
      link={routeProperty.inputInfo.path(row.InputNo.toString())}
      selected={selected.indexOf(row.InputNo.toString()) !== -1}
    >
      <TableData>{row.InputNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.InputName}</TableData>
      <TableData>{row.InputDesc}</TableData>
      <TableData>
        {row.Node?.NodeName}
        {row.Subnode && ` - ${row.Subnode.SubnodeName}`}
      </TableData>
      <TableData>{row.InputPort}</TableData>
      <TableData>{inputTypeObject[row.InputType]}</TableData>
      <TableData>{inputStatObject[row.InputStat]}</TableData>
      <TableDataAction selected={selected.indexOf(row.InputNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.InputNo}`}
          checked={selected.indexOf(row.InputNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.InputNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default InputTableRow
