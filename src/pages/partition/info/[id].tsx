import { sendDeleteRequest } from '../../../api/swrConfig'
import { partitionApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import useAlert from '../../../hooks/useAlert'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse } from '../../../types/pages/common'
import { IPartitionFormData } from '../../../types/pages/partition'
import { deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import PartitionForm from '../../../components/pages/partition/form/PartitionForm'
import t from '../../../utils/translator'

// Component to show details of a partition
function PartitionInfo() {
  const navigate = useNavigate()
  // Get the schedule ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data and is data deleted
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the Partition from the server
  const { isLoading, data: formData } = useSWR<ISingleServerResponse<IPartitionFormData>>(
    isDeleted || !queryId ? null : partitionApi.details(queryId)
  )

  // Define the mutation function to delete the partition from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    partitionApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to partition list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.partition.path(), { replace: true })
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
  const breadcrumbsActions: IActionsButton[] =
    queryId === '0'
      ? [
          {
            color: 'danger',
            icon: editIcon,
            text: t`Edit`,
            link: routeProperty.partitionEdit.path(queryId),
          },

          {
            color: 'danger',
            icon: listIcon,
            text: t`List`,
            link: routeProperty.partition.path(),
          },
        ]
      : [
          {
            color: 'danger',
            icon: editIcon,
            text: t`Edit`,
            link: routeProperty.partitionEdit.path(queryId),
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
            link: routeProperty.partition.path(),
          },
        ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer twoPart={false}>
        <PartitionForm formData={formData?.data} isLoading={isLoading} />
      </FormContainer>
    </Page>
  )
}

export default PartitionInfo
