import { scheduleApi } from 'api/urls'
import FormCardWithHeader from 'components/HOC/FormCardWithHeader'
import Input from 'components/atomic/Input'
import Selector from 'components/atomic/Selector'
import SwitchButton from 'components/atomic/Switch'
import useSWR from 'swr'
import { THandleInputChange } from 'types/components/common'
import { IArchiveScheduleFormData, archiveScheduleMediaOptions } from 'types/pages/archiveSchedule'
import { IFormErrors, IListServerResponse } from 'types/pages/common'
import { IScheduleResult } from 'types/pages/schedule'
import { SERVER_QUERY } from 'utils/config'
import { archiveScheduleIcon } from 'utils/icons'

interface IProps {
  formData?: IArchiveScheduleFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function ArchiveScheduleForm({
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
    <FormCardWithHeader icon={archiveScheduleIcon} header="Archive Schedule">
      <Input
        name="name"
        label="Archive Schedule Name"
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
        options={archiveScheduleMediaOptions}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.media}
        isLoading={isLoading}
      />

      <SwitchButton
        name="usage_based"
        label="Usage Based"
        checked={formData?.usage_based}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        isLoading={isLoading}
      />
      {formData?.usage_based ? (
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
      ) : (
        <Input
          name="usage_percent"
          label="Usage Percent"
          type="number"
          value={formData?.usage_percent}
          onChange={handleInputChange}
          disabled={disabled || typeof handleInputChange === 'undefined'}
          error={formErrors?.usage_percent}
          isLoading={isLoading}
        />
      )}

      <div>
        {disabled ||
          (typeof handleInputChange === 'undefined' && (
            <Input
              name="archive_time"
              label="Archive Time"
              value={formData?.archive_time}
              onChange={handleInputChange}
              disabled={disabled || typeof handleInputChange === 'undefined'}
              error={formErrors?.archive_time}
              isLoading={isLoading}
            />
          ))}
      </div>
      <div>
        {(disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="archive_time"
            label="Archive Time"
            value={formData?.archive_time}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.archive_time}
            isLoading={isLoading}
          />
        )}
      </div>

      <div>
        {(disabled || typeof handleInputChange === 'undefined') && (
          <Input
            name="archive_logo_no"
            label="Archive Logo No"
            value={formData?.archive_logo_no}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            isLoading={isLoading}
          />
        )}
      </div>
    </FormCardWithHeader>
  )
}

export default ArchiveScheduleForm
