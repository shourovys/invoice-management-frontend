import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import useSWRMutation from 'swr/mutation'
import { sendPutRequest } from '../../api/swrConfig'
import { authApi } from '../../api/urls'
import useAuth from '../../hooks/useAuth'
import useStateWithCallback from '../../hooks/useStateWithCallback'
import { THandleInputChange } from '../../types/components/common'
import {
  IFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
} from '../../types/pages/common'
import { IProfileFormData } from '../../types/pages/profile'
import Icon, { applyIcon, cancelIcon } from '../../utils/icons'
import isValidEmail from '../../utils/isValidEmail'
import scrollToErrorElement from '../../utils/scrollToErrorElement'
import serverErrorHandler from '../../utils/serverErrorHandler'
import { editSuccessfulToast } from '../../utils/toast'
import t from '../../utils/translator'
import FormActionButtonsContainer from '../HOC/style/form/FormActionButtonsContainer'
import FormContainer from '../HOC/style/form/FormContainer'
import Button from '../atomic/Button'
import ProfileForm from '../pages/profile/form/ProfileForm'

interface IProps {
  setOpenModal: (openModal: boolean) => void
}

// Component to edit a Profile
function ProfileModal({ setOpenModal }: IProps) {
  // Prompt the user before unloading the page if there are unsaved changes
  useBeforeunload(() => t('You will lose your changes!'))

  const { user, loading } = useAuth()

  // Define the initial state of the form data and form errors
  const [formData, setFormData] = useState<IProfileFormData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    name: '',
    email: '',
    contactNumber: '',
  })
  const [formErrors, setFormErrors] = useStateWithCallback<IFormErrors>({}, scrollToErrorElement)

  // Fetch the details of the Profile from the server
  // const { isLoading, data } = useSWR<ISingleServerResponse<IUserResult>>(authApi.profile)
  useEffect(() => {
    // Set the form data to the fetched data once it's available
    if (user) {
      const { name, email, contactNumber } = user
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        name,
        email,
        contactNumber,
      })
    }
  }, [user])

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({ ...state, [name]: value }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  const handleModalClose = () => setOpenModal(false)

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(authApi.profile, sendPutRequest, {
    onSuccess: () => {
      handleModalClose()
      editSuccessfulToast(`Profile has been updated successfully.`)
    },
    onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
      serverErrorHandler(error, setFormErrors)
    },
  })

  // Handle the form submission
  const handleSubmit = async () => {
    // Validate the form data
    const errors: IFormErrors = {}
    if (!formData.name) {
      errors.name = t`Name is required`
    }
    if (!formData.oldPassword) {
      errors.oldPassword = t`Old Password is required`
    }
    // if (!formData.newPassword) {
    //   errors.newPassword = t`New Password is required`
    // }
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = t`Passwords do not match`
    }
    if (!formData.email) {
      errors.email = t`Email is required`
    } else if (!isValidEmail(formData.email)) {
      errors.email = t`Please enter a valid email address`
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
      currentPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
    }
    trigger(modifiedFormData)
  }

  // Define the actions for the breadcrumbs bar
  // const breadcrumbsActionsButtons: IActionsButton[] = [
  //   {
  //     color: 'apply',
  //     icon: applyIcon,
  //     text: t`Apply`,
  //     onClick: handleSubmit,
  //     isLoading: isMutating,
  //   },
  // ]

  return (
    <div className="w-full px-4 pt-4 bg-white rounded-md">
      <div className="pt-2" />
      {/* Render the breadcrumbs bar with the defined actions */}
      {/* <Breadcrumbs
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
        pageRoutes={[
          {
            href: routeProperty.profile.path(),
            text: t`Profile`,
          },
        ]}
      />
      <div className="pt-2" /> */}
      <FormContainer errorAlert={formErrors?.non_field_errors} twoPart={false}>
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          formErrors={formErrors}
          isLoading={loading}
        />
      </FormContainer>
      <FormActionButtonsContainer allowsShow>
        <Button color="apply" size="large" onClick={handleSubmit} isLoading={isMutating}>
          <Icon icon={applyIcon} />
          <span>{t`Apply`}</span>
        </Button>
        <Button size="base" color="cancel" onClick={handleModalClose}>
          <Icon icon={cancelIcon} />
          <span>{t`Cancel`}</span>
        </Button>
      </FormActionButtonsContainer>
    </div>
  )
}

export default ProfileModal
