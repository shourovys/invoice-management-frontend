import { partitionApi } from '../../../api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from '../../../types/components/common'
import { IListServerResponse } from '../../../types/pages/common'
import { IDefinedFieldResult } from '../../../types/pages/definedField'
import { IPartitionResult } from '../../../types/pages/partition'
import { IPersonFilters } from '../../../types/pages/person'
import Icon, { applyIcon, resetIcon } from '../../../utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'
import DefinedFieldsInputs from './DefinedFieldsInputs'
import t from '../../../utils/translator'

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
          name="PersonNo"
          placeholder={t`Person No`}
          value={filterState.PersonNo.toString()}
          onChange={handleInputChange}
        />
        <Selector
          name="PartitionNo"
          placeholder={t`Partition`}
          value={filterState.PartitionNo}
          options={partitionData?.data.map((result) => ({
            value: result.PartitionNo.toString(),
            label: result.PartitionName,
          }))}
          onChange={handleInputChange}
          isLoading={partitionIsLoading}
        />
        <Input
          name="LastName"
          placeholder={t`Last Name`}
          value={filterState.LastName}
          onChange={handleInputChange}
        />
        <Input
          name="FirstName"
          placeholder={t`First Name`}
          value={filterState.FirstName}
          onChange={handleInputChange}
        />
        <Input
          name="Email"
          placeholder={t`Email`}
          value={filterState.Email}
          onChange={handleInputChange}
        />
        {definedFields?.map((item) => (
          <DefinedFieldsInputs
            key={item.FieldNo}
            definedField={item}
            filterState={filterState}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
      <div className="flex gap-3.5 lg:gap-4 justify-end md:justify-normal">
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

export default PersonTableToolbar
