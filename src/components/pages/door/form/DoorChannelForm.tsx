import { channelApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IChannelResult } from 'types/pages/channel'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData } from 'types/pages/door'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorChannelForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: channelIsLoading, data: channelData } = useSWR<
    IListServerResponse<IChannelResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : channelApi.list(SERVER_QUERY.selectorDataQuery)
  )
  return (
    <FormCardWithHeader icon={listIcon} header="Channel">
      <SwitchButton
        name="channel_enable"
        checked={formData?.channel_enable}
        onChange={handleInputChange}
        label="Channel Enable"
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />

      {formData?.channel_enable && (
        <Selector
          name="channel"
          label="Pair Door"
          value={formData?.channel}
          options={channelData?.results.map((item) => ({
            value: item.id.toString(),
            label: item.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.channel}
          isLoading={isLoading || channelIsLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorChannelForm
