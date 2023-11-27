import Button from 'components/atomic/Button'
import { THandleFilterInputChange } from 'types/components/common'
import { IAckDashboardFormData } from 'types/pages/ackDashboard'
import Icon, { applyIcon } from 'utils/icons'
import TableToolbarContainer from '../../HOC/style/table/TableToolbarContainer'
import Input from '../../atomic/Input'

interface IProps {
  listFormState: IAckDashboardFormData
  isSubmitting: boolean
  handleSubmit: () => void
  handleInputChange: THandleFilterInputChange
}

function AckDashboardTableToolbar({
  listFormState,
  isSubmitting,
  handleSubmit,
  handleInputChange,
}: IProps) {
  return (
    <TableToolbarContainer>
      <div className="flex sm:gap-x-3 sm:gap-y-2 lg:gap-x-5">
        <Input
          name="comment"
          placeholder="Comment"
          value={listFormState.comment}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} isLoading={isSubmitting}>
          <Icon icon={applyIcon} />
          <span>Apply</span>
        </Button>
      </div>
    </TableToolbarContainer>
  )
}

export default AckDashboardTableToolbar
