import Selector from 'components/atomic/Selector'
import { THandleFilterInputChange } from 'types/components/common'
import { ILogReportFilters } from 'types/pages/logReport'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'

interface IProps {
  filterState: ILogReportFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function LogReportTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input name="id" placeholder="Log No" value={filterState.id} onChange={handleInputChange} />
        <Input
          name="event_time"
          placeholder="Event_Time"
          type="time"
          value={filterState.event_time}
          onChange={handleInputChange}
        />
        <Input
          name="log_time"
          placeholder="Log_Time"
          type="time"
          value={filterState.log_time}
          onChange={handleInputChange}
        />
        <Input
          name="event_code"
          placeholder="Event Code"
          value={filterState.event_code}
          onChange={handleInputChange}
        />
        <Input
          name="event_name"
          placeholder="Event Name"
          value={filterState.event_name}
          onChange={handleInputChange}
        />
        <Selector
          name="device_type"
          placeholder="Device Type"
          value={filterState.device_type}
          // options={deviceTypeOptions}
          onChange={handleInputChange}
        />
        <Input
          name="device_no"
          placeholder="Device No"
          value={filterState.device_no}
          onChange={handleInputChange}
        />
        <Input
          name="device_name"
          placeholder="Device Name"
          value={filterState.device_name}
          onChange={handleInputChange}
        />
        <Input
          name="person_name"
          placeholder="Person Name"
          value={filterState.person_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-3.5 lg:gap-4">
        <Button onClick={handleFilterApply}>
          <Icon icon={applyIcon} />
          <span>Apply</span>
        </Button>
        <Button color="gray" onClick={handleFilterStateReset}>
          <Icon icon={resetIcon} />
          <span>Reset</span>
        </Button>
      </div>
    </TableToolbarContainer>
  )
}

export default LogReportTableToolbar
