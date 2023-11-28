import { fetcher, sendMultiDeleteRequest, sendPostRequestWithFile } from '../../api/swrConfig'
import { definedFieldApi, personApi } from '../../api/urls'
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
import PersonTableRow from '../../components/pages/person/PersonTableRow'
import PersonTableToolbar from '../../components/pages/person/PersonTableToolbar'
import useAlert from '../../hooks/useAlert'
import useTable, { emptyRows } from '../../hooks/useTable'
import useUpdateRouteQueryWithReplace from '../../hooks/useUpdateRouteQueryWithReplace'
import QueryString from 'qs'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import routeProperty from '../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleFilterInputChange } from '../../types/components/common'
import { ITableAction, ITableHead } from '../../types/components/table'
import { IListServerResponse } from '../../types/pages/common'
import { IDefinedFieldResult } from '../../types/pages/definedField'
import {
  IPersonApiQueryParams,
  IPersonFilters,
  IPersonResult,
  IPersonRouteQueryParams,
} from '../../types/pages/person'
import downloadCsv from '../../utils/downloadCsv'
import { addIcon, deleteIcon, exportIcon, groupEditIcon, importIcon } from '../../utils/icons'
import { addSuccessfulToast } from '../../utils/toast'
import { SERVER_QUERY } from '../../utils/config'
import t from '../../utils/translator'

function Person() {
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
  } = useTable({ defaultOrderBy: 'PersonNo' })
  // hook to update the query in the URL
  const updateRouteQueryWithReplace = useUpdateRouteQueryWithReplace()
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  const { isLoading: definedFieldIsLoading, data: definedFieldData } = useSWR<
    IListServerResponse<IDefinedFieldResult[]>
  >(definedFieldApi.list(SERVER_QUERY.selectorDataQuery))

  const TABLE_HEAD = useMemo<ITableHead[]>(
    () => [
      { id: 'PersonNo', label: t`Person No`, filter: true },
      { id: 'PartitionNo', label: t`Partition`, filter: true },
      { id: 'LastName', label: t`Last Name`, filter: true },
      { id: 'FirstName', label: t`First Name`, filter: true },
      { id: 'Email', label: t`Email`, filter: true },
    ],
    []
  )
  const [tableHead, setTableHead] = useState(TABLE_HEAD)
  // const tableHeadRef = useRef(TABLE_HEAD);

  useEffect(() => {
    const definedFieldHead = definedFieldData?.data
      .filter((item) => item.ListEnable)
      .map((item) => ({
        id: `field${item.FieldNo.toString()}`,
        label: item.FieldName,
        filter: true,
      }))
    if (definedFieldHead) {
      setTableHead([...TABLE_HEAD, ...definedFieldHead])
    }
  }, [definedFieldData?.data, TABLE_HEAD])

  // apply property use for apply filter. filter will apply when apply is true
  const initialFilterState: IPersonFilters = {
    Apply: false,
    PersonNo: '',
    LastName: '',
    FirstName: '',
    Email: '',
    PartitionNo: null,
    Field1: '',
    Field2: '',
    Field3: '',
    Field4: '',
    Field5: '',
    Field6: '',
    Field7: '',
    Field8: '',
    Field9: '',
    Field10: '',
    Field11: '',
    Field12: '',
    Field13: '',
    Field14: '',
    Field15: '',
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

    const queryParams: IPersonRouteQueryParams = {
      page: 1,
      PersonNo: filterStateRef.current.PersonNo,
      LastName: filterStateRef.current.LastName,
      FirstName: filterStateRef.current.FirstName,
      Email: filterStateRef.current.Email,
      PartitionNoValue: filterStateRef.current.PartitionNo?.value,
      PartitionNoLabel: filterStateRef.current.PartitionNo?.label,
      Field1: filterStateRef.current.Field1,
      Field2: filterStateRef.current.Field2,
      Field3: filterStateRef.current.Field3,
      Field4: filterStateRef.current.Field4,
      Field5: filterStateRef.current.Field5,
      Field6: filterStateRef.current.Field6,
      Field7: filterStateRef.current.Field7,
      Field8: filterStateRef.current.Field8,
      Field9: filterStateRef.current.Field9,
      Field10: filterStateRef.current.Field10,
      Field11: filterStateRef.current.Field11,
      Field12: filterStateRef.current.Field12,
      Field13: filterStateRef.current.Field13,
      Field14: filterStateRef.current.Field14,
      Field15: filterStateRef.current.Field15,
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

    const queryState: IPersonFilters = {
      PersonNo: typeof queryParse.PersonNo === 'string' ? queryParse.PersonNo : '',
      LastName: typeof queryParse.LastName === 'string' ? queryParse.LastName : '',
      FirstName: typeof queryParse.FirstName === 'string' ? queryParse.FirstName : '',
      Email: typeof queryParse.Email === 'string' ? queryParse.Email : '',
      PartitionNo:
        typeof queryParse.PartitionNoValue === 'string' &&
        typeof queryParse.PartitionNoLabel === 'string'
          ? {
              label: queryParse.PartitionNoLabel,
              value: queryParse.PartitionNoValue,
            }
          : null,
      Field1: typeof queryParse.Field1 === 'string' ? queryParse.Field1 : '',
      Field2: typeof queryParse.Field2 === 'string' ? queryParse.Field2 : '',
      Field3: typeof queryParse.Field3 === 'string' ? queryParse.Field3 : '',
      Field4: typeof queryParse.Field4 === 'string' ? queryParse.Field4 : '',
      Field5: typeof queryParse.Field5 === 'string' ? queryParse.Field5 : '',
      Field6: typeof queryParse.Field6 === 'string' ? queryParse.Field6 : '',
      Field7: typeof queryParse.Field7 === 'string' ? queryParse.Field7 : '',
      Field8: typeof queryParse.Field8 === 'string' ? queryParse.Field8 : '',
      Field9: typeof queryParse.Field9 === 'string' ? queryParse.Field9 : '',
      Field10: typeof queryParse.Field10 === 'string' ? queryParse.Field10 : '',
      Field11: typeof queryParse.Field11 === 'string' ? queryParse.Field11 : '',
      Field12: typeof queryParse.Field12 === 'string' ? queryParse.Field12 : '',
      Field13: typeof queryParse.Field13 === 'string' ? queryParse.Field13 : '',
      Field14: typeof queryParse.Field14 === 'string' ? queryParse.Field14 : '',
      Field15: typeof queryParse.Field15 === 'string' ? queryParse.Field15 : '',
      Apply: true,
    }

    setFilterState(queryState)
    filterStateRef.current = queryState
  }, [location.search, location.pathname])

  // create the query object for the API call
  const apiQueryParams: IPersonApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    ...(filterStateRef.current.PersonNo && {
      PersonNo_icontains: filterStateRef.current.PersonNo,
    }),
    ...(filterStateRef.current.LastName && {
      LastName_icontains: filterStateRef.current.LastName,
    }),
    ...(filterStateRef.current.FirstName && {
      FirstName_icontains: filterStateRef.current.FirstName,
    }),
    ...(filterStateRef.current.Email && {
      Email_icontains: filterStateRef.current.Email,
    }),
    ...(filterStateRef.current.PartitionNo &&
      filterStateRef.current.PartitionNo.value && {
        PartitionNo: filterStateRef.current.PartitionNo.value,
      }),
    ...(filterStateRef.current.Field1 && {
      Field1_icontains: filterStateRef.current.Field1,
    }),
    ...(filterStateRef.current.Field2 && {
      Field2_icontains: filterStateRef.current.Field2,
    }),
    ...(filterStateRef.current.Field3 && {
      Field3_icontains: filterStateRef.current.Field3,
    }),
    ...(filterStateRef.current.Field4 && {
      Field4_icontains: filterStateRef.current.Field4,
    }),
    ...(filterStateRef.current.Field5 && {
      Field5_icontains: filterStateRef.current.Field5,
    }),
    ...(filterStateRef.current.Field6 && {
      Field6_icontains: filterStateRef.current.Field6,
    }),
    ...(filterStateRef.current.Field7 && {
      Field7_icontains: filterStateRef.current.Field7,
    }),
    ...(filterStateRef.current.Field8 && {
      Field8_icontains: filterStateRef.current.Field8,
    }),
    ...(filterStateRef.current.Field9 && {
      Field9_icontains: filterStateRef.current.Field9,
    }),
    ...(filterStateRef.current.Field10 && {
      Field10_icontains: filterStateRef.current.Field10,
    }),
    ...(filterStateRef.current.Field11 && {
      Field11_icontains: filterStateRef.current.Field11,
    }),
    ...(filterStateRef.current.Field12 && {
      Field12_icontains: filterStateRef.current.Field12,
    }),
    ...(filterStateRef.current.Field13 && {
      Field13_icontains: filterStateRef.current.Field13,
    }),
    ...(filterStateRef.current.Field14 && {
      Field14_icontains: filterStateRef.current.Field14,
    }),
    ...(filterStateRef.current.Field15 && {
      Field15_icontains: filterStateRef.current.Field15,
    }),
  }

  const apiQueryString = QueryString.stringify(apiQueryParams)

  const {
    isLoading,
    data,
    mutate: personData,
    mutate,
  } = useSWR<IListServerResponse<IPersonResult[]>>(personApi.list(apiQueryString))

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    personApi.deleteMultiple,
    sendMultiDeleteRequest,
    {
      // Show a success message and redirect to partition list page on successful delete
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

  // mutation for fetch csv data from server and call downloadCsc
  const { trigger: csvDataTrigger, isMutating: csvDataLoading } = useSWRMutation(
    personApi.export,
    fetcher,
    {
      onSuccess: (csvData) => {
        downloadCsv(csvData, location)
      },
    }
  )

  // Define the mutation function to send CSV file to the server
  const { trigger: importCSVTrigger, isMutating: importCSVLoading } = useSWRMutation(
    personApi.import,
    sendPostRequestWithFile,
    {
      onSuccess: () => {
        personData()
        addSuccessfulToast()
      },
    }
  )

  const breadcrumbsActions: IActionsButton[] = [
    {
      color: 'danger',
      icon: exportIcon,
      text: t`Export`,
      onClick: () => {
        csvDataTrigger()
      },
      isLoading: csvDataLoading,
    },
    {
      color: 'danger',
      icon: importIcon,
      text: t`Import`,
      iconClass: 'rotate-90',
      type: 'file',
      accept:
        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"',
      handleFile: (file: File) => {
        importCSVTrigger({ file })
      },
      isLoading: importCSVLoading,
    },
    {
      icon: addIcon,
      text: t`Add`,
      link: routeProperty.personCreate.path(),
    },
    // {
    //   text: t`Add by person & Credential`,
    //   link: routeProperty.credentialCreate.path(),
    // },
  ]

  const tableActions: ITableAction[] = [
    {
      icon: groupEditIcon,
      tooltip: 'Group edit',
      link: routeProperty.personGroupEdit.path(selected.join(',')),
    },
    {
      icon: deleteIcon,
      tooltip: 'Delete',
      onClick: handleDeleteMultiple,
    },
  ]
  const isNotFound = !data?.data.length && !isLoading && !definedFieldIsLoading

  return (
    <Page>
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <TableContainer>
        <PersonTableToolbar
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          handleFilterApply={handleFilterApply}
          handleInputChange={handleFilterInputChange}
          definedFields={definedFieldData?.data}
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
                  data?.data.map((result) => result.PersonNo.toString())
                )
              }
            }}
            headerData={tableHead}
          />
          <tbody>
            {!isLoading && (
              <>
                {data?.data.map((row) => (
                  <PersonTableRow
                    key={row.PersonNo}
                    row={row}
                    selected={selected}
                    handleSelectRow={handleSelectRow}
                    definedFields={definedFieldData?.data}
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

export default Person
