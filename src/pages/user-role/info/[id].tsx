import { sendDeleteRequest } from '../../../api/swrConfig'
import { userRoleApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import UserRoleForm from '../../../components/pages/userrole/form/UserRoleForm'
import useAlert from '../../../hooks/useAlert'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse } from '../../../types/pages/common'
import { IUserRoleInfoFormData, IUserRoleResult } from '../../../types/pages/userRole'
import { deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import t from '../../../utils/translator'
import useAuth from '../../../hooks/useAuth'
import pagesLicenseFilter from '../../../utils/pagesLicenseFilter'

// Component to show details of a userRole
function UserRoleInfo() {
  const { has_license, license } = useAuth()
  const navigate = useNavigate()
  // Get the userRole ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<IUserRoleInfoFormData>({
    RoleNo: 1,
    RoleName: '',
    RoleDesc: '',
    Partition: null,
    PageIds: [],
    Pages: [],
  })
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the UserRole from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<IUserRoleResult>>(
    isDeleted || !queryId ? null : userRoleApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      // Set the form data to the fetched data once it's available
      const { RoleNo, RoleName, RoleDesc, Partition, Pages } = data.data

      const filteredPages = pagesLicenseFilter(Pages, license, has_license)

      setFormData({
        RoleNo,
        RoleName,
        RoleDesc,
        Partition: {
          value: Partition.PartitionNo.toString(),
          label: Partition.PartitionName,
        },
        // PageIds: Pages.map((page) => page.id.toString()),
        PageIds: [],
        Pages: filteredPages,
      })
    }
  }, [data])

  // Define the mutation function to delete the userRole from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    userRoleApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to userRole list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.userRole.path(), { replace: true })
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
  let breadcrumbsActions: IActionsButton[] = [
    {
      color: 'danger',
      icon: editIcon,
      text: t`Edit`,
      link: routeProperty.userRoleEdit.path(queryId),
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
      link: routeProperty.userRole.path(),
    },
  ]

  if (queryId === '0') {
    breadcrumbsActions = breadcrumbsActions.filter((action) => action.text !== 'Delete')
  }

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer twoPart={false}>
        <UserRoleForm formData={formData} isLoading={isLoading} />
      </FormContainer>
    </Page>
  )
}

export default UserRoleInfo
