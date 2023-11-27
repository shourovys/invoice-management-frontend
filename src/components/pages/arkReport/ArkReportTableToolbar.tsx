import { THandleFilterInputChange } from 'types/components/common'
import { IArkReportFilters } from 'types/pages/arkReport'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'

interface IProps {
  filterState: IArkReportFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function ArkReportTableToolbar({
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
          name="event_name"
          placeholder="Event Name"
          value={filterState.event_name}
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
        {/* <input
                    id="event_time"
                    name="event_time"
                    value={filterState.event_time}
                    placeholder="ACK_Time"
                    type="time"
                    onChange={e =>
                        handleInputChange
                            ? handleInputChange("event_time", e.target.value)
                            : null
                    }
                    className={classNames(
                        "form-control block w-full px-3 py-1.5 text-sm font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none disabled:bg-[#F0F1F3] disabled:text-gray-600",
                        !filterState.event_time &&
                            "before:content-['ACK_Time'] before:mr-4 before:text-gray-400",
                    )}
                /> */}
        <Input
          name="ack_time"
          placeholder="ACK_Time"
          type="time"
          value={filterState.ack_time}
          onChange={handleInputChange}
        />
        <Input
          name="ack_user"
          placeholder="ACK User"
          value={filterState.ack_user}
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

export default ArkReportTableToolbar
