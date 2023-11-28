import { homeApi } from '../api/urls'
import classNames from 'classnames'
import Page from '../components/HOC/Page'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import DashboardCards from '../components/pages/dashboard/DashboardCards'
import DashboardList from '../components/pages/dashboard/DashboardList'
import useAuth from '../hooks/useAuth'
import useSWR from 'swr'
import { IListServerResponse } from '../types/pages/common'

import { ISystemStatus } from '../types/pages/dashboard'
import t from '../utils/translator'

export default function Home() {
  const { isLoading, data } = useSWR<IListServerResponse<ISystemStatus>>(homeApi.dashboard)
  const { layout } = useAuth()

  return (
    <Page title={t`Information`}>
      <Breadcrumbs
        pageTitle={t`Information`}
        pageRoutes={[
          {
            href: '/',
            text: t`Information`,
          },
        ]}
      />
      {/* <div className="px-4 md:px-3"> */}
      <div
        className={classNames(
          'grid gap-4',
          layout === 'Master' && 'lg:grid-cols-2'
          // layout === 'Master' ? 'md:py-7' : 'md:py-3'
        )}
      >
        <DashboardCards data={data?.data} />
        {layout === 'Master' && (
          <DashboardList isLoading={isLoading} data={data?.data.DeviceStatus} />
        )}
      </div>
      {/* </div> */}
    </Page>
  )
}
