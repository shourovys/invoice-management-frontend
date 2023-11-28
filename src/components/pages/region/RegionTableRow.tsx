import TableData from '../../../components/HOC/style/table/TableData'
import TableDataAction from '../../../components/HOC/style/table/TableDataAction'
import TableRow from '../../../components/HOC/style/table/TableRow'
import routeProperty from '../../../routes/routeProperty'
import { IRegionResult } from '../../../types/pages/region'
import Checkbox from '../../atomic/Checkbox'
import t from '../../../utils/translator'

type IProps = {
  row: IRegionResult
  selected: string[]
  handleSelectRow: (selectedId: string) => void
}

function RegionTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row.RegionNo}
      link={routeProperty.regionInfo.path(row.RegionNo.toString())}
      selected={selected.indexOf(row.RegionNo.toString()) !== -1}
    >
      <TableData>{row.RegionNo}</TableData>
      <TableData>{row.RegionName}</TableData>
      <TableData>{row.RegionDesc}</TableData>
      <TableData>{row.Partition.PartitionName}</TableData>
      <TableData>{row.DeadmanStat ? t`Yes` : t`No`}</TableData>
      <TableData>{row.HazmatStat ? t`Yes` : t`No`}</TableData>
      <TableDataAction selected={selected.indexOf(row.RegionNo.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row.RegionNo}`}
          checked={selected.indexOf(row.RegionNo.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row.RegionNo.toString())
          }}
        />
      </TableDataAction>
    </TableRow>
  )
}

export default RegionTableRow
