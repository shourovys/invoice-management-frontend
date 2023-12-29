import { IApiQueryParamsBase } from './common'
import { IUserResult } from './user'

export interface IInvoice {
  _id: string
  agent: IUserResult
  product: {
    id: string
    name: string
    code: string
    description: string
    price: number
    quantity: number
  }[]
  sellerInfo: {
    name: string
    email: string
    contactNumber: string
  }
  status: string
  createdAt: Date
  updatedAt: Date
}
export interface IInvoiceResult {
  agent: IUserResult
  invoice: IInvoice
}

export interface IInvoiceRouteQueryParams {
  page: number
  agentName: string
  productName: string
  sellerName: string
}

export interface IInvoiceApiQueryParams extends IApiQueryParamsBase {
  agentName?: string
  productName?: string
  sellerName?: string
}

export interface IInvoiceFormData {
  product: IInvoice['product']
  sellerInfo: IInvoice['sellerInfo']
}

export interface IInvoiceFilters {
  agentName: string
  productName: string
  sellerName: string
  Apply: boolean
}
