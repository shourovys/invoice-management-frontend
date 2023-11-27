import { useState } from 'react'
import { sendPostRequest } from 'api/swrConfig'
import { eventCodeApi } from 'api/urls'
import TableData from 'components/HOC/style/table/TableData'
import TableRow from 'components/HOC/style/table/TableRow'
import { THandleFilterInputChange } from 'types/components/common'
import {
  IEventCodeResult,
  eventLevelsOptionsObject,
  eventTypesOptionsObject,
} from 'types/pages/eventCode'
import { editSuccessfulToast } from 'utils/toast'
import useSWRMutation from 'swr/mutation'
import Checkbox from '../../atomic/Checkbox'

type IProps = {
  row: IEventCodeResult
  selected: string[]
}
function EventCodeTableRow({ row, selected }: IProps) {
  // state for store server value of checkboxes
  const [checkboxValue, setCheckboxValue] = useState({
    log_save: row.log_save,
    log_display: row.log_display,
    ack_required: row.ack_required,
    event_action: row.event_action,
  })
  // Define the mutation function for checkbox action
  const { trigger: enableDisableTrigger } = useSWRMutation(
    eventCodeApi.enableDisable,
    sendPostRequest,
    {
      onSuccess: () => {
        editSuccessfulToast()
      },
    }
  )

  const handleTableRowCheckboxAction: THandleFilterInputChange = (name, value) => {
    enableDisableTrigger({
      column: name,
      is_active: value,
      id: row.id,
    })
    setCheckboxValue((prevState) => ({ ...prevState, [name]: value }))
  }
  return (
    <TableRow key={row.id} selected={selected.indexOf(row.id.toString()) !== -1}>
      <TableData>{row.id}</TableData>
      <TableData>{row.name}</TableData>
      <TableData>{row.description}</TableData>
      <TableData>{eventTypesOptionsObject[row.event_type]}</TableData>
      <TableData>{eventLevelsOptionsObject[row.event_level]}</TableData>
      <TableData>
        <div className="flex items-center justify-center">
          <Checkbox
            value={`log_save-${row.id}`}
            checked={checkboxValue.log_save}
            onChange={(checked) => {
              handleTableRowCheckboxAction('log_save', checked)
            }}
          />
        </div>
      </TableData>
      <TableData>
        <div className="flex items-center justify-center">
          <Checkbox
            value={`log_display-${row.id}`}
            checked={checkboxValue.log_display}
            onChange={(checked) => {
              handleTableRowCheckboxAction('log_display', checked)
            }}
          />
        </div>
      </TableData>
      <TableData>
        <div className="flex items-center justify-center">
          <Checkbox
            value={`ack_required-${row.id}`}
            checked={checkboxValue.ack_required}
            onChange={(checked) => {
              handleTableRowCheckboxAction('ack_required', checked)
            }}
          />
        </div>
      </TableData>
      <TableData>
        <div className="flex items-center justify-center">
          <Checkbox
            value={`event_action-${row.id}`}
            checked={checkboxValue.event_action}
            onChange={(checked) => {
              handleTableRowCheckboxAction('event_action', checked)
            }}
          />
        </div>
      </TableData>
    </TableRow>
  )
}

export default EventCodeTableRow
