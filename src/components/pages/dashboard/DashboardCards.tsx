import ProgressBar from 'components/atomic/ProgressBar'
import useClock from 'hooks/useClock'
import { ISystemStatus } from 'types/pages/dashboard'
import Icon, {
  boardIcon,
  idCard,
  licenseIcon,
  macIcon,
  resetIcon,
  sdCardIcon,
  soapIcon,
  systemIcon,
  timeIcon,
  usbIcon,
} from 'utils/icons'

type IProps = {
  data?: ISystemStatus
}

function DashboardCards({ data }: IProps) {
  const time = useClock({
    date: data?.current_time,
  })
  return (
    // <div className="bg-[#E9E9E9] rounded-xl">
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="grid sm:grid-cols-2 ">
        <div className="px-8 py-4 space-y-6 md:px-12 md:py-8">
          <div className="flex items-center justify-start gap-4 md:gap-8">
            <Icon icon={systemIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">System Name</h1>
              <p className="text-sm">{data?.system_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={soapIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">System Space</h1>
              <div className="py-1">
                <ProgressBar progress={data?.system_space.used || 0} />
              </div>
              {/* <p className="text-sm">
                                {data?.system_space.used} /
                                {data?.system_space.total}
                            </p> */}
            </div>
          </div>
        </div>
        <div className="px-8 py-4 space-y-6 md:px-12 md:py-8">
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={usbIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">USB M. Space</h1>
              <div className="py-1">
                <ProgressBar progress={data?.usb_space.used || 0} />
              </div>
              {/* <p className="text-sm">
                                {data?.usb_space.used} / {data?.usb_space.total}
                            </p> */}
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={sdCardIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">SD C. Space</h1>
              <div className="py-1">
                <ProgressBar progress={data?.sd_space.used || 0} />
              </div>
              {/* <p className="text-sm">
                                {data?.sd_space.used} / {data?.sd_space.total}
                            </p> */}
            </div>
          </div>
        </div>
        <div className="px-8 py-4 space-y-6 md:px-12 md:py-8">
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={timeIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">Current Time</h1>
              {/* <p className="text-sm">
                                {formatDate(data?.current_time || "")}
                                {time}
                            </p> */}

              <p
                className="text-sm"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: time }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={macIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">MAC</h1>
              <p className="text-sm">{data?.mac}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={idCard} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">Address</h1>
              <p className="text-sm">{data?.ip_address}</p>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 space-y-6 md:px-12 md:py-8">
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={licenseIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">License</h1>
              <p className="text-sm">{data?.license}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={resetIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">Version</h1>
              <p className="text-sm">{data?.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon={boardIcon} className="w-8 h-8 md:w-9 md:h-9 text-primary" />
            <div className="text-start">
              <h1 className="text-sm font-bold">Board</h1>
              <p className="text-sm">{data?.board}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCards
