import { sendPostRequest } from '../../api/swrConfig'
import { accessReportApi, maintenanceActionApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import Table from '../../components/HOC/style/table/Table'
import TableContainer from '../../components/HOC/style/table/TableContainer'
import RadioButtons from '../../components/atomic/RadioButtons'
import { ISelectOption } from '../../components/atomic/Selector'
import Pagination from '../../components/common/table/Pagination'
import TableAction from '../../components/common/table/TableAction'
import TableEmptyRows from '../../components/common/table/TableEmptyRows'
import TableHeader from '../../components/common/table/TableHeader'
import TableNoData from '../../components/common/table/TableNoData'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import TableBodyLoading from '../../components/loading/table/TableBodyLoading'
import AccessReportTableRow from '../../components/pages/accessreport/AccessReportTableRow'
import AccessReportTableToolbar from '../../components/pages/accessreport/AccessReportTableToolbar'
import useAuth from '../../hooks/useAuth'
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
import { IAccessReportApiQueryParams, IAccessReportFilters } from '../../types/pages/accessReport'
import { IListServerResponse } from '../../types/pages/common'
import { ILogResult } from '../../types/pages/log'
import { copyLogFromDatabaseIcon, getbackLogFromArchiveIcon } from '../../utils/icons'
import { addSuccessfulToast } from '../../utils/toast'
import t from '../../utils/translator'
import { LicenseCheckType } from '../../types/context/auth'

const TABLE_HEAD: ITableHead[] = [
  { id: 'EventTime', label: t`Event Time`, filter: true },
  { id: 'EventName', label: t`Event Name`, filter: true },
  { id: 'PersonNo', label: t`Person No`, filter: true },
  { id: 'PersonName', label: t`Person Name`, filter: true },
  { id: 'CredentialNumber', label: t`Credential Number`, filter: true },
  { id: 'DeviceName', label: t`Device Name`, filter: true },
  { id: 'Region', label: t`Region`, filter: true },
]

function AccessReport() {
  const location = useLocation()
  const { layout, has_license } = useAuth()

  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleSort,
    handleOrder,
    handleChangeRowsPerPage,
  } = useTable({ defaultOrderBy: TABLE_HEAD[0].id })
  // hook to update the query in the URL
  const updateRouteQueryWithReplace = useUpdateRouteQueryWithReplace()

  // apply property use for apply filter. filter will apply when apply is true
  const initialFilterState: IAccessReportFilters = {
    Apply: false,
    EventTime: '',
    EventName: '',
    Person: '',
    PersonName: '',
    CredentialNumber: '',
    DeviceType: null,
    DeviceNo: '',
    DeviceName: '',
    Reader: null,
    Region: null,
    Reference: '1',
  }

  // state to store the filter values
  const [filterState, setFilterState] = useState(initialFilterState)
  // ref to store the applied filter values
  const filterStateRef = useRef(filterState)

  // update filter state in the URL when filter state is apply or reset
  const updateFilterStateToQuery = () => {
    handleChangePage(1)

    updateRouteQueryWithReplace({
      pathName: location.pathname,
      query: {
        EventTime: filterStateRef.current.EventTime,
        EventName: filterStateRef.current.EventName,
        Person: filterStateRef.current.Person,
        PersonName: filterStateRef.current.PersonName,
        CredentialNumber: filterStateRef.current.CredentialNumber,
        DeviceTypeValue: filterStateRef.current.DeviceType?.value,
        DeviceTypeLabel: filterStateRef.current.DeviceType?.label,
        DeviceNo: filterStateRef.current.DeviceNo,
        DeviceName: filterStateRef.current.DeviceName,
        ReaderValue: filterStateRef.current.Reader?.value,
        ReaderLabel: filterStateRef.current.Reader?.label,
        RegionValue: filterStateRef.current.Region?.value,
        RegionLabel: filterStateRef.current.Region?.label,
        Reference: filterStateRef.current.Reference,
      },
    })
  }

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // apply will false in every filter state change
    setFilterState((state) => ({ ...state, Apply: false, [name]: value }))
  }

  const handleFilterInputChangeWithApply: THandleFilterInputChange = async (name, value) => {
    // apply will true in every filter state change
    setFilterState((state) => ({
      ...state,
      Apply: false,
      [name]: value,
    }))
    filterStateRef.current = {
      ...filterState,
      Apply: false,
      [name]: value,
    }
    updateFilterStateToQuery()
    handleFilterInputChange('Apply', true)
  }

  // handle the apply button for the filters
  const handleFilterApply = () => {
    // on filter apply filterStateRef update to filter current state
    filterStateRef.current = filterState
    updateFilterStateToQuery()
    handleFilterInputChange('Apply', true)
  }

  // handle the reset button for the filters
  const handleFilterStateReset = () => {
    const resetFilterState: IAccessReportFilters = {
      ...initialFilterState,
      Reference: filterStateRef.current.Reference,
    }
    // on filter reset filterStateRef update to reset filter state
    filterStateRef.current = resetFilterState
    updateFilterStateToQuery()
    setFilterState(resetFilterState)
  }

  // in route change or reload - filter state update by query value and apply to filter
  useEffect(() => {
    const queryParse = QueryString.parse(location.search)

    const queryState: IAccessReportFilters = {
      EventTime: typeof queryParse.EventTime === 'string' ? queryParse.EventTime : '',
      EventName: typeof queryParse.EventName === 'string' ? queryParse.EventName : '',
      Person: typeof queryParse.Person === 'string' ? queryParse.Person : '',
      PersonName: typeof queryParse.PersonName === 'string' ? queryParse.PersonName : '',
      CredentialNumber:
        typeof queryParse.CredentialNumber === 'string' ? queryParse.CredentialNumber : '',
      DeviceType:
        typeof queryParse.DeviceTypeValue === 'string' &&
        typeof queryParse.DeviceTypeLabel === 'string'
          ? {
              label: queryParse.DeviceTypeLabel,
              value: queryParse.DeviceTypeValue,
            }
          : null,
      DeviceNo: typeof queryParse.DeviceNo === 'string' ? queryParse.DeviceNo : '',
      DeviceName: typeof queryParse.DeviceName === 'string' ? queryParse.DeviceName : '',
      Reader:
        typeof queryParse.ReaderValue === 'string' && typeof queryParse.ReaderLabel === 'string'
          ? {
              label: queryParse.ReaderLabel,
              value: queryParse.ReaderValue,
            }
          : null,
      Region:
        typeof queryParse.RegionValue === 'string' && typeof queryParse.RegionLabel === 'string'
          ? {
              label: queryParse.RegionLabel,
              value: queryParse.RegionValue,
            }
          : null,
      Reference: typeof queryParse.Reference === 'string' ? queryParse.Reference : '1',
      Apply: true,
    }

    setFilterState(queryState)
    filterStateRef.current = queryState
  }, [location.search, location.pathname])

  // create the query object for the API call
  const apiQueryParams: IAccessReportApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    ...(filterStateRef.current.EventTime && {
      EventTime: filterStateRef.current.EventTime,
    }),
    ...(filterStateRef.current.EventName && {
      EventName: filterStateRef.current.EventName,
    }),
    ...(filterStateRef.current.Person && {
      PersonNo: filterStateRef.current.Person,
    }),
    ...(filterStateRef.current.PersonName && {
      PersonName: filterStateRef.current.PersonName,
    }),
    ...(filterStateRef.current.CredentialNumber && {
      CredentialNumber: filterStateRef.current.CredentialNumber,
    }),
    ...(filterStateRef.current.DeviceType && {
      DeviceType: filterStateRef.current.DeviceType.value,
    }),
    ...(filterStateRef.current.DeviceNo && {
      DeviceNo: filterStateRef.current.DeviceNo,
    }),
    ...(filterStateRef.current.DeviceName && {
      DeviceName: filterStateRef.current.DeviceName,
    }),
    ...(filterStateRef.current.Reader && {
      ReaderNo: filterStateRef.current.Reader.value,
    }),
    ...(filterStateRef.current.Region && {
      RegionNo: filterStateRef.current.Region.value,
    }),
    ...(filterStateRef.current.Reference && {
      Reference: filterStateRef.current.Reference,
    }),
  }

  const apiQueryString = QueryString.stringify(apiQueryParams)

  const {
    isLoading,
    data,
    mutate: logResultMutate,
  } = useSWR<IListServerResponse<ILogResult[]>>(accessReportApi.list(apiQueryString))

  const { trigger, isMutating } = useSWRMutation(maintenanceActionApi.add, sendPostRequest, {
    onSuccess: () => {
      setTimeout(() => {
        logResultMutate()
      }, 3000)
      addSuccessfulToast(`Successful`)
    },
  })

  const handleDBCopy = () => trigger({ Action: 'dbcopy', Type: 'save_log_db_to_workspace' })

  const breadcrumbsActions: IActionsButton[] = [
    {
      color: 'danger',
      icon: copyLogFromDatabaseIcon,
      text: t`Copy Log From Database`,
      onClick: handleDBCopy,
      isLoading: isMutating,
      disabled: filterState.Reference === '1',
    },
    {
      color: 'danger',
      icon: getbackLogFromArchiveIcon,
      text: t`Getback Log From Archive`,
      link: routeProperty.getBack.path(),
      disabled: filterState.Reference === '1',
    },
  ]

  const { trigger: DBCopyTrigger } = useSWRMutation(maintenanceActionApi.add, sendPostRequest, {
    onSuccess: () => {
      setTimeout(() => {
        logResultMutate()
      }, 3000)
    },
  })

  useEffect(() => {
    if (filterState.Reference === '0') {
      DBCopyTrigger({ Action: 'dbcopy', Type: 'save_public_db_to_workspace' })
    }
  }, [filterState.Reference])

  const tableActions: ITableAction[] = [
    // {
    //   icon: saveIcon,
    //   tooltip: 'Save',
    // },
  ]

  let breadcrumbsComponentActions = useMemo<ISelectOption[]>(
    () => [
      {
        label: t`Database`,
        value: '1',
      },
      {
        label: t`Workspace`,
        value: '0',
      },
    ],
    []
  )

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      logResultMutate()
    }, 3000) // 3 seconds
    return () => clearInterval(refreshInterval)
  }, [])

  const [deviceTypeFilterResult, setDeviceTypeFilterResult] = useState<ILogResult[]>([])

  useEffect(() => {
    if (data?.data) {
      const f = data?.data.filter((item) => {
        const check_options_license: { [k: string]: LicenseCheckType } = {
          '8': 'Camera',
          '9': 'Channel',
          '10': 'Channel',
          '11': 'Lockset',
          '12': 'Lockset',
          '14': 'Subnode',
          '15': 'Subnode',
          '16': 'ContLock',
          '17': 'ContLock',
        }

        if (check_options_license[item.DeviceType]) {
          return has_license(check_options_license[item.DeviceType])
        }
        return true
      })
      setDeviceTypeFilterResult(f)
    }
  }, [data?.data])

  const isNotFound = !data?.data.length && !isLoading

  return (
    <Page>
      <Breadcrumbs
        breadcrumbsActions={layout == 'Master' ? breadcrumbsActions : []}
        pageRoutes={[
          {
            href: '/access-report',
            text: t`Access Report`,
          },
        ]}
      >
        {layout === 'Master' && (
          <RadioButtons
            name="Reference"
            checked={filterState.Reference}
            radios={breadcrumbsComponentActions}
            onChange={handleFilterInputChangeWithApply}
            // isLoading={isLoading}
          />
        )}
      </Breadcrumbs>

      <TableContainer>
        <AccessReportTableToolbar
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          handleFilterApply={handleFilterApply}
          handleInputChange={handleFilterInputChange}
        />
        <TableAction tableActions={tableActions} numSelected={1} />
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            rowCount={data?.data.length}
            handleSort={handleSort}
            handleOrder={handleOrder}
            headerData={TABLE_HEAD}
          />
          <tbody>
            {!isLoading && (
              <>
                {deviceTypeFilterResult.map((row) => (
                  <AccessReportTableRow
                    key={row.LogNo}
                    row={row}
                    Reference={filterState.Reference}
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

export default AccessReport
