import { ISelectOption } from '../../components/atomic/Selector'
import { IApiQueryParamsBase } from './common'

export interface ILogReportFilters {
  LogNo: string
  LogTime: string
  EventTime: string
  EventCode: string
  EventName: string
  DeviceType: ISelectOption | null
  DeviceNo: string
  DeviceName: string
  PersonName: string
  Reference: string
  Apply: boolean
}

export interface ILogReportApiQueryParams extends IApiQueryParamsBase {
  LogNo?: string
  LogTime?: string
  EventTime?: string
  EventCode?: string
  EventName?: string
  DeviceType?: string
  DeviceNo?: string
  DeviceName?: string
  PersonName?: string
  Reference?: string
}
