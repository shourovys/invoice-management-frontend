import { sendPostRequest } from '../../api/swrConfig'
import { maintenanceActionApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import Button from '../../components/atomic/Button'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import routeProperty from '../../routes/routeProperty'
import useSWRMutation from 'swr/mutation'
import { ISingleServerResponse, ISystemSuccessResult } from '../../types/pages/common'
import Icon, { defaultIcon, factoryDefaultIcon, logResetIcon } from '../../utils/icons'
import { addSuccessfulToast } from '../../utils/toast'
import t from '../../utils/translator'

function Default() {
  const { trigger } = useSWRMutation(maintenanceActionApi.add, sendPostRequest, {
    onSuccess: (data: ISingleServerResponse<ISystemSuccessResult>) => {
      addSuccessfulToast(`${data.data.message} Action Successful`)
    },
  })

  return (
    <Page title={t`Default`}>
      <Breadcrumbs
        pageRoutes={[
          {
            href: routeProperty.default.path(),
            text: t`Default`,
          },
        ]}
      />
      <div className="pt-2" />
      <div className="flex items-center justify-center gap-4 py-4 md:py-6">
        <Button
          size="large"
          color="danger"
          onClick={() => trigger({ Action: 'default', Type: 'factory_default' })}
        >
          <Icon icon={factoryDefaultIcon} />
          <span>Factory Default</span>
        </Button>
        <Button
          size="large"
          color="danger"
          onClick={() => trigger({ Action: 'default', Type: 'default' })}
        >
          <Icon icon={defaultIcon} />
          <span>Default</span>
        </Button>
        <Button
          size="large"
          color="danger"
          onClick={() => trigger({ Action: 'default', Type: 'log_reset' })}
        >
          <Icon icon={logResetIcon} />
          <span>Log Reset</span>
        </Button>
      </div>
    </Page>
  )
}

export default Default
