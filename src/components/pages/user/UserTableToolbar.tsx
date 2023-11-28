import { THandleFilterInputChange } from '../../../types/components/common'
import { IUserFilters, userRoleOptions } from '../../../types/pages/user'
import Icon, { applyIcon, resetIcon } from '../../../utils/icons'
import t from '../../../utils/translator'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Button from '../../atomic/Button'
import Input from '../../atomic/Input'
import Selector from '../../atomic/Selector'

interface IProps {
  filterState: IUserFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function UserTableToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  return (
    <TableToolbarContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input name="no" placeholder={t`No`} value={filterState.no} onChange={handleInputChange} />
        <Selector
          name="role"
          placeholder="Role"
          value={filterState?.role}
          options={userRoleOptions}
          onChange={handleInputChange}
        />
        <Input
          name="name"
          placeholder={t`Name`}
          value={filterState.name}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          placeholder={t`Email`}
          value={filterState.email}
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

export default UserTableToolbar
