import { formatApi, personApi } from 'api/urls'
import useSWR from 'swr'
import { THandleFilterInputChange } from 'types/components/common'
import { IListServerResponse } from 'types/pages/common'
import { ICredentialFilters, credentialStats, credentialTypes } from 'types/pages/credential'
import { IFormatResult } from 'types/pages/format'
import { IPersonResult } from 'types/pages/person'
import Icon, { applyIcon, resetIcon } from 'utils/icons'
import { SERVER_QUERY } from '../../../utils/config'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: ICredentialFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function CredentialTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  const { isLoading: formatIsLoading, data: formatData } = useSWR<
    IListServerResponse<IFormatResult[]>
  >(formatApi.list(SERVER_QUERY.selectorDataQuery))

  const { isLoading: personIsLoading, data: personData } = useSWR<
    IListServerResponse<IPersonResult[]>
  >(personApi.list(SERVER_QUERY.selectorDataQuery))

  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="id"
          placeholder="Credential No"
          value={filterState.id}
          onChange={handleInputChange}
        />
        <Selector
          name="format"
          placeholder="Format"
          value={filterState.format}
          options={formatData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          isLoading={formatIsLoading}
        />
        <Input
          name="number"
          placeholder="Credential Number"
          value={filterState.number}
          onChange={handleInputChange}
        />
        <Selector
          name="type"
          placeholder="Credential Type"
          value={filterState.type}
          options={credentialTypes}
          onChange={handleInputChange}
        />
        <Selector
          name="stat"
          placeholder="Credential Status"
          value={filterState.stat}
          options={credentialStats}
          onChange={handleInputChange}
        />
        <Selector
          name="person"
          placeholder="Credential Owner"
          value={filterState.person}
          options={personData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.last_name,
          }))}
          onChange={handleInputChange}
          isLoading={personIsLoading}
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

export default CredentialTableToolbar
