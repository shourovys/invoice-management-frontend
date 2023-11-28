import { sendDeleteRequest } from '../../../api/swrConfig'
import { contGateApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import ContGateForm from '../../../components/pages/contGate/form/ContGateForm'
import useAlert from '../../../hooks/useAlert'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse, booleanSelectObject } from '../../../types/pages/common'
import { IContGateInfoFormData, IContGateResult } from '../../../types/pages/contGate'
import { deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

// Component to show details of a contGate
function ContGateInfo() {
  const navigate = useNavigate()
  // Get the contGate ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<IContGateInfoFormData>({
    ContGateName: '',
    ContGateDesc: '',
    Node: null,
    MacAddress: '',
    IpAddress: '',
    ApiPort: '',
    SecurityCode: '',
    RfChannel: '',
    SyncCode: '',
    Online: '',
    Busy: '',
  })
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the ContGate from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<IContGateResult>>(
    isDeleted || !queryId ? null : contGateApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      // Set the form data to the fetched data once it's available
      const {
        ContGateName,
        ContGateDesc,
        Node,
        MacAddress,
        IpAddress,
        ApiPort,
        SecurityCode,
        RfChannel,
        SyncCode,
        Online,
        Busy,
      } = data.data
      setFormData({
        ContGateName,
        ContGateDesc,
        Node: {
          value: Node.NodeNo.toString(),
          label: Node.NodeName,
        },
        MacAddress,
        IpAddress,
        ApiPort: ApiPort.toString(),
        SecurityCode,
        RfChannel: RfChannel.toString(),
        SyncCode,
        Online: booleanSelectObject[Online],
        Busy: booleanSelectObject[Busy],
      })
    }
  }, [data])

  // Define the mutation function to delete the contGate from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    contGateApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to contGate list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.contGate.path(), { replace: true })
      },
      // If error occurred - make delete false
      onError: () => {
        setIsDeleted(false)
      },
    }
  )
  // Define the function to call delete mutation with Alert Dialog
  const handleDelete = () => {
    const deleteMutation = () => {
      setIsDeleted(true)
      return deleteTrigger()
    }
    openAlertDialogWithPromise(deleteMutation, { success: t`Successful` })
  }

  // Define the actions for the breadcrumbs bar
  const breadcrumbsActions: IActionsButton[] = [
    {
      color: 'danger',
      icon: editIcon,
      text: t`Edit`,
      link: routeProperty.contGateEdit.path(queryId),
    },
    {
      color: 'danger',
      icon: deleteIcon,
      text: t`Delete`,
      onClick: handleDelete,
      isLoading: deleteIsLoading,
    },
    {
      color: 'danger',
      icon: listIcon,
      text: t`List`,
      link: routeProperty.contGate.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer twoPart={false}>
        <ContGateForm formData={formData} isLoading={isLoading} />
      </FormContainer>
    </Page>
  )
}

export default ContGateInfo
