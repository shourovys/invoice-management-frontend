import { viewApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IListServerResponse } from 'types/pages/common'
import { IFloorResult } from 'types/pages/floor'
import { ILiveDashboardFilters, TCurrentSplit } from 'types/pages/live'
import Icon, { fourBoxIcon, oneBoxIcon, twoBoxIcon } from 'utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Selector from '../../atomic/Selector'

interface IProps {
  handleSplits: (split: TCurrentSplit) => void
  filterState: ILiveDashboardFilters
  handleInputChange: THandleFilterInputChange
}
function LiveToolbar({ handleSplits, filterState, handleInputChange }: IProps) {
  const { isLoading: viewIsLoading, data: viewData } = useSWR<IListServerResponse<IFloorResult[]>>(
    viewApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <TableToolbarContainer>
      <div className="flex justify-between gap-2 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5 ">
        <div className="basis-1/4">
          <Selector
            name="view"
            placeholder="View"
            value={filterState.view}
            options={viewData?.results.map((result) => ({
              value: result.id.toString(),
              label: result.name,
            }))}
            onChange={handleInputChange}
            isLoading={viewIsLoading}
          />
        </div>

        <div className="flex gap-2 lg:gap-2 justify-items-end">
          <Button onClick={() => handleSplits(1)}>
            <Icon icon={oneBoxIcon} />
            <span>1 X 1</span>
          </Button>
          <Button onClick={() => handleSplits(2)}>
            <Icon icon={twoBoxIcon} />
            <span>1 X 2</span>
          </Button>
          <Button onClick={() => handleSplits(4)}>
            <Icon icon={fourBoxIcon} />
            <span>2 X 2</span>
          </Button>
        </div>
      </div>
    </TableToolbarContainer>
  )
}

export default LiveToolbar
