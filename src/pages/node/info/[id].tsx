import { sendDeleteRequest, sendPostRequest } from '../../../api/swrConfig'
import { nodeApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import { NodeInfoForm } from '../../../components/pages/node/form'
import useAlert from '../../../hooks/useAlert'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse } from '../../../types/pages/common'
import {
  INodeInfoFormData,
  INodeResult,
  nodeFaultTypeObject,
  nodeModelTypeObject,
  nodeProductTypeObject,
} from '../../../types/pages/node'
import { checkIcon, deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

// Component to show details of a node
function NodeInfo() {
  const navigate = useNavigate()
  // Get the node ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<INodeInfoFormData>({
    NodeName: '',
    NodeDesc: '',
    Mac: '',
    Product: '',
    Model: '',
    Type: '',
    OemNo: 0,
    Oem: null,
    Version: null,
    Address: null,
    Timezone: null,
    Online: '',
    PowerFaultType: '',
    TamperType: '',
    PowerFaultStat: '',
    TamperStat: '',
  })
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the Node from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<INodeResult>>(
    isDeleted || !queryId ? null : nodeApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      // Set the form data to the fetched data once it's available
      const {
        NodeName,
        NodeDesc,
        Mac,
        Product,
        Model,
        Type,
        OemNo,
        Oem = null,
        Version,
        Address,
        Timezone,
        Online,
        PowerFaultType,
        TamperType,
        PowerFaultStat,
        TamperStat,
      } = data.data

      setFormData({
        NodeName,
        NodeDesc: NodeDesc || '',
        Mac,
        Product: nodeProductTypeObject[Product],
        Model: nodeModelTypeObject[Model],
        Type: Type.toString(),
        OemNo,
        Oem,
        Version,
        Address,
        Timezone,
        Online: Online ? t`Yes` : t`No`,
        PowerFaultType: nodeFaultTypeObject[PowerFaultType],
        TamperType: nodeFaultTypeObject[TamperType],
        PowerFaultStat: PowerFaultStat ? t`Active` : t`Inactive`,
        TamperStat: TamperStat ? t`Active` : t`Inactive`,
      })
    }
  }, [data])

  // Define the mutation function to delete the node from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    nodeApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to node list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.node.path(), { replace: true })
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

  // Define the mutation function to Check update
  const { trigger: checkTrigger } = useSWRMutation(nodeApi.check, sendPostRequest)

  const handleCheck = () => {
    const handleDBSyncTrigger = () =>
      checkTrigger({
        NodeNo: queryId,
      })

    openAlertDialogWithPromise(
      handleDBSyncTrigger,
      { success: t`Check update successful` },
      t('Do you really want to Check this node?')
    )
  }

  // Define the actions for the breadcrumbs bar
  const breadcrumbsActions: IActionsButton[] = [
    {
      color: 'danger',
      icon: checkIcon,
      text: t`Check`,
      onClick: handleCheck,
    },
    {
      color: 'danger',
      icon: editIcon,
      text: t`Edit`,
      link: routeProperty.nodeEdit.path(queryId),
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
      link: routeProperty.node.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer twoPart={false}>
        <NodeInfoForm formData={formData} isLoading={isLoading} />
      </FormContainer>
    </Page>
  )
}

export default NodeInfo
