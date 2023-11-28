import { systemApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import FormContainer from '../../components/HOC/style/form/FormContainer'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import SystemInfoFieldFrom from '../../components/pages/system/info/SystemInfoFieldFrom'
import SystemInfoIOBoardFrom from '../../components/pages/system/info/SystemInfoIOBoardFrom'
import SystemInfoSDSpaceFrom from '../../components/pages/system/info/SystemInfoSDSpaceFrom'
import SystemInfoSpaceFrom from '../../components/pages/system/info/SystemInfoSpaceFrom'
import SystemInfoUSBSpaceFrom from '../../components/pages/system/info/SystemInfoUSBSpaceFrom'
import { useEffect, useState } from 'react'
import routeProperty from '../../routes/routeProperty'
import useSWR from 'swr'
import { IActionsButton } from '../../types/components/actionButtons'
import { booleanSelectOption, ISingleServerResponse } from '../../types/pages/common'
import {
  ISystemInfoFormData,
  ISystemResult,
  systemBoardCountOptions,
  systemMediaOptions,
} from '../../types/pages/system'
import { findSelectOptionOrDefault } from '../../utils/findSelectOption'
import { htmlInputDatetimeFormatter } from '../../utils/formetTime'
import { editIcon } from '../../utils/icons'
import kbToMb from '../../utils/kbToMb'
import t from '../../utils/translator'

// Component to show details of system
function SystemInfo() {
  // Define the initial state of the form data and is data deleted
  const [formData, setFormData] = useState<ISystemInfoFormData>({
    Name: '',
    BackupMedia: '',
    RecordMedia: '',
    SystemTotal: '',
    SystemFree: '',
    SdMount: null,
    SdTotal: '',
    SdFree: '',
    UsbMount: null,
    UsbTotal: '',
    UsbFree: '',
    StartTime: '',
    BoardCount: null,
    Board1: '',
    Board2: '',
    Product: '',
  })

  // Fetch the details of the System from the server
  const { isLoading, data } = useSWR<ISingleServerResponse<ISystemResult>>(systemApi.details)

  useEffect(() => {
    // Set the form data to the fetched data once it's available
    if (data) {
      const {
        Name,
        BackupMedia,
        RecordMedia,
        SystemTotal,
        SystemFree,
        SdMount,
        SdTotal,
        SdFree,
        UsbMount,
        UsbTotal,
        UsbFree,
        StartTime,
        BoardCount,
        Board1,
        Board2,
        Product,
      } = data.data

      setFormData({
        Name,
        BackupMedia:
          systemMediaOptions.find((option) => option.value === BackupMedia.toString())?.label || '',
        RecordMedia:
          systemMediaOptions.find((option) => option.value === RecordMedia.toString())?.label || '',
        SystemTotal: String(kbToMb(SystemTotal)) + ' MB',
        SystemFree: String(kbToMb(SystemFree)) + ' MB',
        SdMount: findSelectOptionOrDefault(booleanSelectOption, SdMount),
        SdTotal: String(kbToMb(SdTotal)) + ' MB', // kb_to_mb(SdTotal
        SdFree: String(kbToMb(SdFree)) + ' MB',
        UsbMount: findSelectOptionOrDefault(booleanSelectOption, UsbMount),
        UsbTotal: String(kbToMb(UsbTotal)) + ' MB',
        UsbFree: String(kbToMb(UsbFree)) + ' MB',
        StartTime: StartTime ? htmlInputDatetimeFormatter(StartTime).toString() : '',
        BoardCount: findSelectOptionOrDefault(systemBoardCountOptions, BoardCount),
        Board1,
        Board2,
        Product: Product.toString(),
      })
    }
  }, [data])

  // Define the actions for the breadcrumbs bar
  const breadcrumbsActions: IActionsButton[] = [
    {
      icon: editIcon,
      text: t`Edit`,
      link: routeProperty.systemEdit.path(),
    },
  ]

  return (
    <Page>
      {/* Render the breadcrumbs bar with the defined actions */}
      <Breadcrumbs breadcrumbsActions={breadcrumbsActions} />
      <div className="pt-2" />
      <FormContainer sameHeight>
        <SystemInfoFieldFrom formData={formData} isLoading={isLoading} />
        <SystemInfoSpaceFrom formData={formData} isLoading={isLoading} />
        <SystemInfoSDSpaceFrom formData={formData} isLoading={isLoading} />
        <SystemInfoUSBSpaceFrom formData={formData} isLoading={isLoading} />
        <SystemInfoIOBoardFrom formData={formData} isLoading={isLoading} />
      </FormContainer>
    </Page>
  )
}

export default SystemInfo
