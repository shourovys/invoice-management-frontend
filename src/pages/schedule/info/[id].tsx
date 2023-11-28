import { sendDeleteRequest } from '../../../api/swrConfig'
import { scheduleApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import ScheduleItemList from '../../../components/pages/schedule/scheduleItem/ScheduletemList'
import useAlert from '../../../hooks/useAlert'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse } from '../../../types/pages/common'
import { IScheduleFormData, IScheduleResult } from '../../../types/pages/schedule'
import { deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import ScheduleForm from '../../../components/pages/schedule/form/ScheduleForm'
import t from '../../../utils/translator'

// Component to show details of a schedule
function ScheduleInfo() {
  const navigate = useNavigate()
  // Get the schedule ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<IScheduleFormData>({
    ScheduleName: '',
    ScheduleDesc: '',
    Partition: null,
    Holiday: null,
  })
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the Schedule from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<IScheduleResult>>(
    isDeleted || !queryId ? null : scheduleApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      // Set the form data to the fetched data once it's available
      const { ScheduleName, ScheduleDesc, Partition, Holiday } = data.data
      setFormData({
        ScheduleName,
        ScheduleDesc,
        Partition: {
          value: Partition.PartitionNo.toString(),
          label: Partition.PartitionName,
        },
        Holiday: Holiday?.HolidayNo
          ? {
              value: Holiday.HolidayNo.toString(),
              label: Holiday.HolidayName,
            }
          : null,
      })
    }
  }, [data])

  // Define the mutation function to delete the schedule from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    scheduleApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to schedule list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.schedule.path(), { replace: true })
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
      link: routeProperty.scheduleEdit.path(queryId),
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
      link: routeProperty.schedule.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer twoPart={false}>
        <ScheduleForm formData={formData} isLoading={isLoading} />
      </FormContainer>
      <div className="pt-5" />
      <FormContainer twoPart={false}>
        <ScheduleItemList />
      </FormContainer>
    </Page>
  )
}

export default ScheduleInfo
