import { nodeApi, partitionApi } from '../../../../api/urls'
import FormCardWithHeader from '../../../../components/HOC/FormCardWithHeader'
import Input from '../../../../components/atomic/Input'
import Selector from '../../../../components/atomic/Selector'
import useSWR from 'swr'
import { THandleInputChange } from '../../../../types/components/common'
import {
  ICameraFormData,
  ICameraInfoFormData,
  recordStatOptions,
} from '../../../../types/pages/camera'
import {
  IFormErrors,
  IListServerResponse,
  booleanSelectOption,
} from '../../../../types/pages/common'
import { INodeResult } from '../../../../types/pages/node'
import { IPartitionResult } from '../../../../types/pages/partition'
import { SERVER_QUERY } from '../../../../utils/config'
import { cameraIcon } from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  formData?: ICameraFormData | ICameraInfoFormData
  handleInputChange?: THandleInputChange
  formErrors?: IFormErrors
  disabled?: boolean
  isLoading?: boolean
}

function CameraForm({ formData, handleInputChange, formErrors, disabled, isLoading }: IProps) {
  const { isLoading: partitionIsLoading, data: partitionData } = useSWR<
    IListServerResponse<IPartitionResult[]>
  >(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : partitionApi.list(SERVER_QUERY.selectorDataQuery)
  )

  const { isLoading: nodeIsLoading, data: nodeData } = useSWR<IListServerResponse<INodeResult[]>>(
    disabled || typeof handleInputChange === 'undefined'
      ? null
      : nodeApi.list(SERVER_QUERY.selectorDataQuery)
  )

  // const { isLoading: userIsLoading, data: userData } = useSWR<
  //   IListServerResponse<IUserResult[]>
  // >(
  //   disabled || typeof handleInputChange === 'undefined'
  //     ? null
  //     : userApi.list(SERVER_QUERY.selectorDataQuery)
  // )

  return (
    <FormCardWithHeader icon={cameraIcon} header={t`Camera`}>
      <Selector
        name="Partition"
        label={t`Partition`}
        value={formData?.Partition}
        options={partitionData?.data.map((result) => ({
          value: result.PartitionNo.toString(),
          label: result.PartitionName,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Partition}
        isLoading={isLoading || partitionIsLoading}
      />
      <Input
        name="CameraName"
        label={t`Camera Name`}
        value={formData?.CameraName}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.CameraName}
        isLoading={isLoading}
      />
      <Input
        name="CameraDesc"
        label={t`Description`}
        value={formData?.CameraDesc}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.CameraDesc}
        isLoading={isLoading}
      />
      <Selector
        name="Node"
        label={t`Node`}
        value={formData?.Node}
        options={nodeData?.data.map((result) => ({
          value: result.NodeNo.toString(),
          label: result.NodeName,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.Node}
        isLoading={isLoading || nodeIsLoading}
      />
      <Input
        name="CameraPort"
        label={t`Camera Port`}
        value={formData?.CameraPort}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.CameraPort}
        isLoading={isLoading}
      />
      <Input
        name="MainUrl"
        label={t`Main URL`}
        value={formData?.MainUrl}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="text"
        error={formErrors?.MainUrl}
        isLoading={isLoading}
      />
      <Input
        name="SubUrl"
        label={t`Sub URL`}
        value={formData?.SubUrl}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="text"
        error={formErrors?.SubUrl}
        isLoading={isLoading}
      />
      {/* <Selector
        name="user"
        label={t`User ID`}
        value={formData?.User}
        options={userData?.data.map((result) => ({
          value: result.UserId.toString(),
          label: result.UserName,
        }))}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.User}
        isLoading={isLoading || userIsLoading}
      /> */}
      <Input
        name="UserId"
        label={t`User ID`}
        value={formData?.UserId}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        error={formErrors?.UserId}
        isLoading={isLoading}
      />
      <Input
        name="Password"
        label={t`Password`}
        value={formData?.Password}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="password"
        error={formErrors?.Password}
        isLoading={isLoading}
      />
      <Input
        name="PreTime"
        label={t`Pre-Event Record Time (sec)`}
        value={formData?.PreTime}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.PreTime}
        isLoading={isLoading}
      />
      <Input
        name="PostTime"
        label={t`Post-Event Record Time (sec)`}
        value={formData?.PostTime}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.PostTime}
        isLoading={isLoading}
      />
      <Input
        name="MinTime"
        label={t`Minimum Record Time (min)`}
        value={formData?.MinTime}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.MinTime}
        isLoading={isLoading}
      />
      <Input
        name="MaxTime"
        label={t`Maximum Record Time (day)`}
        value={formData?.MaxTime}
        onChange={handleInputChange}
        disabled={disabled || typeof handleInputChange === 'undefined'}
        type="number"
        error={formErrors?.MaxTime}
        isLoading={isLoading}
      />
      {formData &&
        'RecordStat' in formData &&
        (disabled || typeof handleInputChange === 'undefined') && (
          <Selector
            name="RecordStat"
            label={t`Record Stat`}
            value={formData?.RecordStat}
            options={recordStatOptions}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.RecordStat}
            isLoading={isLoading}
          />
        )}
      {formData &&
        'Online' in formData &&
        (disabled || typeof handleInputChange === 'undefined') && (
          <Selector
            name="Online"
            label={t`Online`}
            value={formData?.Online}
            options={booleanSelectOption}
            onChange={handleInputChange}
            disabled={disabled || typeof handleInputChange === 'undefined'}
            error={formErrors?.Online}
            isLoading={isLoading}
          />
        )}
    </FormCardWithHeader>
  )
}

export default CameraForm
