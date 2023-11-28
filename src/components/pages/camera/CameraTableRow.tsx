import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { ICameraResult } from '../../../types/pages/camera'
import Checkbox from '../../atomic/Checkbox'
import t from '../../../utils/translator'

type IProps = {
  row: ICameraResult
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function CameraTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.CameraNo}
      link={routeProperty.cameraInfo.path(row.CameraNo.toString())}
      selected={selected.indexOf(row.CameraNo.toString()) !== -1}
    >
      <TableData>{row.CameraNo}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.CameraName}</TableData>
      <TableData>{row.CameraDesc}</TableData>
      <TableData>{row.Node ? row.Node.NodeName : ''}</TableData>
      <TableData>{row.CameraPort}</TableData>
      <TableData>{row.Online ? t`Yes` : t`No`}</TableData>
      <TableData>{row.RecordStat ? t`Record On` : t`Record Off`}</TableData>
      <TableDataAction selected={selected.indexOf(row.CameraNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.CameraNo}`}
          checked={selected.indexOf(row.CameraNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.CameraNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default CameraTableRow
