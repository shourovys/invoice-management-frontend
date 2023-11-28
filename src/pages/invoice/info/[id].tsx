import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { sendDeleteRequest } from '../../../api/swrConfig'
import { invoiceApi } from '../../../api/urls'
import Page from '../../../components/HOC/Page'
import FormContainer from '../../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../../components/layout/Breadcrumbs'
import InvoiceProductFrom from '../../../components/pages/invoice/form/InvoiceProductFrom'
import InvoiceSellerForm from '../../../components/pages/invoice/form/InvoiceSellerForm'
import InvoicePdfDownload from '../../../components/pages/invoice/pdf/InvoicePdfDownload'
import useAlert from '../../../hooks/useAlert'
import routeProperty from '../../../routes/routeProperty'
import { IActionsButton } from '../../../types/components/actionButtons'
import { ISingleServerResponse } from '../../../types/pages/common'
import { IInvoiceFormData, IInvoiceResult } from '../../../types/pages/invoice'
import { listIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

function InvoiceInfo() {
  const navigate = useNavigate()
  // Get the user ID from the router query
  const params = useParams()
  const queryId = params.id as string
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  const [formData, setFormData] = useState<IInvoiceFormData>({
    product: [], // Update property structure
    sellerInfo: {
      name: '',
      email: '',
      contactNumber: '',
    },
  })
  const [isDeleted, setIsDeleted] = useState(false)

  const { isLoading, data } = useSWR<ISingleServerResponse<IInvoiceResult>>(
    isDeleted || !queryId ? null : invoiceApi.details(queryId)
  )

  useEffect(() => {
    if (data) {
      setFormData({
        sellerInfo: data.data.sellerInfo,
        product: data.data.product,
      })
    }
  }, [data])

  const { trigger: deleteTrigger, isMutating: deleteIsLoading } = useSWRMutation(
    isDeleted || !queryId ? null : invoiceApi.delete(queryId),
    sendDeleteRequest,
    {
      onSuccess: () => {
        navigate(routeProperty.invoice.path(), { replace: true })
      },
      onError: () => {
        setIsDeleted(false)
      },
    }
  )

  const handleDelete = () => {
    const deleteMutation = () => {
      setIsDeleted(true)
      return deleteTrigger()
    }
    openAlertDialogWithPromise(deleteMutation, { success: t`Successful` })
  }

  const breadcrumbsActions: IActionsButton[] = [
    {
      color: 'danger',
      icon: listIcon,
      text: t`List`,
      link: routeProperty.invoice.path(),
    },
  ]

  return (
    <Page>
      <Breadcrumbs
        breadcrumbsActions={breadcrumbsActions}
        children={data?.data && <InvoicePdfDownload invoice={data?.data} />}
      />
      <div className="pt-2" />

      <FormContainer>
        <InvoiceSellerForm formData={formData} isLoading={isLoading} />
        {formData.product.map((product) => (
          <InvoiceProductFrom key={product.id} formData={product} isLoading={isLoading} />
        ))}
      </FormContainer>
    </Page>
  )
}

export default InvoiceInfo
