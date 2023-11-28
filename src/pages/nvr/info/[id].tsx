import { sendDeleteRequest } from '../../../api/swrConfig'
import { nvrApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import NvrForm from '../../../components/pages/nvr/form/NvrForm'
import useAlert from '../../../hooks/useAlert'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse } from '../../../types/pages/common'
import { INvrFormData, INvrResult, nvrTypeOptions } from '../../../types/pages/nvr'
import { findSelectOption } from '../../../utils/findSelectOption'
import { deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

// Component to show details of a Network Video Recorder (NVR)
function NvrInfo() {
  const navigate = useNavigate()
  // Get the NVR ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data
  const [formData, setFormData] = useState<INvrFormData>({
    NvrName: '',
    NvrDesc: '',
    NvrType: null,
    IpAddress: '',
    RtspPort: '',
    DataPort: '',
    UserId: '',
    Password: '',
  })
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the NVR from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<INvrResult>>(
    isDeleted || !queryId ? null : nvrApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      // Set the form data to the fetched data once it's available
      const { NvrName, NvrType, IpAddress, NvrDesc, RtspPort, DataPort, UserId, Password } =
        data.data
      setFormData({
        NvrName,
        NvrType: findSelectOption(nvrTypeOptions, NvrType),
        IpAddress,
        NvrDesc,
        RtspPort: RtspPort.toString(),
        DataPort: DataPort.toString(),
        UserId,
        Password,
      })
    }
  }, [data])

  // Define the mutation function to delete the NVR from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    nvrApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to NVR list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.nvr.path(), { replace: true })
      },
      // If error occurred - make delete false
      onError: () => {
        setIsDeleted(false)
      },
    }
  )

  // Define the function to handle delete button click
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
      link: routeProperty.nvrEdit.path(queryId),
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
      link: routeProperty.nvr.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer twoPart={false}>
        <NvrForm formData={formData} isLoading={isLoading} />
      </FormContainer>
    </Page>
  )
}

export default NvrInfo
