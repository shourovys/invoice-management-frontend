import TableToolbarContainer from '../../../../components/HOC/style/table/TableToolbarContainer'
import Button from '../../../../components/atomic/Button'
import Input from '../../../../components/atomic/Input'
import { THandleFilterInputChange } from '../../../../types/components/common'
import { IFormatFilters } from '../../../../types/pages/format'
import Icon, { applyIcon, resetIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  filterState: IFormatFilters
  handleFilterApply: () => void
  handleFilterStateReset: () => void
  handleInputChange: THandleFilterInputChange
}

function FormatListModalToolbar({
  filterState,
  handleFilterApply,
  handleFilterStateReset,
  handleInputChange,
}: IProps) {
  return (
    <TableToolbarContainer padding={false}>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 md:gap-6 md:flex-nowrap md:pb-3">
        <div className="grid grow grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:gap-x-3 sm:gap-y-2 lg:gap-x-4">
          {/*<Input*/}
          {/*  name="FormatNo"*/}
          {/*  placeholder={t`Format No`}*/}
          {/*  value={filterState.FormatNo}*/}
          {/*  onChange={handleInputChange}*/}
          {/*/>*/}
          <Input
            name="FormatName"
            placeholder={t`Format Name`}
            value={filterState.FormatName}
            onChange={handleInputChange}
          />
          <Input
            name="TotalLength"
            placeholder={t`Total Length`}
            value={filterState.TotalLength}
            onChange={handleInputChange}
          />
          <Input
            name="FacilityCode"
            placeholder={t`Facility Code`}
            value={filterState.FacilityCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-3.5 lg:gap-4">
          <Button onClick={handleFilterApply} size="small">
            <Icon icon={applyIcon} />
            <span>{t`Apply`}</span>
          </Button>
          <Button color="danger" onClick={handleFilterStateReset} size="small">
            <Icon icon={resetIcon} />
            <span>{t`Reset`}</span>
          </Button>
        </div>
      </div>
    </TableToolbarContainer>
  )
}

export default FormatListModalToolbar
