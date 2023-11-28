import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import routeProperty from '../../../../routes/routeProperty'
import { IActionsButton } from '../../../../types/components/actionButtons'
import {
  addIcon,
  credentialIcon,
  deleteIcon,
  sendInvitationEmailIcon,
} from '../../../../utils/icons'

import { sendMultiDeleteRequest, sendPostRequest } from '../../../../api/swrConfig'
import { credentialApi } from '../../../../api/urls'
import Table from '../../../../components/HOC/style/table/Table'
import TableHeader from '../../../../components/common/table/TableHeader'
import TableNoData from '../../../../components/common/table/TableNoData'
import TableBodyLoading from '../../../../components/loading/table/TableBodyLoading'
import useTable from '../../../../hooks/useTable'
import { useParams } from 'react-router-dom'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { ITableHead } from '../../../../types/components/table'
import { ISingleServerResponse } from '../../../../types/pages/common'
import { IParsonCredentials, IPersonResult } from '../../../../types/pages/person'
import executeCallbackIfRowSelected from '../../../../utils/executeCallbackIfRowSelected'
import { addSuccessfulToast } from '../../../../utils/toast'
import PersonCredentialListRow from './PersonCredentialListRow'
import t from '../../../../utils/translator'

const TABLE_HEAD: ITableHead[] = [
  { id: 'CredentialNo', label: t`Credential No`, filter: false },
  { id: 'FormatNo', label: t`Format`, filter: false },
  { id: 'CredentialNumb', label: t`Credential Number`, filter: false },
  { id: 'CredentialType', label: t`Credential Type`, filter: false },
  { id: 'CredentialStat', label: t`Credential Stat`, filter: false },
]

interface IProps {
  parsonCredentials: IParsonCredentials[]
  // handleInputChange?: THandleInputChange
  // formErrors?: IFormErrors
  // disabled?: boolean
  isLoading?: boolean
  refetchPersonDetails: KeyedMutator<ISingleServerResponse<IPersonResult>>
}

function PersonCredentialList({ parsonCredentials, isLoading, refetchPersonDetails }: IProps) {
  // Get the person ID from the router query
  const params = useParams()
  const queryId = params.id as string

  const { order, orderBy, selected, handleSort, handleOrder, handleSelectRow, handleSelectAllRow } =
    useTable({})

  // Define the mutation function to delete all selected partition from the server
  const { trigger: multipleDeleteTrigger } = useSWRMutation(
    credentialApi.deleteMultiple,
    sendMultiDeleteRequest,
    {
      // refetch person details on successful delete
      onSuccess: () => {
        handleSelectAllRow(false, [])
        refetchPersonDetails()
      },
    }
  )

  const handleDeleteMultiple = () => {
    const requestData = { ids: selected }
    // const requestConfig: AxiosRequestConfig = {
    //     data: requestData,
    // };
    multipleDeleteTrigger({
      data: requestData,
    })
  }

  // Define the mutation function to delete all selected partition from the server
  const { trigger: sendInvitationTrigger } = useSWRMutation(
    credentialApi.invitation,
    sendPostRequest,
    {
      // Show a success message on success
      onSuccess: () => {
        addSuccessfulToast(`Invitation Send`)
      },
    }
  )

  const handleSendInvitation = () => {
    sendInvitationTrigger({
      CredentialIds: selected,
    })
  }

  const isNotFound = !parsonCredentials.length && !isLoading

  // Define the actions for the Form card header
  const headerActionButtons: IActionsButton[] = [
    {
      color: 'danger',
      icon: sendInvitationEmailIcon,
      text: t`Send Invitation Email`,
      onClick: () =>
        executeCallbackIfRowSelected(!selected.length, handleSendInvitation, 'Select a credential'),
      size: 'small',
    },
    {
      icon: addIcon,
      text: t`Add`,
      link: routeProperty.credentialCreate.path(queryId),
      size: 'small',
    },
    {
      color: 'danger',
      icon: deleteIcon,
      text: t`Delete`,
      onClick: () =>
        executeCallbackIfRowSelected(!selected.length, handleDeleteMultiple, 'Select a credential'),
      size: 'small',
    },
  ]
  return (
    <FormCardWithHeader
      icon={credentialIcon}
      header={t`Credential`}
      twoPart={false}
      headerActionButtons={headerActionButtons}
    >
      <Table>
        <TableHeader
          order={order}
          orderBy={orderBy}
          numSelected={selected.length}
          rowCount={parsonCredentials.length}
          handleSort={handleSort}
          handleOrder={handleOrder}
          selectAllRow={(isAllSelected: boolean) => {
            if (parsonCredentials) {
              handleSelectAllRow(
                isAllSelected,
                parsonCredentials.map((result) => result.CredentialNo.toString())
              )
            }
          }}
          headerData={TABLE_HEAD}
        />
        <tbody>
          {!isLoading && (
            <>
              {parsonCredentials.map((row) => (
                <PersonCredentialListRow
                  key={row.CredentialNo}
                  row={row}
                  selected={selected}
                  handleSelectRow={handleSelectRow}
                />
              ))}
              {/* <TableEmptyRows
                emptyRows={parsonCredentials ? emptyRows(page, rowsPerPage, parsonCredentials?.count) : 0}
              /> */}
            </>
          )}
        </tbody>
      </Table>
      <TableBodyLoading isLoading={!!isLoading} />
      <TableNoData isNotFound={isNotFound} />
    </FormCardWithHeader>
  )
}

export default PersonCredentialList
