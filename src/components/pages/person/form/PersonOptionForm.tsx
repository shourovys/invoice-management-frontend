import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import { THandleInputChange } from 'types/components/common'
import { IFormErrors } from 'types/pages/common'
import { IPersonFormData, personThreatOptions } from 'types/pages/person'
import { listIcon } from 'utils/icons'

interface IProps {
  formData: IPersonFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function PersonOptionForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={listIcon} header="Option">
      <div className="flex items-center justify-between">
        <SwitchButton
          name="ada"
          checked={formData.ada}
          onChange={handleInputChange}
          label="Ada"
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading}
        />
        <SwitchButton
          name="invite"
          checked={formData.invite}
          onChange={handleInputChange}
          label="Invite"
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading}
        />
        <SwitchButton
          name="exempt"
          checked={formData.exempt}
          onChange={handleInputChange}
          label="Exempt"
          disabled={disabled || typeof handleInputChange === 'undefined'}
          isLoading={isLoading}
        />
      </div>

      <Selector
        name="threat_level"
        label="Threat Level"
        options={personThreatOptions}
        value={formData.threat_level}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.threat_level}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default PersonOptionForm
