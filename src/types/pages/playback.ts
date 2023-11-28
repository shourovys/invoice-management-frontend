import { ISelectOption } from '../../components/atomic/Selector'

export interface IPlaybackFilters {
  Channel: ISelectOption | null
  Time: ISelectOption | null
  Stream: ISelectOption | null
  Apply: boolean
}

// export interface IPlaybackApiQueryParams {
//   ChannelNo?: string
//   Time?: string
//   Stream?: string
// }
