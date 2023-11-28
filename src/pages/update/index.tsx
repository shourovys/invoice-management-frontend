import { sendPostRequestWithFile } from '../../api/swrConfig'
import { updateApi } from '../../api/urls'
import { AxiosError } from 'axios'
import Page from '../../components/HOC/Page'
import FormActionButtonsContainer from '../../components/HOC/style/form/FormActionButtonsContainer'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Button from '../../components/atomic/Button'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import ServerUpdateFrom from '../../components/pages/maintenance/ServerUpdateFrom'
import UpdateFrom from '../../components/pages/maintenance/UpdateFrom'
import useLogoutMutation from '../../hooks/useLogoutMutation'
import useStateWithCallback from '../../hooks/useStateWithCallback'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { THandleInputChange } from '../../types/components/common'
import { IFormErrors, IServerErrorResponse } from '../../types/pages/common'
import { IUpdateFormData, maintenanceUpdateMediaOptions } from '../../types/pages/maintenance'
import Icon, { applyIcon } from '../../utils/icons'
import scrollToErrorElement from '../../utils/scrollToErrorElement'
import { editSuccessfulToast } from '../../utils/toast'
import serverErrorHandler from '../../utils/serverErrorHandler'
import t from '../../utils/translator'

// Component to show details of update
function UpdateInfo() {
  // const navigate = useNavigate()

  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<IUpdateFormData>({
    Action: 'update',
    MediaType: maintenanceUpdateMediaOptions[0],
    File: null,
    FileName: null,
  })
  const [formErrors, setFormErrors] = useStateWithCallback<IFormErrors>({}, scrollToErrorElement)

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({ ...state, [name]: value }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(updateApi.edit, sendPostRequestWithFile, {
    onSuccess: () => {
      editSuccessfulToast()
    },

    onError: (error: AxiosError<IServerErrorResponse>) => {
      serverErrorHandler(error, setFormErrors)
    },
  })

  // Handle the form submission
  const handleSubmit = async () => {
    // Validate the form data
    const errors: IFormErrors = {}
    if (!formData.MediaType?.value) {
      errors.media_type = t`Media is required`
    }
    if (formData.MediaType?.value !== 'UserPC' && !formData.FileName?.value) {
      errors.FileName = t`File is required`
    } else if (formData.MediaType?.value === 'UserPC' && !formData.File) {
      errors.File = t`File is required.`
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

    const form = new FormData()
    form.append('Action', formData.Action)
    form.append('MediaType', formData.MediaType?.value || '')
    if (formData.MediaType?.value === 'UserPC') {
      if (formData.File) form.append('File', formData.File[0] as File)
    } else {
      form.append('FileName', formData.FileName?.value || '')
    }

    trigger(form)
  }

  const { logout, isLogoutLoading } = useLogoutMutation()

  // Define the mutation function for server update and on successful response user logout
  const { trigger: updateServerTrigger, isMutating: updateServerLoading } = useSWRMutation(
    updateApi.updateServer,
    sendPostRequestWithFile,
    {
      onSuccess: () => {
        editSuccessfulToast()
        logout()
      },
    }
  )

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs
        pageRoutes={[
          {
            href: '/update',
            text: t`Update`,
          },
        ]}
      />
      <div className="pt-2" />
      <FormContainer errorAlert={formErrors?.non_field_errors} twoPart={false}>
        <ServerUpdateFrom />
      </FormContainer>
      <FormActionButtonsContainer allowsShow>
        <Button
          size="large"
          onClick={() => updateServerTrigger({})}
          isLoading={updateServerLoading || isLogoutLoading}
        >
          <Icon icon={applyIcon} />
          <span>{t`Update`}</span>
        </Button>
      </FormActionButtonsContainer>
      <div className="pt-6" />
      <FormContainer twoPart={false}>
        <UpdateFrom
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
        />
      </FormContainer>
      <FormActionButtonsContainer allowsShow>
        <Button size="large" onClick={handleSubmit} isLoading={isMutating}>
          <Icon icon={applyIcon} />
          <span>{t`Update`}</span>
        </Button>
      </FormActionButtonsContainer>
    </Page>
  )
}

export default UpdateInfo
