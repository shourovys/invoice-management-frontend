import { AxiosError } from 'axios'
import { useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { sendPostRequest } from '../../api/swrConfig'
import { userApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import FormActionButtonsContainer from '../../components/HOC/style/form/FormActionButtonsContainer'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Button from '../../components/atomic/Button'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import UserForm from '../../components/pages/user/form/UserForm'
import useStateWithCallback from '../../hooks/useStateWithCallback'
import routeProperty from '../../routes/routeProperty'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleInputChange } from '../../types/components/common'
import {
  INewFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
} from '../../types/pages/common'
import { IUserFormData, userRoleOptions } from '../../types/pages/user'
import Icon, { applyIcon, cancelIcon } from '../../utils/icons'
import scrollToErrorElement from '../../utils/scrollToErrorElement'
import serverErrorHandler from '../../utils/serverErrorHandler'
import { addSuccessfulToast } from '../../utils/toast'
import t from '../../utils/translator'

// Component to create a User
function CreateUser() {
  const navigate = useNavigate()
  // Prompt the user before unloading the page if there are unsaved changes
  useBeforeunload(() => t('You will lose your changes!'))

  // Define state variables for the form data and form errors
  const [formData, setFormData] = useState<IUserFormData>({
    password: '',
    name: '',
    email: '',
    contactNumber: '',
    role: userRoleOptions[0],
  })
  const [formErrors, setFormErrors] = useStateWithCallback<INewFormErrors<IUserFormData>>(
    {},
    scrollToErrorElement
  )

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({ ...state, [name]: value }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(userApi.add, sendPostRequest, {
    onSuccess: () => {
      addSuccessfulToast()
      // redirect to user list page on success
      navigate(routeProperty.user.path())
    },
    onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
      serverErrorHandler(error, setFormErrors)
    },
  })

  // Handle the form submission
  const handleSubmit = async () => {
    // Validate the form data
    const errors: INewFormErrors<IUserFormData> = {}

    if (!formData.name) {
      errors.name = t`Name is required`
    }
    if (!formData.email) {
      errors.email = t`Email is required`
    }
    if (!formData.role?.value) {
      errors.role = t`Role is required`
    }

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
      name: formData.name,
      password: formData.password,
      contactNumber: formData.contactNumber,
      email: formData.email,
      role: formData.role?.value,
    }

    trigger(modifiedFormData)
  }

  // Define the actions for the breadcrumbs bar
  const breadcrumbsActionsButtons: IActionsButton[] = [
    // {
    //   color: 'apply',
    //   icon: applyIcon,
    //   text: t`Apply`,
    //   onClick: handleSubmit,
    //   isLoading: isMutating,
    // },
    // {
    //   color: 'cancel',
    //   icon: cancelIcon,
    //   text: t`Cancel`,
    //   link: routeProperty.user.path(),
    // },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActionsButtons={breadcrumbsActionsButtons} />
      <div className="pt-2" />
      <FormContainer errorAlert={formErrors?.non_field_errors} twoPart={false}>
        <UserForm
          formData={formData}
          handleInputChange={handleInputChange}
          formErrors={formErrors}
        />
      </FormContainer>
      <FormActionButtonsContainer allowsShow>
        <Button color="apply" size="large" onClick={handleSubmit} isLoading={isMutating}>
          <Icon icon={applyIcon} />
          <span>{t`Apply`}</span>
        </Button>
        <Button size="large" color="cancel" link={routeProperty.user.path()}>
          <Icon icon={cancelIcon} />
          <span>{t`Cancel`}</span>
        </Button>
      </FormActionButtonsContainer>
    </Page>
  )
}

export default CreateUser
