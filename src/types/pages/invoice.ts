import { IApiQueryParamsBase } from './common'
import { IUserResult } from './user'

export interface IInvoiceResult {
  _id: string
  agent: {
    id: IUserResult['_id']
    name: IUserResult['name']
  }
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
  product: IInvoiceResult['product']
  sellerInfo: IInvoiceResult['sellerInfo']
}

export interface IInvoiceFilters {
  agentName: string
  productName: string
  sellerName: string
  Apply: boolean
}
