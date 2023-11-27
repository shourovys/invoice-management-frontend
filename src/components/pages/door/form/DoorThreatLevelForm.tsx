import { threatApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import MultipleCheckbox from 'components/atomic/MultipleCheckbox'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IDoorFormData, doorThreatLevel } from 'types/pages/door'
import { IThreatResult } from 'types/pages/threat'
import { SERVER_QUERY } from 'utils/config'
import { listIcon } from 'utils/icons'

interface IProps {
  formData?: IDoorFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function DoorThreatLevelForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const { isLoading: threatIsLoading, data: threatData } = useSWR<
    IListServerResponse<IThreatResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : threatApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={listIcon} header="Threat Level">
      <MultipleCheckbox
        name="threats"
        inputLabel="Threat List"
        checkboxData={threatData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        checked={formData?.threats}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.threats}
        isLoading={isLoading || threatIsLoading}
      />
      <Selector
        name="threat_level"
        label="Threat Level"
        value={formData?.threat_level}
        options={doorThreatLevel}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.threat_level}
        isLoading={isLoading}
      />
      <SwitchButton
        name="threat_ignore_rex_enable"
        label="Threat Ignore Rex"
        checked={formData?.threat_ignore_rex_enable}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default DoorThreatLevelForm
