import { THandleFilterInputChange } from 'types/components/common'
import { INvrFilters, NVR_TYPE_OPTIONS } from 'types/pages/nvr'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: INvrFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function NvrTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input name="id" placeholder="NVR No" value={filterState.id} onChange={handleInputChange} />
        <Input
          name="name"
          placeholder="NVR Name"
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Selector
          name="type"
          placeholder="NVR Type"
          value={filterState.type}
          options={NVR_TYPE_OPTIONS}
          onChange={handleInputChange}
        />
        <Input
          name="ip_address"
          placeholder="IP Address"
          value={filterState.ip_address}
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

export default NvrTableToolbar
