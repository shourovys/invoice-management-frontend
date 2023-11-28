import { sendPostRequest } from '../../../../api/swrConfig'
import { scheduleItemApi } from '../../../../api/urls'
import { AxiosError } from 'axios'
import Page from '../../../../components/HOC/Page'
import FormContainer from '../../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../../components/layout/Breadcrumbs'
import ScheduleItemForm from '../../../../components/pages/schedule/scheduleItem/form/ScheduleItemForm'
import useStateWithCallback from '../../../../hooks/useStateWithCallback'
import { useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../../routes/routeProperty'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../../types/components/actionButtons'
import { THandleInputChange } from '../../../../types/components/common'
import {
  INewFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
} from '../../../../types/pages/common'
import { IScheduleItemFormData } from '../../../../types/pages/scheduleItem'
import { applyIcon, cancelIcon } from '../../../../utils/icons'
import { indexToBinary } from '../../../../utils/indexToBinary'
import scrollToErrorElement from '../../../../utils/scrollToErrorElement'
import { addSuccessfulToast } from '../../../../utils/toast'
import validateScheduleItemFormData from '../../../../utils/validation/scheduleItem'
import serverErrorHandler from '../../../../utils/serverErrorHandler'
import t from '../../../../utils/translator'
// Component to create a Schedule Item
function CreateScheduleItem() {
  const navigate = useNavigate()
  // Get the schedule ID from the router query
  const params = useParams()
  const scheduleId = params.scheduleId as string

  // Prompt the user before unloading the page if there are unsaved changes
  useBeforeunload(() => t('You will lose your changes!'))

  // Define state variables for the form data and form errors
  const [formData, setFormData] = useState<IScheduleItemFormData>({
    ScheduleType: null,
    Weekdays: undefined,
    Monthday: undefined,
    OneDate: undefined,
    TimeType: null,
    StartTime: undefined,
    EndTime: undefined,
  })

  const [formErrors, setFormErrors] = useStateWithCallback<INewFormErrors<IScheduleItemFormData>>(
    {},
    scrollToErrorElement
  )

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({ ...state, [name]: value }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(scheduleItemApi.add(scheduleId), sendPostRequest, {
    onSuccess: () => {
      addSuccessfulToast()
      // redirect to schedule list page on success
      navigate(routeProperty.scheduleInfo.path(scheduleId))
    },
    onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
      serverErrorHandler(error, setFormErrors)
    },
  })

  // Handle the form submission
  const handleSubmit = async () => {
    // Validate the form data
    const errors = validateScheduleItemFormData(formData)

    // If there are errors, display them and do not submit the form
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      //Object.entries(errors).forEach(([, value]) => {
      //   if (value) {
      //     errorToast(value)
      //   }
      // })
      return
    }

    // Modify form data to match API requirements and trigger the mutation
    const modifiedFormData = {
      ScheduleType: formData.ScheduleType?.value,
      Weekdays:
        formData.ScheduleType?.value === '1' && formData.Weekdays
          ? indexToBinary(formData.Weekdays, 8)
          : undefined,
      Monthday: formData.ScheduleType?.value === '2' ? Number(formData.Monthday) : undefined,
      OneDate: formData.ScheduleType?.value === '3' ? formData.OneDate : undefined,
      TimeType: formData.TimeType?.value,
      StartTime: formData.TimeType?.value === '0' ? formData.StartTime : undefined,
      EndTime: formData.TimeType?.value === '0' ? formData.EndTime : undefined,
    }

    trigger(modifiedFormData)
  }

  // Define the actions for the breadcrumbs bar
  const breadcrumbsActionsButtons: IActionsButton[] = [
    {
      color: 'apply',
      icon: applyIcon,
      text: t`Apply`,
      onClick: handleSubmit,
      isLoading: isMutating,
    },
    {
      color: 'cancel',
      icon: cancelIcon,
      text: t`Cancel`,
      link: routeProperty.schedule.path(),
    },
  ]

  const breadcrumbsPageRoutes = [
    {
      href: routeProperty.schedule.path(),
      text: t`Schedule`,
    },
    {
      href: routeProperty.scheduleInfo.path(scheduleId),
      text: t`Information`,
    },
    // {
    //   href: routeProperty.scheduleInfo.path(scheduleId),
    //   text: t`Schedule Item`,
    // },
    {
      href: routeProperty.scheduleItemCreate.path(scheduleId),
      text: t`Schedule Item Add`,
    },
  ]

  return (
    <Page title={t`Add Schedule Item`}>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs
        pageTitle={t`Schedule Item`}
        pageRoutes={breadcrumbsPageRoutes}
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
      />
      <div className="pt-2" />
      <FormContainer errorAlert={formErrors?.non_field_errors} twoPart={false} sameHeight={true}>
        <ScheduleItemForm
          formData={formData}
          handleInputChange={handleInputChange}
          formErrors={formErrors}
        />
      </FormContainer>
      {/* <FormActionButtonsContainer>
        <Button color="apply" size="large" onClick={handleSubmit} isLoading={isMutating}>
          <Icon icon={applyIcon} />
          <span>{t`Apply`}</span>
        </Button>
        <Button size="large" color="cancel" link={routeProperty.schedule.path()}>
          <Icon icon={cancelIcon} />
          <span>{t`Cancel`}</span>
        </Button>
      </FormActionButtonsContainer> */}
    </Page>
  )
}

export default CreateScheduleItem
