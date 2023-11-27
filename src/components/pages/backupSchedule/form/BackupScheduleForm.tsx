import { scheduleApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import RadioButtons from 'components/atomic/RadioButtons'
import Selector from 'components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IBackupScheduleFormData, backupScheduleMediaOptions } from 'types/pages/backupSchedule'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { maintenanceBackupOptions } from 'types/pages/maintenance'
import { IScheduleResult } from 'types/pages/schedule'
import { SERVER_QUERY } from 'utils/config'
import { backupScheduleIcon } from 'utils/icons'

interface IProps {
  formData?: IBackupScheduleFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function BackupScheduleForm({
  formData,
  handleInputChange,
  formErrors,
  disabled,
  isLoading,
}: IProps) {
  const { isLoading: scheduleIsLoading, data: scheduleData } = useSWR<
    IListServerResponse<IScheduleResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : scheduleApi.list(SERVER_QUERY.selectorDataQuery)
  )

  return (
    <FormCardWithHeader icon={backupScheduleIcon} header="Backup Schedule">
      <Input
        name="name"
        label="Backup Schedule Name"
        value={formData?.name}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.name}
        isLoading={isLoading}
      />
      <Input
        name="description"
        label="Description"
        value={formData?.description}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.description}
        isLoading={isLoading}
      />
      <Selector
        name="media"
        label="Media"
        value={formData?.media}
        options={backupScheduleMediaOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.media}
        isLoading={isLoading}
      />

      <Selector
        name="schedule"
        label="Schedule"
        value={formData?.schedule}
        options={scheduleData?.results.map((result) => ({
          value: result.id.toString(),
          label: result.name,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.schedule}
        isLoading={isLoading || scheduleIsLoading}
      />
      <RadioButtons
        name="backup_type"
        inputLabel="Backup Data"
        checked={formData?.backup_type}
        radios={maintenanceBackupOptions}
        onChange={handleInputChange}
        isLoading={isLoading}
        error={formErrors?.backup_type}
      />
      <div>
        {(disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="backup_time"
            label="Backup Time"
            value={formData?.backup_time}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.backup_time}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default BackupScheduleForm
