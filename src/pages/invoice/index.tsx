import { faAdd } from '@fortawesome/free-solid-svg-icons'
import QueryString from 'qs'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { sendMultiDeleteRequest } from '../../api/swrConfig'
import { invoiceApi } from '../../api/urls'
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
import InvoiceTableRow from '../../components/pages/invoice/InvoiceTableRow'
import InvoiceTableToolbar from '../../components/pages/invoice/InvoiceTableToolbar'
import useAlert from '../../hooks/useAlert'
import useTable, { emptyRows } from '../../hooks/useTable'
import useUpdateRouteQueryWithReplace from '../../hooks/useUpdateRouteQueryWithReplace'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleFilterInputChange } from '../../types/components/common'
import { ITableHead } from '../../types/components/table'
import { IListServerResponse } from '../../types/pages/common'
import {
  IInvoiceApiQueryParams,
  IInvoiceFilters,
  IInvoiceResult,
  IInvoiceRouteQueryParams,
} from '../../types/pages/invoice'
import t from '../../utils/translator'

const TABLE_HEAD: ITableHead[] = [
  { id: 'agentName', label: t`Agent Name`, filter: false },
  { id: 'sellerName', label: t`Seller Name`, filter: false },
  { id: 'totalPrice', label: t`Total Price`, filter: false },
]

function Invoice() {
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
  } = useTable({ defaultOrderBy: 'createdAt' })
  // hook to update the query in the URL
  const updateRouteQueryWithReplace = useUpdateRouteQueryWithReplace()
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // apply property use for apply filter. filter will apply when apply is true
  const initialFilterState: IInvoiceFilters = {
    Apply: false,
    agentName: '',
    productName: '',
    sellerName: '',
  }

  // state to store the filter values
  const [filterState, setFilterState] = useState(initialFilterState)

  // ref to store the applied filter values
  const filterStateRef = useRef(filterState)

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // apply will false in every filter state change
    setFilterState((state) => ({ ...state, apply: false, [name]: value }))
  }

  // update filter state in the URL when filter state is apply or reset
  const updateFilterStateToQuery = () => {
    handleChangePage(1)

    const queryParams: IInvoiceRouteQueryParams = {
      page: 1,
      agentName: filterStateRef.current.agentName,
      productName: filterStateRef.current.productName,
      sellerName: filterStateRef.current.sellerName,
    }

    updateRouteQueryWithReplace({
      pathName: location.pathname,
      query: queryParams,
    })
  }
  // handle the apply button for the filters
  const handleFilterApply = () => {
    // on filter apply filterStateRef update to filter current state
    filterStateRef.current = filterState
    updateFilterStateToQuery()
    handleFilterInputChange('apply', true)
  }
  // handle the reset button for the filters
  const handleFilterStateReset = () => {
    // on filter apply filterStateRef update to initial filter state
    filterStateRef.current = initialFilterState
    updateFilterStateToQuery()
    setFilterState(initialFilterState)
  }

  // in route change or reload - filter state update by query value and apply to filter
  useEffect(() => {
    const queryParse = QueryString.parse(location.search)

    const queryState: IInvoiceFilters = {
      agentName: typeof queryParse.agentName === 'string' ? queryParse.agentName : '',
      productName: typeof queryParse.productName === 'string' ? queryParse.productName : '',
      sellerName: typeof queryParse.sellerName === 'string' ? queryParse.sellerName : '',
      Apply: true,
    }

    setFilterState(queryState)
    filterStateRef.current = queryState
  }, [location.search, location.pathname])

  // create the query object for the API call
  const apiQueryParams: IInvoiceApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: 'createdAt',
    order,

    ...(filterStateRef.current.agentName && {
      agentName: filterStateRef.current.agentName,
    }),
    ...(filterStateRef.current.productName && {
      productName: filterStateRef.current.productName,
    }),
    ...(filterStateRef.current.sellerName && {
      sellerName: filterStateRef.current.sellerName,
    }),
  }

  const apiQueryString = QueryString.stringify(apiQueryParams)

  const { isLoading, data, mutate } = useSWR<IListServerResponse<IInvoiceResult[]>>(
    invoiceApi.list(apiQueryString)
  )

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    invoiceApi.deleteMultiple,
    sendMultiDeleteRequest,
    {
      // Show a success message and redirect to partition list page on successful delete
      onSuccess: () => {
        mutate()
        handleSelectAllRow(false, [])
      },
    }
  )

  const handleDeleteMultiple = async () => {
    const requestData = { ids: selected.filter((id) => id !== '0') }
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
      icon: faAdd,
      text: t`Add`,
      link: '/invoice/add',
    },
  ]

  // const tableActions: ITableAction[] = [
  //   {
  //     icon: faTrashCan,
  //     tooltip: 'Delete',
  //     onClick: handleDeleteMultiple,
  //   },
  // ]

  const isNotFound = !data?.data.length && !isLoading

  return (
    <Page title={t`Invoice List`}>
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <TableContainer>
        <InvoiceTableToolbar
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          handleFilterApply={handleFilterApply}
          handleInputChange={handleFilterInputChange}
        />
        <TableAction numSelected={selected.length} />
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={data?.data.length}
            handleSort={handleSort}
            handleOrder={handleOrder}
            // selectAllRow={(isAllSelected: boolean) => {
            //   if (data?.data) {
            //     handleSelectAllRow(isAllSelected, data?.data.map((result) => result._id.toString()))
            //   }
            // }}
            headerData={TABLE_HEAD}
          />
          <tbody>
            {!isLoading && (
              <>
                {data?.data.map((row) => (
                  <InvoiceTableRow
                    key={row._id}
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

export default Invoice
