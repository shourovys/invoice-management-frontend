import { sendPostRequest } from '../../api/swrConfig'
import { maintenanceActionApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import Button from '../../components/atomic/Button'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import routeProperty from '../../routes/routeProperty'
import useSWRMutation from 'swr/mutation'
import { ISingleServerResponse, ISystemSuccessResult } from '../../types/pages/common'
import Icon, { rebootWithoutSavingDataIcon, saveDataAndRebootIcon } from '../../utils/icons'
import { addSuccessfulToast } from '../../utils/toast'
import t from '../../utils/translator'

function Reboot() {
  const { trigger } = useSWRMutation(maintenanceActionApi.add, sendPostRequest, {
    onSuccess: (data: ISingleServerResponse<ISystemSuccessResult>) => {
      addSuccessfulToast(`${data.data.message} Action Successful`)
    },
  })

  return (
    <Page title={t`Reboot`}>
      <Breadcrumbs
        pageRoutes={[
          {
            href: routeProperty.reboot.path(),
            text: t`Reboot`,
          },
        ]}
      />
      <div className="pt-2" />
      <div className="flex items-center justify-center gap-4 py-4 md:py-6">
        <Button
          size="large"
          color="danger"
          onClick={() => trigger({ Action: 'reboot', Type: 'save_data_and_reboot' })}
        >
          <Icon icon={saveDataAndRebootIcon} />
          <span>{t`Save Data and Reboot`}</span>
        </Button>
        <Button
          size="large"
          color="danger"
          onClick={() => trigger({ Action: 'reboot', Type: 'reboot_without_saving_data' })}
        >
          <Icon icon={rebootWithoutSavingDataIcon} />
          <span>{t`Reboot without Savaging Data`}</span>
        </Button>
      </div>
    </Page>
  )
}

export default Reboot
