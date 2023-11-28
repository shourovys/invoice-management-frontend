import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Selector from '../../../../components/atomic/Selector'
import { THandleInputChange } from '../../../../types/components/common'
import { IFormErrors } from '../../../../types/pages/common'
import { ISystemEditFormData, systemBoardCountOptions } from '../../../../types/pages/system'
import { boardIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData: ISystemEditFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function SystemEditIOBoardFrom({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  return (
    <FormCardWithHeader icon={boardIcon} header={t`I/O Board`}>
      <Selector
        name="BoardCount"
        label={t`Board Count`}
        value={formData.BoardCount}
        options={systemBoardCountOptions}
        isClearable={false}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.BoardCount}
        isLoading={isLoading}
      />
    </FormCardWithHeader>
  )
}

export default SystemEditIOBoardFrom
