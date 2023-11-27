import Icon, { applyIcon, resetIcon } from 'utils/icons'

import { nvrApi, partitionApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IChannelFilters } from 'types/pages/channel'
import { IListServerResponse } from 'types/pages/common'
import { INvrResult } from 'types/pages/nvr'
import { IPartitionResult } from 'types/pages/partition'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: IChannelFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function ChannelTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(partitionApi.list(SERVER_QUERY.selectorDataQuery))

  const { isLoading: nvrIsLoading, data: nvrData } = useSWR<IListServerResponse<INvrResult[]>>(
    nvrApi.list(SERVER_QUERY.selectorDataQuery)
  )
  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          placeholder="Channel No"
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
          placeholder="Channel Name"
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Selector
          name="nvr"
          placeholder="Nvr"
          value={filterState.nvr}
          options={nvrData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={nvrIsLoading}
        />
        <Input
          name="channel_no"
          type="number"
          placeholder="Channel ID"
          value={filterState.channel_no}
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

export default ChannelTableToolbar
