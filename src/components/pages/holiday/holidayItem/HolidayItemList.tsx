import { fetcher, sendMultiDeleteRequest, sendPostRequestWithFile } from '../../../../api/swrConfig'
import { holidayItemApi } from '../../../../api/urls'
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
import { useLocation, useParams } from 'react-router-dom'
import routeProperty from '../../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../../types/components/actionButtons'
import { ITableHead } from '../../../../types/components/table'
import { IApiQueryParamsBase, IListServerResponse } from '../../../../types/pages/common'
import { IHolidayItemResult } from '../../../../types/pages/holidayItem'
import downloadCsv from '../../../../utils/downloadCsv'
import executeCallbackIfRowSelected from '../../../../utils/executeCallbackIfRowSelected'
import { addIcon, deleteIcon, exportIcon, importIcon, listIcon } from '../../../../utils/icons'
import { addSuccessfulToast } from '../../../../utils/toast'
import HolidayItemTableRow from './HolidayItemTableRow'
import t from '../../../../utils/translator'

const TABLE_HEAD: ITableHead[] = [
  { id: 'StartDate', label: t`Start Date`, filter: true },
  { id: 'EndDate', label: t`End Date`, filter: true },
  { id: 'DateName', label: t`Date Name`, filter: true },
]

// Component to show list of a holiday items
function HolidayItemList() {
  const location = useLocation()

  // Get the holiday ID from the router query
  const params = useParams()
  const holidayId = params.id as string

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

  const { isLoading, data, mutate } = useSWR<IListServerResponse<IHolidayItemResult[]>>(
    holidayItemApi.list(holidayId, apiQueryString)
  )

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    holidayItemApi.deleteMultiple(holidayId),
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

  // mutation for fetch csv data from server and call downloadCsc
  const { trigger: csvDataTrigger, isMutating: csvDataLoading } = useSWRMutation(
    holidayItemApi.export(holidayId),
    fetcher,
    {
      onSuccess: (csvData) => {
        downloadCsv(csvData, location)
      },
    }
  )

  // Define the mutation function to send CSV file to the server
  const { trigger: importCSVTrigger, isMutating: importCSVLoading } = useSWRMutation(
    holidayItemApi.import(holidayId),
    sendPostRequestWithFile,
    {
      onSuccess: () => {
        mutate()
        addSuccessfulToast()
      },
    }
  )

  // Define the actions for the Form card header
  const headerActionButtons: IActionsButton[] = [
    {
      icon: exportIcon,
      text: t`Export`,
      onClick: () => {
        csvDataTrigger()
      },
      isLoading: csvDataLoading,
    },
    {
      icon: importIcon,
      text: t`Import`,
      iconClass: 'rotate-90',
      type: 'file',
      accept: '.csv',
      handleFile: (file: File) => {
        importCSVTrigger({ File: file })
      },
      isLoading: importCSVLoading,
    },
    {
      icon: addIcon,
      text: t`Add`,
      link: routeProperty.holidayItemCreate.path(holidayId),
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
      header={t`Holiday Items`}
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
                <HolidayItemTableRow
                  key={row.ItemNo}
                  row={row}
                  selected={selected}
                  handleSelectRow={handleSelectRow}
                  holidayId={holidayId}
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

export default HolidayItemList