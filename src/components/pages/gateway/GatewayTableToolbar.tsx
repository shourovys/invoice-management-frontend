import { nodeApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IListServerResponse } from 'types/pages/common'
import { IGatewayFilters } from 'types/pages/gateway'
import { INodeResult } from 'types/pages/node'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: IGatewayFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function GatewayTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          placeholder="Gateway No"
          value={filterState.id}
          onChange={handleInputChange}
        />
        <Input
          name="name"
          placeholder="Gateway Name"
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Selector
          name="node"
          placeholder="Node"
          value={filterState.node}
          options={nodeData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={nodeIsLoading}
        />
        <Input
          name="ip_address"
          placeholder="IP Addess"
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

export default GatewayTableToolbar
