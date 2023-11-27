import { THandleFilterInputChange } from 'types/components/common'
import { IEventCodeFilters, eventLevelsOptions, eventTypesOptions } from 'types/pages/eventCode'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: IEventCodeFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function EventCodeTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          placeholder="Event Code"
          value={filterState.id}
          onChange={handleInputChange}
        />
        <Input
          name="name"
          placeholder="Event Name"
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Selector
          name="event_type"
          placeholder="Event Type"
          value={filterState.event_type}
          options={eventTypesOptions}
          onChange={handleInputChange}
        />
        <Selector
          name="event_level"
          placeholder="Event Level"
          value={filterState.event_level}
          options={eventLevelsOptions}
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

export default EventCodeTableToolbar
