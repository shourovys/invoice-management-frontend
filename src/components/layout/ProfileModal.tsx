import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { sendPutRequest } from '../../api/swrConfig'
import { authApi } from '../../api/urls'
import useStateWithCallback from '../../hooks/useStateWithCallback'
import { THandleInputChange } from '../../types/components/common'
import {
  IFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
  ISingleServerResponse,
} from '../../types/pages/common'
import { IProfileFormData, IProfileResult } from '../../types/pages/profile'
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

  // Define the initial state of the form data and form errors
  const [formData, setFormData] = useState<IProfileFormData>({
    UserId: '',
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
    Email: '',
    UserDesc: '',
  })
  const [formErrors, setFormErrors] = useStateWithCallback<IFormErrors>({}, scrollToErrorElement)

  // Fetch the details of the Profile from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<IProfileResult>>(authApi.profile)
  useEffect(() => {
    // Set the form data to the fetched data once it's available
    if (data) {
      const { UserId, UserDesc, Email } = data.data.user
      setFormData({
        UserId,
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: '',
        Email,
        UserDesc: UserDesc ?? '',
      })
    }
  }, [data])

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
    if (!formData.UserId) {
      errors.UserId = t`User ID is required`
    }
    if (!formData.OldPassword) {
      errors.OldPassword = t`Old Password is required`
    }
    if (!formData.NewPassword) {
      errors.NewPassword = t`New Password is required`
    }
    if (formData.NewPassword !== formData.ConfirmPassword) {
      errors.ConfirmPassword = t`Passwords do not match`
    }
    if (!formData.Email) {
      errors.Email = t`Email is required`
    } else if (!isValidEmail(formData.Email)) {
      errors.Email = t`Please enter a valid email address`
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
      UserId: formData.UserId,
      OldPassword: formData.OldPassword,
      NewPassword: formData.NewPassword,
      Email: formData.Email,
      UserDesc: formData.UserDesc,
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
          isLoading={isLoading}
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
