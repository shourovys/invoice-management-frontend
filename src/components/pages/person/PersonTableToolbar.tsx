import { partitionApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IListServerResponse } from 'types/pages/common'
import { IDefinedFieldResult } from 'types/pages/definedField'
import { IPartitionResult } from 'types/pages/partition'
import { IPersonFilters } from 'types/pages/person'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'
import DefinedFieldsInputs from './DefinedFieldsInputs'

interface IProps {
  filterState: IPersonFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
  definedFields?: IDefinedFieldResult[]
}

function PersonTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
  definedFields,
}: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(partitionApi.list(SERVER_QUERY.selectorDataQuery))

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          placeholder="Person No"
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
          name="last_name"
          placeholder="Last Name"
          value={filterState.last_name}
          onChange={handleInputChange}
        />
        <Input
          name="first_name"
          placeholder="First Name"
          value={filterState.first_name}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={filterState.email}
          onChange={handleInputChange}
        />
        {definedFields?.map((item) => (
          <DefinedFieldsInputs
            key={item.id}
            definedField={item}
            filterState={filterState}
            handleInputChange={handleInputChange}
          />
        ))}
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

export default PersonTableToolbar
