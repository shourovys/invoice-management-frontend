import { regionApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData, doorReaderType } from 'types/pages/door'
import { IRegionResult } from 'types/pages/region'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorReaderForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: regionIsLoading, data: regionData } = useSWR<
    IListServerResponse<IRegionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : regionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={listIcon} header="Reader">
      <SwitchButton
        name="in_enable"
        label="Reader In Enable"
        checked={formData?.in_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.in_enable && (
        <Selector
          name="in_type"
          label="Reader In Type"
          value={formData?.in_type}
          onChange={handleInputChange}
          options={doorReaderType}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.in_type}
          isLoading={isLoading}
        />
      )}
      {formData?.in_enable && (
        <Selector
          name="in_region"
          label="Reader In Region"
          value={formData?.in_region}
          onChange={handleInputChange}
          options={regionData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.in_region}
          isLoading={isLoading || regionIsLoading}
        />
      )}
      <SwitchButton
        name="out_enable"
        label="Reader Out Enable"
        checked={formData?.out_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.out_enable && (
        <Selector
          name="out_type"
          label="Reader Out Type"
          value={formData?.out_type}
          onChange={handleInputChange}
          options={doorReaderType}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.out_type}
          isLoading={isLoading}
        />
      )}
      {formData?.out_enable && (
        <Selector
          name="out_region"
          label="Reader Out Region"
          value={formData?.out_region}
          onChange={handleInputChange}
          options={regionData?.results.map((result) => ({
            value: result.id.toString(),
            label: result.name,
          }))}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.out_region}
          isLoading={isLoading || regionIsLoading}
        />
      )}
    </FormCardWithHeader>
  )
}

export default DoorReaderForm
