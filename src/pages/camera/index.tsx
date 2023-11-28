import { fetcher, sendMultiDeleteRequest, sendPostRequest } from '../../api/swrConfig'
import { cameraApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import Table from '../../components/HOC/style/table/Table'
import TableContainer from '../../components/HOC/style/table/TableContainer'
import Pagination from '../../components/common/table/Pagination'
import TableAction from '../../components/common/table/TableAction'
import TableEmptyRows from '../../components/common/table/TableEmptyRows'
import TableHeader from '../../components/common/table/TableHeader'
import TableNoData from '../../components/common/table/TableNoData'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import TableBodyLoading from '../../components/loading/table/TableBodyLoading'
import CameraTableRow from '../../components/pages/camera/CameraTableRow'
import CameraTableToolbar from '../../components/pages/camera/CameraTableToolbar'
import useAlert from '../../hooks/useAlert'
import useTable, { emptyRows } from '../../hooks/useTable'
import useUpdateRouteQueryWithReplace from '../../hooks/useUpdateRouteQueryWithReplace'
import QueryString from 'qs'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import routeProperty from '../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleFilterInputChange } from '../../types/components/common'
import { ITableAction, ITableHead } from '../../types/components/table'
import {
  ICameraApiQueryParams,
  ICameraFilters,
  ICameraResult,
  ICameraRouteQueryParams,
} from '../../types/pages/camera'
import { IListServerResponse } from '../../types/pages/common'
import downloadCsv from '../../utils/downloadCsv'
import {
  addIcon,
  csvIcon,
  deleteIcon,
  instantRecordIcon,
  recordOffIcon,
  recordOnIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

const TABLE_HEAD: ITableHead[] = [
  { id: 'CameraNo', label: t`Camera No`, filter: true },
  { id: 'PartitionNo', label: t`Partition`, filter: true },
  { id: 'CameraName', label: t`Camera Name`, filter: true },
  { id: 'CameraDesc', label: t`Description`, filter: true },
  { id: 'NodeNo', label: t`Node`, filter: true },
  { id: 'CameraPort', label: t`Camera Port`, filter: true },
  { id: 'Online', label: t`Online`, filter: true },
  { id: 'RecordStat', label: t`Record Stat`, filter: true },
]

function Camera() {
  const location = useLocation()

  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    handleChangePage,
    handleSort,
    handleOrder,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
  } = useTable({ defaultOrderBy: TABLE_HEAD[0].id })
  // hook to update the query in the URL
  const updateRouteQueryWithReplace = useUpdateRouteQueryWithReplace()
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // apply property used to apply the filter. The filter will be applied when apply is true.
  const initialFilterState: ICameraFilters = {
    Apply: false,
    CameraNo: '',
    CameraName: '',
    Partition: null,
    Node: null,
  }

  // State to store the filter values
  const [filterState, setFilterState] = useState(initialFilterState)

  // State to store deleted row IDs
  const [isDeletedIds, setIsDeletedIds] = useState<string[]>([])

  // Ref to store the applied filter values
  const filterStateRef = useRef(filterState)

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // Apply will be false on every filter state change
    setFilterState((state) => ({ ...state, Apply: false, [name]: value }))
  }

  // Update filter state in the URL when the filter state is applied or reset
  const updateFilterStateToQuery = () => {
    handleChangePage(1)

    const queryParams: ICameraRouteQueryParams = {
      page: 1,
      CameraNo: filterStateRef.current.CameraNo,
      CameraName: filterStateRef.current.CameraName,
      PartitionValue: filterStateRef.current.Partition?.value,
      PartitionLabel: filterStateRef.current.Partition?.label,
      NodeValue: filterStateRef.current.Node?.value,
      NodeLabel: filterStateRef.current.Node?.label,
    }

    updateRouteQueryWithReplace({
      pathName: location.pathname,
      query: queryParams,
    })
  }

  // Handle the apply button for the filters
  const handleFilterApply = () => {
    // On filter apply, filterStateRef is updated to the current filter state
    filterStateRef.current = filterState
    updateFilterStateToQuery()
    handleFilterInputChange('Apply', true)
  }

  // Handle the reset button for the filters
  const handleFilterStateReset = () => {
    // On filter reset, filterStateRef is updated to the initial filter state
    filterStateRef.current = initialFilterState
    updateFilterStateToQuery()
    setFilterState(initialFilterState)
  }

  // In route change or reload, the filter state is updated by query value and applied to the filter
  useEffect(() => {
    const queryParse = QueryString.parse(location.search)

    const queryState: ICameraFilters = {
      CameraNo: typeof queryParse.CameraNo === 'string' ? queryParse.CameraNo : '',
      CameraName: typeof queryParse.CameraName === 'string' ? queryParse.CameraName : '',
      Partition:
        typeof queryParse.PartitionValue === 'string' &&
        typeof queryParse.PartitionLabel === 'string'
          ? {
              label: queryParse.PartitionLabel,
              value: queryParse.PartitionValue,
            }
          : null,
      Node:
        typeof queryParse.NodeValue === 'string' && typeof queryParse.NodeLabel === 'string'
          ? {
              label: queryParse.NodeLabel,
              value: queryParse.NodeValue,
            }
          : null,
      Apply: true,
    }

    setFilterState(queryState)
    filterStateRef.current = queryState
  }, [location.search, location.pathname])

  // Create the query object for the API call
  const apiQueryParams: ICameraApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    ...(filterStateRef.current.CameraNo && {
      CameraNo_icontains: filterStateRef.current.CameraNo,
    }),
    ...(filterStateRef.current.CameraName && {
      CameraName_icontains: filterStateRef.current.CameraName,
    }),
    ...(filterStateRef.current.Partition?.value && {
      PartitionNo: filterStateRef.current.Partition.value,
    }),
    ...(filterStateRef.current.Node?.value && {
      NodeNo: filterStateRef.current.Node.value,
    }),
    // Query for fetching table data after deleting a row
    ...(isDeletedIds.length && {
      isDeletedIds: JSON.stringify(isDeletedIds),
    }),
  }

  const apiQueryString = QueryString.stringify(apiQueryParams)

  const { isLoading, data, mutate } = useSWR<IListServerResponse<ICameraResult[]>>(
    cameraApi.list(apiQueryString)
  )

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    cameraApi.deleteMultiple,
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
    // const requestConfig: AxiosRequestConfig = {
    //     data: requestData,
    // };

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
    cameraApi.export,
    fetcher,
    {
      onSuccess: (csvData) => {
        downloadCsv(csvData, location)
      },
    }
  )

  const breadcrumbsActions: IActionsButton[] = [
    {
      color: 'csv',
      icon: csvIcon,
      text: t`CSV`,
      onClick: () => {
        csvDataTrigger()
      },
      isLoading: csvDataLoading,
    },
    {
      icon: addIcon,
      text: t`Add`,
      link: routeProperty.cameraCreate.path(),
    },
  ]

  // Define the mutation function to update camera state (Inactive, Active, Auto) all selected Camera
  const { trigger: listActionTrigger } = useSWRMutation(cameraApi.action, sendPostRequest, {
    onSuccess: () => {
      handleSelectAllRow(false, [])
      mutate()
    },
  })

  const handleCameraStatus = (cameraStatus: 'Inactive' | 'Active' | 'Auto') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        listActionTrigger({
          CameraNos: selected,
          Action: cameraStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Successful` },
        t`Do you really want to update camera status?`
      )
    }
  }

  const tableActions: ITableAction[] = [
    {
      icon: recordOffIcon,
      tooltip: 'Record Off',
      onClick: () => handleCameraStatus('Inactive'),
    },
    {
      icon: recordOnIcon,
      tooltip: 'Record On',
      onClick: () => handleCameraStatus('Active'),
    },
    {
      icon: instantRecordIcon,
      tooltip: 'Instant Record',
      onClick: () => handleCameraStatus('Auto'),
    },
    {
      icon: deleteIcon,
      tooltip: 'Delete',
      onClick: handleDeleteMultiple,
    },
  ]

  const isNotFound = !data?.data.length && !isLoading

  return (
    <Page>
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <TableContainer>
        <CameraTableToolbar
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          handleFilterApply={handleFilterApply}
          handleInputChange={handleFilterInputChange}
        />
        <TableAction tableActions={tableActions} numSelected={selected.length} />
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
                  data?.data.map((result) => result.CameraNo.toString())
                )
              }
            }}
            headerData={TABLE_HEAD}
          />
          <tbody>
            {!isLoading && (
              <>
                {data?.data.map((row) => (
                  <CameraTableRow
                    key={row.CameraNo}
                    row={row}
                    selected={selected}
                    handleSelectRow={handleSelectRow}
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
        <Pagination
          totalRows={data?.count || 0}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          currentPath={location.pathname}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Page>
  )
}

export default Camera
