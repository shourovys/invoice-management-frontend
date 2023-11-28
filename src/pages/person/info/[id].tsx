import { sendDeleteRequest } from '../../../api/swrConfig'
import { personApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import {
  PersonAccessForm,
  PersonDefinedFieldForm,
  PersonOptionForm,
  PersonPersonalForm,
} from '../../../components/pages/person/form'
import PersonCredentialList from '../../../components/pages/person/form/PersonCredentialList'
import useAlert from '../../../hooks/useAlert'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import routeProperty from '../../../routes/routeProperty'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IActionsButton } from '../../../types/components/actionButtons'
import {
  ISingleServerResponse,
  accessSelectOption,
  booleanSelectOption,
} from '../../../types/pages/common'
import {
  IPersonInfoFormData,
  IPersonResult,
  personThreatOptions,
} from '../../../types/pages/person'
import { findSelectOption, findSelectOptionOrDefault } from '../../../utils/findSelectOption'
import { deleteIcon, editIcon, listIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

// Component to show details of a person
function PersonInfo() {
  const navigate = useNavigate()
  // Get the person ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<IPersonInfoFormData>({
    Partition: null,
    LastName: '',
    FirstName: '',
    MiddleName: '',
    Email: '',
    ImageFile: '',
    Credentials: [],
    Ada: null,
    Exempt: null,
    Invite: null,
    ThreatLevel: null,
    AccessSelect: null,
    AccessIds: [],
    GroupIds: [],
    Accesses: [],
    Groups: [],
    Field1: '',
    Field2: '',
    Field3: '',
    Field4: '',
    Field5: '',
    Field6: '',
    Field7: '',
    Field8: '',
    Field9: '',
    Field10: '',
    Field11: '',
    Field12: '',
    Field13: '',
    Field14: '',
    Field15: '',
    Field16: '',
    Field17: '',
    Field18: '',
    Field19: '',
    Field20: '',
  })
  const [isDeleted, setIsDeleted] = useState(false)

  // Fetch the details of the Person from the server
  const { isLoading, data, mutate } = useSWR<ISingleServerResponse<IPersonResult>>(
    isDeleted || !queryId ? null : personApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      const {
        Partition,
        FirstName,
        MiddleName,
        LastName,
        Email,
        ImageFile,
        Ada,
        Exempt,
        Invite,
        Credentials,
        ThreatLevel,
        AccessSelect,
        Accesses,
        Groups,
        Field1,
        Field2,
        Field3,
        Field4,
        Field5,
        Field6,
        Field7,
        Field8,
        Field9,
        Field10,
        Field11,
        Field12,
        Field13,
        Field14,
        Field15,
        Field16,
        Field17,
        Field18,
        Field19,
        Field20,
      } = data.data

      setFormData({
        Partition: {
          label: Partition.PartitionName,
          value: Partition.PartitionNo.toString(),
        },
        FirstName: FirstName || '',
        MiddleName: MiddleName || '',
        LastName: LastName || '',
        Email: Email || '',
        ImageFile: ImageFile || '',
        Credentials,
        Ada: findSelectOptionOrDefault(booleanSelectOption, Ada),
        Exempt: findSelectOptionOrDefault(booleanSelectOption, Exempt),
        Invite: findSelectOptionOrDefault(booleanSelectOption, Invite),
        ThreatLevel: findSelectOption(personThreatOptions, ThreatLevel),
        AccessSelect: findSelectOptionOrDefault(accessSelectOption, AccessSelect),
        AccessIds: [],
        GroupIds: [],
        Groups: Groups || [],
        Accesses: Accesses || [],
        Field1: Field1 || '',
        Field2: Field2 || '',
        Field3: Field3 || '',
        Field4: Field4 || '',
        Field5: Field5 || '',
        Field6: Field6 || '',
        Field7: Field7 || '',
        Field8: Field8 || '',
        Field9: Field9 || '',
        Field10: Field10 || '',
        Field11: Field11 || '',
        Field12: Field12 || '',
        Field13: Field13 || '',
        Field14: Field14 || '',
        Field15: Field15 || '',
        Field16: Field16 || '',
        Field17: Field17 || '',
        Field18: Field18 || '',
        Field19: Field19 || '',
        Field20: Field20 || '',
      })
    }
  }, [data])

  // Define the mutation function to delete the person from the server
  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    personApi.delete(queryId),
    sendDeleteRequest,
    {
      // Show a success message and redirect to person list page on successful delete
      onSuccess: () => {
        navigate(routeProperty.person.path(), { replace: true })
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
      link: routeProperty.personEdit.path(queryId),
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
      link: routeProperty.person.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer>
        <PersonPersonalForm formData={formData} isLoading={isLoading} />

        <PersonDefinedFieldForm formData={formData} isLoading={isLoading} />

        <PersonOptionForm formData={formData} isLoading={isLoading} />

        <PersonAccessForm formData={formData} isLoading={isLoading} />
      </FormContainer>

      <div className="pt-5" />
      <FormContainer twoPart={false}>
        <PersonCredentialList
          parsonCredentials={formData.Credentials}
          isLoading={isLoading}
          refetchPersonDetails={mutate}
        />
      </FormContainer>
    </Page>
  )
}

export default PersonInfo
