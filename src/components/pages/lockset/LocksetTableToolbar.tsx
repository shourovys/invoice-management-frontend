import { gatewayApi, partitionApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IListServerResponse } from 'types/pages/common'
import { IGatewayResult } from 'types/pages/gateway'
import { ILocksetFilters } from '../../../types/pages/lockset'
import { IPartitionResult } from 'types/pages/partition'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: ILocksetFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function LocksetTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(partitionApi.list(SERVER_QUERY.selectorDataQuery))

  const { isLoading: gatewayIsLoading, data: gatewayData } = useSWR<
    IListServerResponse<IGatewayResult[]>
  >(gatewayApi.list(SERVER_QUERY.selectorDataQuery))

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          type="number"
          placeholder="Lockset No"
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
          placeholder="Lockset Name"
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Selector
          name="gateway"
          placeholder="Gateway"
          value={filterState.gateway}
          options={gatewayData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={gatewayIsLoading}
        />
        <Input
          name="link_id"
          type="number"
          placeholder="Link ID"
          value={filterState.link_id}
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

export default LocksetTableToolbar
