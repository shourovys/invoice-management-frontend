import { THandleFilterInputChange } from 'types/components/common'
import { INodeFilters } from 'types/pages/node'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'

interface IProps {
  filterState: INodeFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function NodeTableToolbar({
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
          placeholder="Node No"
          value={filterState.id}
          onChange={handleInputChange}
        />
        <Input
          name="name"
          placeholder="Node Name"
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Input name="mac" placeholder="MAC" value={filterState.mac} onChange={handleInputChange} />
        <Input
          name="address"
          placeholder="Address"
          value={filterState.address}
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

export default NodeTableToolbar
