import classNames from 'classnames'
import TableData from 'components/HOC/style/table/TableData'
import TableNoData from 'components/common/table/TableNoData'
import TableBodyLoading from 'components/loading/table/TableBodyLoading'
import { IDeviceStatuses } from 'types/pages/dashboard'
import Icon, {
  cameraIcon,
  doorIcon,
  elevatorIcon,
  facegateIcon,
  gatewayIcon,
  inputIcon,
  locksetIcon,
  nodeIcon,
  outputIcon,
  regionIcon,
  relayIcon,
  subnodeIcon,
} from 'utils/icons'

const TABLE_HEAD = [
  { id: 'icon', label: '', align: 'left' },
  { id: 'device', label: 'Device', align: 'left' },
  { id: 'total', label: 'Total' },
  { id: 'online', label: 'Online' },
  { id: 'offline', label: 'Offline' },
  { id: 'normal', label: 'Normal' },
  { id: 'alert', label: 'Alert' },
]

type IProps = {
  data?: IDeviceStatuses
  isLoading: boolean
}

function DashboardList({ data, isLoading }: IProps) {
  const isNotFound = !data && !isLoading

  return (
    <div className="flex flex-col overflow-y-hidden ">
      <div className="overflow-x-auto overflow-y-hidden sm:mx-0.5 lg:mx-0.5 rounded-xl border border-gray-200">
        <div className="min-w-full">
          <div className="overflow-x-auto ">
            <table className="min-w-full">
              <thead className="bg-[#F0F1F3]">
                <tr className="">
                  {TABLE_HEAD.map((item) => (
                    <th
                      key={item.id}
                      scope="col"
                      className={classNames(
                        'px-3 py-4 text-sm font-medium whitespace-nowrap',
                        item.align === 'left' && 'text-left'
                      )}
                    >
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!isLoading && (
                  <>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={nodeIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Node</TableData>
                      <TableData>{data?.node.total}</TableData>
                      <TableData>{data?.node.online}</TableData>
                      <TableData>{data?.node.offline}</TableData>
                      <TableData>{data?.node.normal}</TableData>
                      <TableData>{data?.node.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={doorIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Door</TableData>
                      <TableData>{data?.door.total}</TableData>
                      <TableData>{data?.door.online}</TableData>
                      <TableData>{data?.door.offline}</TableData>
                      <TableData>{data?.door.normal}</TableData>
                      <TableData>{data?.door.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={regionIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Region</TableData>
                      <TableData>{data?.region.total}</TableData>
                      <TableData>{data?.region.online}</TableData>
                      <TableData>{data?.region.offline}</TableData>
                      <TableData>{data?.region.normal}</TableData>
                      <TableData>{data?.region.alert}</TableData>
                    </tr>

                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={inputIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Input</TableData>
                      <TableData>{data?.input.total}</TableData>
                      <TableData>{data?.input.online}</TableData>
                      <TableData>{data?.input.offline}</TableData>
                      <TableData>{data?.input.normal}</TableData>
                      <TableData>{data?.input.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{
                        height: 42,
                      }}
                    >
                      <TableData>
                        <Icon icon={outputIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Output</TableData>
                      <TableData>{data?.output.total}</TableData>
                      <TableData>{data?.output.online}</TableData>
                      <TableData>{data?.output.offline}</TableData>
                      <TableData>{data?.output.normal}</TableData>
                      <TableData>{data?.output.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={elevatorIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Elevator</TableData>
                      <TableData>{data?.elevator.total}</TableData>
                      <TableData>{data?.elevator.online}</TableData>
                      <TableData>{data?.elevator.offline}</TableData>
                      <TableData>{data?.elevator.normal}</TableData>
                      <TableData>{data?.elevator.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={relayIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Relay</TableData>
                      <TableData>{data?.relay.total}</TableData>
                      <TableData>{data?.relay.online}</TableData>
                      <TableData>{data?.relay.offline}</TableData>
                      <TableData>{data?.relay.normal}</TableData>
                      <TableData>{data?.relay.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={cameraIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Camera</TableData>
                      <TableData>{data?.camera.total}</TableData>
                      <TableData>{data?.camera.online}</TableData>
                      <TableData>{data?.camera.offline}</TableData>
                      <TableData>{data?.camera.normal}</TableData>
                      <TableData>{data?.camera.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={gatewayIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Gateway</TableData>
                      <TableData>{data?.gateway.total}</TableData>
                      <TableData>{data?.gateway.online}</TableData>
                      <TableData>{data?.gateway.offline}</TableData>
                      <TableData>{data?.gateway.normal}</TableData>
                      <TableData>{data?.gateway.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={locksetIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Lockset</TableData>
                      <TableData>{data?.lockset.total}</TableData>
                      <TableData>{data?.lockset.online}</TableData>
                      <TableData>{data?.lockset.offline}</TableData>
                      <TableData>{data?.lockset.normal}</TableData>
                      <TableData>{data?.lockset.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={facegateIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Facegate</TableData>
                      <TableData>{data?.facegate.total}</TableData>
                      <TableData>{data?.facegate.online}</TableData>
                      <TableData>{data?.facegate.offline}</TableData>
                      <TableData>{data?.facegate.normal}</TableData>
                      <TableData>{data?.facegate.alert}</TableData>
                    </tr>
                    <tr
                      className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                      style={{ height: 42 }}
                    >
                      <TableData>
                        <Icon icon={subnodeIcon} className="text-sm md:text-l text-primary" />
                      </TableData>
                      <TableData align="left">Subnode</TableData>
                      <TableData>{data?.subnode.total}</TableData>
                      <TableData>{data?.subnode.online}</TableData>
                      <TableData>{data?.subnode.offline}</TableData>
                      <TableData>{data?.subnode.normal}</TableData>
                      <TableData>{data?.subnode.alert}</TableData>
                    </tr>
                    {/* <tr
                                            className="bg-white border-b border-gray-200 custom_transition group border-x border-x-white hover:border-x-gray-200 hover:bg-gray-100 last:border-b-0"
                                            style={{ height: 42 }}
                                        >
                                            <TableData>
                                                <Icon
                                                    icon={contlockIcon}
                                                    className="text-sm md:text-l text-primary"
                                                />
                                            </TableData>
                                            <TableData align="left">
                                                ContLock
                                            </TableData>
                                            <TableData>
                                                {data?.contlock.total}
                                            </TableData>
                                            <TableData>
                                                {data?.contlock.online}
                                            </TableData>
                                            <TableData>
                                                {data?.contlock.offline}
                                            </TableData>
                                            <TableData>
                                                {data?.contlock.normal}
                                            </TableData>
                                            <TableData>
                                                {data?.contlock.alert}
                                            </TableData>
                                        </tr> */}
                  </>
                )}
              </tbody>
            </table>
            <TableBodyLoading
              isLoading={isLoading}
              tableRowPerPage={12}
              tableRowHeight={42}
              sideBorder={false}
            />
            <TableNoData isNotFound={isNotFound} tableRowPerPage={12} tableRowHeight={42} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardList
