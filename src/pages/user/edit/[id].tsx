import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { sendPutRequest } from '../../../api/swrConfig'
import { userApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import UserForm from '../../../components/pages/user/form/UserForm'
import useAuth from '../../../hooks/useAuth'
import useStateWithCallback from '../../../hooks/useStateWithCallback'
import routeProperty from '../../../routes/routeProperty'
import { IActionsButton } from '../../../types/components/actionButtons'
import { THandleInputChange } from '../../../types/components/common'
import {
  INewFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
  ISingleServerResponse,
} from '../../../types/pages/common'
import { IUserFormData, IUserResult, userRoleOptions } from '../../../types/pages/user'
import { findSelectOption } from '../../../utils/findSelectOption'
import { applyIcon, cancelIcon } from '../../../utils/icons'
import scrollToErrorElement from '../../../utils/scrollToErrorElement'
import serverErrorHandler from '../../../utils/serverErrorHandler'
import { editSuccessfulToast } from '../../../utils/toast'
import t from '../../../utils/translator'

// Component to edit a User
function EditUser() {
  const navigate = useNavigate()
  // Get the user ID from the router query
  const params = useParams()
  const queryId = params.id as string

  const auth = useAuth()

  // Prompt the user before unloading the page if there are unsaved changes
  useBeforeunload(() => t('You will lose your changes!'))

  // Define the initial state of the form data and form errors
  const [formData, setFormData] = useState<IUserFormData>({
    name: '',
    password: '',
    email: '',
    contactNumber: '',
    role: null,
  })
  const [formErrors, setFormErrors] = useStateWithCallback<INewFormErrors<IUserFormData>>(
    {},
    scrollToErrorElement
  )

  // Fetch the details of the User from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<IUserResult>>(
    queryId ? userApi.details(queryId) : null
  )
  useEffect(() => {
    if (data) {
      const { name, email, contactNumber, role } = data.data

      setFormData({
        name,
        password: '',
        email,
        contactNumber,
        role: findSelectOption(userRoleOptions, role),
      })
    }
  }, [data])

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({ ...state, [name]: value }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(userApi.edit(queryId), sendPutRequest, {
    onSuccess: () => {
      editSuccessfulToast()
      auth.refresh()
      navigate(routeProperty.userInfo.path(queryId))
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
      errors.name = t`User ID is required`
    }
    if (!formData.password) {
      errors.password = t`Password is required`
    }
    if (!formData.role?.value) {
      errors.role = t`Role is required`
    }
    if (!formData.email) {
      errors.email = t`Email is required`
    }

    // If there are errors, display them and do not submit the form
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    // Modify form data to match API requirements and trigger the mutation
    const modifiedFormData = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
      contactNumber: formData.contactNumber,
      role: formData.role?.value,
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
      link: routeProperty.userInfo.path(queryId),
    },
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
          isLoading={isLoading}
        />
      </FormContainer>
    </Page>
  )
}

export default EditUser
