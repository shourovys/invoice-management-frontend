import { sendPostRequest } from '../../api/swrConfig'
import { intercomApi } from '../../api/urls'
import { AxiosError } from 'axios'
import Page from '../../components/HOC/Page'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import { useDefaultNodeOption, useDefaultPartitionOption } from '../../hooks/useDefaultOption'
import useStateWithCallback from '../../hooks/useStateWithCallback'
import { useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useNavigate } from 'react-router-dom'
import routeProperty from '../../routes/routeProperty'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleInputChange } from '../../types/components/common'
import {
  IFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
} from '../../types/pages/common'
import {
  IIntercomFormData,
  intercomGateTypeOptions,
  intercomOpenDoorWayOptions,
  intercomVerifyModeOptions,
} from '../../types/pages/intercom'
import { applyIcon, cancelIcon } from '../../utils/icons'
import scrollToErrorElement from '../../utils/scrollToErrorElement'
import { addSuccessfulToast } from '../../utils/toast'
import validateIntercomFormData from '../../utils/validation/intercom'
import IntercomForm from '../../components/pages/intercom/form/IntercomForm'
import serverErrorHandler from '../../utils/serverErrorHandler'
import t from '../../utils/translator'

// Component to create a Intercom
function CreateIntercom() {
  const navigate = useNavigate()
  // Prompt the user before unloading the page if there are unsaved changes
  useBeforeunload(() => t('You will lose your changes!'))

  // Define state variables for the form data and form errors
  const [formData, setFormData] = useState<IIntercomFormData>({
    IntercomName: '',
    IntercomDesc: '',
    Partition: null,
    Node: null,
    IpAddress: '',
    ApiPort: '',
    UserId: '',
    Password: '',
    DeviceId: '',
    OpenDoorWay: intercomOpenDoorWayOptions[0],
    GateType: intercomGateTypeOptions[0],
    VerifyMode: intercomVerifyModeOptions[0],
    FaceThreshold: '',
    SipGateId: '',
    SipPassword: '',
    SipOperatorId: '',
    SipDtmfLock: '',
    SipIncomingCall: null,
  })

  const [formErrors, setFormErrors] = useStateWithCallback<IFormErrors>({}, scrollToErrorElement)

  // Set default Partition and Node
  useDefaultPartitionOption<IIntercomFormData>(setFormData)
  useDefaultNodeOption<IIntercomFormData>(setFormData)

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({ ...state, [name]: value }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(intercomApi.add, sendPostRequest, {
    onSuccess: () => {
      addSuccessfulToast()
      // redirect to intercom list page on success
      navigate(routeProperty.intercom.path())
    },
    onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
      serverErrorHandler(error, setFormErrors)
    },
  })

  // Handle the form submission
  const handleSubmit = async () => {
    // Validate the form data
    const errors = validateIntercomFormData(formData)

    // If there are errors, display them and do not submit the form
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    // Modify form data to match API requirements and trigger the mutation
    const modifiedFormData = {
      IntercomName: formData.IntercomName,
      IntercomDesc: formData.IntercomDesc,
      PartitionNo: formData.Partition?.value,
      NodeNo: formData.Node?.value,
      IpAddress: formData.IpAddress,
      ApiPort: parseInt(formData.ApiPort),
      UserId: formData.UserId,
      Password: formData.Password,
      DeviceId: formData.DeviceId,
      OpenDoorWay: formData.OpenDoorWay?.value,
      GateType: formData.GateType?.value,
      VerifyMode: formData.VerifyMode?.value,
      FaceThreshold:
        formData.GateType?.value !== '0' && formData.GateType?.value !== '1'
          ? parseInt(formData.FaceThreshold)
          : 0,
      SipGateId:
        formData.GateType?.value !== '0' && formData.GateType?.value !== '2'
          ? formData.SipGateId
          : '',
      SipPassword:
        formData.GateType?.value !== '0' && formData.GateType?.value !== '2'
          ? formData.SipPassword
          : '',
      SipOperatorId:
        formData.GateType?.value !== '0' && formData.GateType?.value !== '2'
          ? formData.SipOperatorId
          : '',
      SipDtmfLock:
        formData.GateType?.value !== '0' && formData.GateType?.value !== '2'
          ? formData.SipDtmfLock
          : 0,
      SipIncomingCall:
        formData.GateType?.value !== '0' && formData.GateType?.value !== '2'
          ? formData.SipIncomingCall?.value
          : 0,
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
      link: routeProperty.intercom.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActionsButtons={breadcrumbsActionsButtons} />
      <div className="pt-2" />
      <FormContainer errorAlert={formErrors?.non_field_errors} twoPart={false}>
        <IntercomForm
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
        <Button size="large" color="cancel" link={routeProperty.intercom.path()}>
          <Icon icon={cancelIcon} />
          <span>{t`Cancel`}</span>
        </Button>
      </FormActionButtonsContainer> */}
    </Page>
  )
}

export default CreateIntercom
