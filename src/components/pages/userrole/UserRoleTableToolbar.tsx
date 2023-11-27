import { partitionApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IListServerResponse } from 'types/pages/common'
import { IPartitionResult } from 'types/pages/partition'
import { IUserRoleFilters } from 'types/pages/userRole'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: IUserRoleFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function UserRoleTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(partitionApi.list(SERVER_QUERY.selectorDataQuery))

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          placeholder="Role No"
          value={filterState.id}
          onChange={handleInputChange}
        />
        <Selector
          name="partition"
          placeholder="Partition"
          value={filterState.partition}
          options={partitionData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={partitionIsLoading}
        />
        <Input
          name="name"
          placeholder="Role Name"
          value={filterState.name}
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

export default UserRoleTableToolbar
