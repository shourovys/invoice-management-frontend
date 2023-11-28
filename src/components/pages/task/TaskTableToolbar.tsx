import { partitionApi } from '../../../api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from '../../../types/components/common'
import { IListServerResponse } from '../../../types/pages/common'
import { IPartitionResult } from '../../../types/pages/partition'
import { ITaskFilters, taskActionTypes } from '../../../types/pages/task'
import Icon, { applyIcon, resetIcon } from '../../../utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'
import t from '../../../utils/translator'
import useLicenseFilter from '../../../hooks/useLicenseFilter'

interface IProps {
  filterState: ITaskFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function TaskTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(partitionApi.list(SERVER_QUERY.selectorDataQuery))

  const filteredTaskActionTypes = useLicenseFilter(taskActionTypes, {
    '10': 'Camera',
    '12': 'Lockset',
    '13': 'Facegate',
    '15': 'ContLock',
    '16': 'Intercom',
  })

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="TaskNo"
          placeholder={t`Task No`}
          value={filterState.TaskNo}
          onChange={handleInputChange}
        />
        <Selector
          name="Partition"
          placeholder={t`Partition`}
          value={filterState.Partition}
          options={partitionData?.data.map((result) => ({
            value: result.PartitionNo.toString(),
            label: result.PartitionName,
          }))}
          onChange={handleInputChange}
          isLoading={partitionIsLoading}
        />
        <Input name="TaskName" placeholder={t`Task Name`} onChange={handleInputChange} />

        <Selector
          name="ActionType"
          placeholder={t`Action Type`}
          value={filterState.ActionType}
          options={filteredTaskActionTypes}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-3.5 lg:gap-4">
        <Button onClick={handleFilterApply}>
          <Icon icon={applyIcon} />
          <span>{t`Apply`}</span>
        </Button>
        <Button color="danger" onClick={handleFilterStateReset}>
          <Icon icon={resetIcon} />
          <span>{t`Reset`}</span>
        </Button>
      </div>
    </TableToolbarContainer>
  )
}

export default TaskTableToolbar
