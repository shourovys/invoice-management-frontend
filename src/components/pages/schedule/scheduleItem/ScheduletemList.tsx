import { sendMultiDeleteRequest } from '../../../../api/swrConfig'
import { scheduleItemApi } from '../../../../api/urls'
import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Table from '../../../../components/HOC/style/table/Table'
import TableEmptyRows from '../../../../components/common/table/TableEmptyRows'
import TableHeader from '../../../../components/common/table/TableHeader'
import TableNoData from '../../../../components/common/table/TableNoData'
import TableBodyLoading from '../../../../components/loading/table/TableBodyLoading'
import useAlert from '../../../../hooks/useAlert'
import useTable, { emptyRows } from '../../../../hooks/useTable'
import QueryString from 'qs'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import routeProperty from '../../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../../types/components/actionButtons'
import { ITableHead } from '../../../../types/components/table'
import { IApiQueryParamsBase, IListServerResponse } from '../../../../types/pages/common'
import { IScheduleItemResult } from '../../../../types/pages/scheduleItem'
import executeCallbackIfRowSelected from '../../../../utils/executeCallbackIfRowSelected'
import { addIcon, deleteIcon, listIcon } from '../../../../utils/icons'
import ScheduleItemTableRow from './ScheduleItemTableRow'
import t from '../../../../utils/translator'

const TABLE_HEAD: ITableHead[] = [
  { id: 'ScheduleType', label: t`Schedule Type`, filter: true },
  { id: 'Weekdays/Monthday/OneDate', label: t`Select`, filter: false },
  { id: 'TimeType', label: t`Time Type`, filter: true },
  { id: 'StartTime', label: t`Start Time`, filter: true },
  { id: 'EndTime', label: t`End Time`, filter: true },
]

// Component to show list of a schedule items
function ScheduleItemList() {
  // Get the schedule ID from the router query
  const params = useParams()
  const scheduleId = params.id as string

  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    handleSort,
    handleOrder,
    handleSelectRow,
    handleSelectAllRow,
  } = useTable({ defaultOrderBy: TABLE_HEAD[0].id })
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // state to store deleted rows ids
  const [isDeletedIds, setIsDeletedIds] = useState<string[]>([])

  // query object of pagination, sorting, filtering
  const apiQueryParams: IApiQueryParamsBase = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    // query for fetch table data after delete row
    ...(isDeletedIds.length && {
      isDeletedIds: JSON.stringify(isDeletedIds),
    }),
  }

  const apiQueryString = QueryString.stringify(apiQueryParams)

  const { isLoading, data } = useSWR<IListServerResponse<IScheduleItemResult[]>>(
    scheduleItemApi.list(scheduleId, apiQueryString)
  )

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    scheduleItemApi.deleteMultiple(scheduleId),
    sendMultiDeleteRequest,
    {
      // Show a success message and redirect to partition list page on successful delete
      onSuccess: () => {
        handleSelectAllRow(false, [])
      },
      // If error occurred - make delete false
      onError: () => {
        setIsDeletedIds([])
      },
    }
  )

  const handleDeleteMultiple = () => {
    const requestData = { ids: selected }

    if (requestData.ids.length) {
      const handleDelete = () => {
        return multipleDeleteTrigger({
          data: requestData,
        }).then(() => {
          // update detected rows id for refetch table data
          setIsDeletedIds(selected)
        })
      }

      openAlertDialogWithPromise(handleDelete, { success: t`Successful` })
    }
  }

  // Define the actions for the Form card header
  const headerActionButtons: IActionsButton[] = [
    {
      icon: addIcon,
      text: t`Add`,
      link: routeProperty.scheduleItemCreate.path(scheduleId),
      size: 'small',
    },
    {
      color: 'danger',
      icon: deleteIcon,
      text: t`Delete`,
      onClick: () =>
        executeCallbackIfRowSelected(!selected.length, handleDeleteMultiple, 'Select an Item'),
      size: 'small',
    },
  ]
  const isNotFound = !data?.data.length && !isLoading

  return (
    <FormCardWithHeader
      icon={listIcon}
      header={t`Schedule Items`}
      twoPart={false}
      headerActionButtons={headerActionButtons}
    >
      <Table>
        <TableHeader
          order={order}
          orderBy={orderBy}
          numSelected={selected.length}
          rowCount={data?.data.length}
          handleSort={handleSort}
          handleOrder={handleOrder}
          selectAllRow={(isAllSelected: boolean) => {
            if (data?.data) {
              handleSelectAllRow(
                isAllSelected,
                data?.data.map((result) => result.ItemNo.toString())
              )
            }
          }}
          headerData={TABLE_HEAD}
        />
        <tbody>
          {!isLoading && (
            <>
              {data?.data.map((row) => (
                <ScheduleItemTableRow
                  key={row.ItemNo}
                  row={row}
                  selected={selected}
                  handleSelectRow={handleSelectRow}
                  scheduleId={scheduleId}
                />
              ))}
              <TableEmptyRows
                emptyRows={data?.data ? emptyRows(page, rowsPerPage, data?.count) : 0}
              />
            </>
          )}
        </tbody>
      </Table>
      <TableBodyLoading isLoading={isLoading} tableRowPerPage={rowsPerPage} />
      <TableNoData isNotFound={isNotFound} />
    </FormCardWithHeader>
  )
}

export default ScheduleItemList
