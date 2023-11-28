import { sendPostRequest } from '../../../api/swrConfig'
import { gatewayApi } from '../../../api/urls'
import Table from '../../../components/HOC/style/table/Table'
import TableContainer from '../../../components/HOC/style/table/TableContainer'
import TableHeader from '../../../components/common/table/TableHeader'
import TableNoData from '../../../components/common/table/TableNoData'
import TableBodyLoading from '../../../components/loading/table/TableBodyLoading'
import useTable from '../../../hooks/useTable'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ITableHead } from '../../../types/components/table'
import { IFwUpdateResult, ISingleServerResponse } from '../../../types/pages/common'
import { IGatewayFormData } from '../../../types/pages/gateway'
import { editSuccessfulToast, promiseToast } from '../../../utils/toast'
import FwUpdateListModalRow from '../../common/FwUpdateListModalRow'
import t from '../../../utils/translator'

interface IProps {
  parentFormData: IGatewayFormData
  setOpenModal: (openModal: boolean) => void
}

function GatewayFwUpdateListModal({ parentFormData, setOpenModal }: IProps) {
  const { order, orderBy, selected, handleSort, handleOrder } = useTable({
    defaultOrderBy: 'PersonNo',
  })

  const TABLE_HEAD = useMemo<ITableHead[]>(
    () => [
      { id: 'Name', label: t`FW Name`, filter: false },
      { id: 'ReleaseDate', label: t`Release Date`, filter: false },
      { id: 'Version', label: t`Version`, filter: false },
      { id: 'radio', label: t``, filter: false },
    ],
    []
  )

  // Define state variables for sleeted FW
  const [selectedFwId, setSelectedFwId] = useState('')

  const { isLoading, data, isValidating } = useSWR<ISingleServerResponse<IFwUpdateResult[]>>(
    gatewayApi.getFwUpdate(parentFormData.IpAddress, parentFormData.ApiPort)
  )

  // Define the mutation function to send the form data to the server
  const { trigger } = useSWRMutation(gatewayApi.serFwUpdate, sendPostRequest, {
    onSuccess: () => {
      editSuccessfulToast()
    },
  })

  // update FW on FW select
  const fwUpdateOnSelect = (selectedFW: IFwUpdateResult) => {
    setOpenModal(false)
    setSelectedFwId(selectedFW.Name)
    promiseToast(
      trigger({
        IpAddress: parentFormData.IpAddress,
        ApiPort: parentFormData.ApiPort,
        LinksHref: selectedFW.Links[0].Href,
      }),
      { success: `FW Update successful` }
    )
  }

  const isNotFound = !data?.data.length && !isLoading

  return (
    <TableContainer>
      <Table>
        <TableHeader
          order={order}
          orderBy={orderBy}
          numSelected={selected.length}
          rowCount={data?.data.length}
          handleSort={handleSort}
          handleOrder={handleOrder}
          headerData={TABLE_HEAD}
        />
        <tbody>
          {!(isLoading || isValidating) && (
            <>
              {data?.data.map((row) => (
                <FwUpdateListModalRow
                  key={row.Name}
                  row={row}
                  checked={selectedFwId}
                  setChecked={fwUpdateOnSelect}
                />
              ))}
            </>
          )}
        </tbody>
      </Table>
      <TableBodyLoading isLoading={isLoading || isValidating} />
      <TableNoData isNotFound={isNotFound} />
    </TableContainer>
  )
}

export default GatewayFwUpdateListModal
