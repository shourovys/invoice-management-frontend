import { doorApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData, IDoorResult } from 'types/pages/door'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorPairForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: doorIsLoading, data: doorData } = useSWR<IListServerResponse<IDoorResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : doorApi.list(SERVER_QUERY.selectorDataQuery)
  )
  return (
    <FormCardWithHeader icon={listIcon} header="Pair Door">
      <SwitchButton
        name="pair_door_enable"
        label="Pair Door Enable"
        checked={formData?.pair_door_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.pair_door_enable && (
        <Selector
          name="pair_door"
          label="Pair Door"
          value={formData?.pair_door}
          options={doorData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.pair_door}
          isLoading={isLoading || doorIsLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorPairForm
