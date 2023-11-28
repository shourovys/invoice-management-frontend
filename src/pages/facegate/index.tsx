import { sendMultiDeleteRequest, sendPostRequest } from '../../api/swrConfig'
import { facegateApi } from '../../api/urls'
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
import FacegateTableRow from '../../components/pages/facegate/FacegateTableRow'
import FacegateTableToolbar from '../../components/pages/facegate/FacegateTableToolbar'
import useAlert from '../../hooks/useAlert'
import useTable, { emptyRows } from '../../hooks/useTable'
import useUpdateRouteQueryWithReplace from '../../hooks/useUpdateRouteQueryWithReplace'
import QueryString from 'qs'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleFilterInputChange } from '../../types/components/common'
import { ITableAction, ITableHead } from '../../types/components/table'
import { IListServerResponse } from '../../types/pages/common'
import {
  IFacegateApiQueryParams,
  IFacegateFilters,
  IFacegateResult,
  IFacegateRouteQueryParams,
} from '../../types/pages/facegate'
import {
  addIcon,
  dbInitializeIcon,
  dbUpdateIcon,
  deleteIcon,
  lockIcon,
  mUnlockIcon,
  unlockIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

const TABLE_HEAD: ITableHead[] = [
  { id: 'FacegateNo', label: t`Facegate No`, filter: true },
  { id: 'PartitionNo', label: t`Partition`, filter: true },
  { id: 'FacegateName', label: t`Facegate Name`, filter: true },
  { id: 'FacegateDesc', label: t`Description`, filter: true },
  { id: 'NodeNo', label: t`Node`, filter: true },
  { id: 'IpAddress', label: t`IP Address`, filter: true },
  { id: 'Online', label: t`Online`, filter: true },
  { id: 'Busy', label: t`Busy`, filter: true },
  { id: 'LockStat', label: t`Lock Stat`, filter: true },
  { id: 'ContactStat', label: t`Contact Stat`, filter: true },
]

function Facegate() {
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

  // apply property use for apply filter. filter will apply when apply is true
  const initialFilterState: IFacegateFilters = {
    Apply: false,
    FacegateNo: '',
    FacegateName: '',
    IpAddress: '',
    Partition: null,
    Node: null,
  }

  // state to store the filter values
  const [filterState, setFilterState] = useState(initialFilterState)

  // ref to store the applied filter values
  const filterStateRef = useRef(filterState)

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // apply will be false in every filter state change
    setFilterState((state) => ({ ...state, Apply: false, [name]: value }))
  }

  // update filter state in the URL when filter state is applied or reset
  const updateFilterStateToQuery = () => {
    handleChangePage(1)

    const queryParams: IFacegateRouteQueryParams = {
      page: 1,
      FacegateNo: filterStateRef.current.FacegateNo,
      FacegateName: filterStateRef.current.FacegateName,
      IpAddress: filterStateRef.current.IpAddress,
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

  // handle the apply button for the filters
  const handleFilterApply = () => {
    // on filter apply, filterStateRef updates to the current filter state
    filterStateRef.current = filterState
    updateFilterStateToQuery()
    handleFilterInputChange('Apply', true)
  }

  // handle the reset button for the filters
  const handleFilterStateReset = () => {
    // on filter reset, filterStateRef updates to the initial filter state
    filterStateRef.current = initialFilterState
    updateFilterStateToQuery()
    setFilterState(initialFilterState)
  }

  // In route change or reload - filter state updates by query value and applies the filter
  useEffect(() => {
    const queryParse = QueryString.parse(location.search)

    const queryState: IFacegateFilters = {
      FacegateNo: typeof queryParse.FacegateNo === 'string' ? queryParse.FacegateNo : '',
      FacegateName: typeof queryParse.FacegateName === 'string' ? queryParse.FacegateName : '',
      IpAddress: typeof queryParse.IpAddress === 'string' ? queryParse.IpAddress : '',
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

  // create the query object for the API call
  const apiQueryParams: IFacegateApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    ...(filterStateRef.current.FacegateNo && {
      FacegateNo_icontains: filterStateRef.current.FacegateNo,
    }),
    ...(filterStateRef.current.FacegateName && {
      FacegateName_icontains: filterStateRef.current.FacegateName,
    }),
    ...(filterStateRef.current.IpAddress && {
      IpAddress_icontains: filterStateRef.current.IpAddress,
    }),
    ...(filterStateRef.current.Partition?.value && {
      Partition: filterStateRef.current.Partition.value,
    }),
    ...(filterStateRef.current.Node?.value && {
      Node: filterStateRef.current.Node.value,
    }),
  }

  const apiQueryString = QueryString.stringify(apiQueryParams)

  const { isLoading, data, mutate } = useSWR<IListServerResponse<IFacegateResult[]>>(
    facegateApi.list(apiQueryString)
  )

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    facegateApi.deleteMultiple,
    sendMultiDeleteRequest,
    {
      // reload list data on successful delete
      onSuccess: () => {
        handleSelectAllRow(false, [])
        mutate()
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
        })
      }

      openAlertDialogWithPromise(handleDelete, { success: t`Successful` })
    }
  }

  const breadcrumbsActions: IActionsButton[] = [
    {
      icon: addIcon,
      text: t`Add`,
      link: '/facegate/add',
    },
  ]

  // Define the mutation function to update list state (Lock, Unlock, M-Unlock Update, Initialize ,Setup) all selected facegate
  const { trigger: facegateListActionTrigger } = useSWRMutation(
    facegateApi.action,
    sendPostRequest,
    {
      onSuccess: () => {
        handleSelectAllRow(false, [])
        mutate()
      },
    }
  )

  const handleFacegateLockStatus = (
    lockStatus: 'Lock' | 'Unlock' | 'M-Unlock' | 'Update' | 'Initialize' | 'Setup'
  ) => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        facegateListActionTrigger({
          FacegateNos: selected,
          Action: lockStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Facegate ${lockStatus} Status Update successful` },
        t`Do you really want to update facegate status to ${lockStatus} for the selected facegate?`
      )
    }
  }

  const tableActions: ITableAction[] = [
    {
      icon: lockIcon,
      tooltip: 'Lock',
      onClick: () => handleFacegateLockStatus('Lock'),
    },
    {
      icon: unlockIcon,
      tooltip: 'Unlock',
      onClick: () => handleFacegateLockStatus('Unlock'),
    },
    {
      icon: mUnlockIcon,
      tooltip: 'M-Unlock',
      onClick: () => handleFacegateLockStatus('M-Unlock'),
    },
    {
      icon: dbUpdateIcon,
      tooltip: 'DB Update',
      onClick: () => handleFacegateLockStatus('Update'),
    },
    {
      icon: dbInitializeIcon,
      tooltip: 'DB Initialize',
      onClick: () => handleFacegateLockStatus('Initialize'),
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
        <FacegateTableToolbar
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
                  data?.data.map((result) => result.FacegateNo.toString())
                )
              }
            }}
            headerData={TABLE_HEAD}
          />
          <tbody>
            {!isLoading && (
              <>
                {data?.data.map((row) => (
                  <FacegateTableRow
                    key={row.FacegateNo}
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

export default Facegate
