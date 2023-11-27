import { floorApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IElementsResult, IListServerResponse } from 'types/pages/common'
import { IFloorResult } from 'types/pages/floor'
import { IFloorDashboardFilters, floorDeviceTypes } from 'types/pages/floorDashboard'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Selector, { TSelectValue } from '../../atomic/Selector'

interface IProps {
  filterState: IFloorDashboardFilters
  handleInputChange: THandleFilterInputChange
}

function FloorDashboardTableToolbar({ filterState, handleInputChange }: IProps) {
  const { isLoading: floorIsLoading, data: floorData } = useSWR<
    IListServerResponse<IFloorResult[]>
  >(floorApi.list(SERVER_QUERY.selectorDataQuery))

  // Fetch elements by type from the server
  const { isLoading: devicesIsLoading, data: devicesData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    !filterState.device_type?.value
      ? null
      : ElementsApi.list(`type=${filterState?.device_type?.value}`)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange(name, selectedValue)
      handleInputChange('device', null)
    }
  }

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Selector
          name="floor"
          placeholder="Floor"
          value={filterState.floor}
          options={floorData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={floorIsLoading}
        />
        <Selector
          name="device_type"
          placeholder="Device Type"
          value={filterState.device_type}
          options={floorDeviceTypes}
          onChange={handleTypeChange}
        />
        <Selector
          name="device"
          placeholder="Device"
          value={filterState.device}
          options={devicesData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={devicesIsLoading}
        />
      </div>
    </TableToolbarContainer>
  )
}

export default FloorDashboardTableToolbar
