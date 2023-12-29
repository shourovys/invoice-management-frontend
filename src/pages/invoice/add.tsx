import { AxiosError } from 'axios'
import { useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { v4 as uuidv4 } from 'uuid'
import { sendPostRequest } from '../../api/swrConfig'
import { invoiceApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import FormActionButtonsContainer from '../../components/HOC/style/form/FormActionButtonsContainer'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Button from '../../components/atomic/Button'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import InvoiceProductFrom from '../../components/pages/invoice/form/InvoiceProductFrom'
import InvoiceSellerForm from '../../components/pages/invoice/form/InvoiceSellerForm'
import useStateWithCallback from '../../hooks/useStateWithCallback'
import routeProperty from '../../routes/routeProperty'
import { IActionsButton } from '../../types/components/actionButtons'
import { THandleInputChange } from '../../types/components/common'
import {
  INewFormErrors,
  IServerCommandErrorResponse,
  IServerErrorResponse,
} from '../../types/pages/common'
import { IInvoice, IInvoiceFormData } from '../../types/pages/invoice'
import Icon, { addIcon, applyIcon, cancelIcon } from '../../utils/icons'
import scrollToErrorElement from '../../utils/scrollToErrorElement'
import serverErrorHandler from '../../utils/serverErrorHandler'
import { addSuccessfulToast } from '../../utils/toast'
import t from '../../utils/translator'

// Component to create a Invoice
function CreateInvoice() {
  const navigate = useNavigate()
  // Prompt the invoice before unloading the page if there are unsaved changes
  useBeforeunload(() => t('You will lose your changes!'))

  // Define state variables for the form data and form errors
  const [formData, setFormData] = useState<IInvoiceFormData>({
    product: [
      {
        id: uuidv4(), // Generate a unique ID for the new product
        name: '',
        code: '',
        description: '',
        price: NaN,
        quantity: NaN,
      },
    ], // Updated property structure
    sellerInfo: {
      name: '',
      email: '',
      contactNumber: '',
    },
  })
  console.log('🚀 ~ file: add.tsx:44 ~ CreateInvoice ~ formData:', formData)
  const [formErrors, setFormErrors] = useStateWithCallback<INewFormErrors<IInvoiceFormData>>(
    {},
    scrollToErrorElement
  )

  // Update the form data when any input changes
  const handleInputChange: THandleInputChange = (name, value) => {
    setFormData((state) => ({
      ...state,
      [name]: value,
    }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Update the product property in the form data
  const handleProductChange = (productId: string, field: string, value: string | number) => {
    setFormData((prevData) => {
      const updatedProduct = prevData.product.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            [field]: value,
          }
        }
        return product
      })

      return {
        ...prevData,
        product: updatedProduct,
      }
    })
  }

  // Update the sellerInfo property in the form data
  const handleSellerInfoChange: THandleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      sellerInfo: {
        ...prevData.sellerInfo,
        [name]: value,
      },
    }))
    setFormErrors({ ...formErrors, [name]: null })
  }

  // Define the mutation function to send the form data to the server
  const { trigger, isMutating } = useSWRMutation(invoiceApi.add, sendPostRequest, {
    onSuccess: (data: IInvoice) => {
      addSuccessfulToast()
      // redirect to invoice list page on success
      navigate(routeProperty.invoiceInfo.path(data._id))
    },
    onError: (error: AxiosError<IServerErrorResponse | IServerCommandErrorResponse>) => {
      serverErrorHandler(error, setFormErrors)
    },
  })

  // Handle the form submission
  const handleSubmit = async () => {
    // Validate the form data
    const errors: Partial<Record<string, string>> = {}

    // Check if seller's name and contactNumber are present
    if (!formData.sellerInfo.name) {
      errors['sellerInfo.name'] = t`Seller's name is required`
    }
    if (!formData.sellerInfo.contactNumber) {
      errors['sellerInfo.contactNumber'] = t`Seller's contact number is required`
    }

    // Check if all product names, prices, and quantities are present
    formData.product.forEach((product, index) => {
      if (!product.name) {
        errors[`product.${index}.name`] = t`Product name is required`
      }
      if (!product.price) {
        errors[`product.${index}.price`] = t`Product price is required`
      }
      if (!product.quantity) {
        errors[`product.${index}.quantity`] = t`Product quantity is required`
      }
    })

    // If there are errors, display them and do not submit the form
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    // Modify form data to match API requirements and trigger the mutation
    const modifiedFormData = {
      product: formData.product,
      sellerInfo: formData.sellerInfo,
    }

    trigger(modifiedFormData)
  }

  // Function to add a new product to the form data
  const handleAddProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      product: [
        ...prevData.product,
        {
          id: uuidv4(), // Generate a unique ID for the new product
          name: '',
          code: '',
          description: '',
          price: NaN,
          quantity: NaN,
        },
      ],
    }))
  }

  // Function to delete a product from the form data
  const handleDeleteProduct = (productId: string) => {
    setFormData((prevData) => ({
      ...prevData,
      product: prevData.product.filter((product) => product.id !== productId),
    }))
  }

  // Define the actions for the breadcrumbs bar
  const breadcrumbsActionsButtons: IActionsButton[] = [
    {
      icon: addIcon,
      color: 'apply',
      text: t`Add Product`,
      onClick: handleAddProduct,
    },
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
    //   link: routeProperty.invoice.path(),
    // },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActionsButtons={breadcrumbsActionsButtons} />
      <div className="pt-2" />
      <FormContainer errorAlert={formErrors?.non_field_errors}>
        <InvoiceSellerForm
          formData={formData}
          handleInputChange={handleSellerInfoChange}
          formErrors={formErrors}
        />
        {formData.product.map((product) => (
          <InvoiceProductFrom
            key={product.id}
            formData={product}
            handleInputChange={handleProductChange}
            formErrors={formErrors}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </FormContainer>
      <FormActionButtonsContainer allowsShow>
        <Button color="apply" size="large" onClick={handleSubmit} isLoading={isMutating}>
          <Icon icon={applyIcon} />
          <span>{t`Apply`}</span>
        </Button>
        <Button size="large" color="cancel" link={routeProperty.invoice.path()}>
          <Icon icon={cancelIcon} />
          <span>{t`Cancel`}</span>
        </Button>
      </FormActionButtonsContainer>
    </Page>
  )
}

export default CreateInvoice
