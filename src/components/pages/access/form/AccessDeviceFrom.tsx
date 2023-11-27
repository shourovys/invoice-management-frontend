import { groupApi } from 'api/urls'
import { ElementsApi } from 'api/urls/common'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector, { TSelectValue } from 'components/atomic/Selector'
import MultiSelect from 'components/common/form/MultiSelect'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IAccessFormData, accessSelectType } from 'types/pages/access'
import { IElementsResult, IFormErrors, IListServerResponse } from 'types/pages/common'
import { IGroupResult } from 'types/pages/group'
import { SERVER_QUERY } from 'utils/config'
import { accessDeviceIcon } from 'utils/icons'

interface IProps {
  formData: IAccessFormData
  formErrors?: IFormErrors
  handleInputChange?: THandleInputChange
  disabled?: boolean
  isLoading?: boolean
}

function AccessDeviceFrom({
  formData,
  formErrors,
  handleInputChange,
  disabled,
  isLoading,
}: IProps) {
  // Fetch elements by type from the server
  const { isLoading: devicesIsLoading, data: devicesData } = useSWR<
    IListServerResponse<IElementsResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'individual' || !formData.device_type?.value
      ? null
      : ElementsApi.list(`type=${formData?.device_type?.value}`)
  )

  const { isLoading: groupIsLoading, data: groupData } = useSWR<
    IListServerResponse<IGroupResult[]>
  >(
    // disabled ||
    //     typeof handleInputChange === "undefined" ||
    formData.select_type?.value !== 'group' || !formData.device_type?.value
      ? null
      : groupApi.list(`${SERVER_QUERY.selectorDataQuery}&type=${formData.device_type?.value}`)
  )

  const handleTypeChange = (name: string, selectedValue: TSelectValue) => {
    if (handleInputChange) {
      handleInputChange(name, selectedValue)
      handleInputChange('devices', [])
      handleInputChange('groups', [])
    }
  }

  return (
    <FormCardWithHeader icon={accessDeviceIcon} header="Access Device" twoPart={false}>
      <Selector
        name="select_type"
        label="Select Type"
        value={formData.select_type}
        options={accessSelectType}
        onChange={handleTypeChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.select_type}
        isLoading={isLoading}
      />

      <div>
        {formData.select_type?.value !== 'individual' && (
          <MultiSelect
            name="groups"
            label="Access Item"
            value={formData?.groups}
            options={groupData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={
              disabled || typeof handleInputChange === 'undefined' || !formData.device_type?.value
            }
            isLoading={groupIsLoading}
            error={formErrors?.groups}
          />
        )}
      </div>

      <div>
        {formData.select_type?.value === 'individual' && (
          <MultiSelect
            name="devices"
            label="Access Item"
            value={formData?.devices}
            options={devicesData?.results.map((item) => ({
              id: item.id.toString(),
              label: item.name,
            }))}
            onChange={handleInputChange}
            disabled={
              disabled || typeof handleInputChange === 'undefined' || !formData.device_type?.value
            }
            isLoading={isLoading || devicesIsLoading}
            error={formErrors?.devices}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default AccessDeviceFrom
