import { sendPostRequest } from '../../../../api/swrConfig'
import {
  cameraApi,
  contLockApi,
  doorApi,
  elevatorApi,
  inputApi,
  facegateApi,
  locksetApi,
  nodeApi,
  outputApi,
  relayApi,
  threatApi,
  triggerApi,
  intercomApi,
} from '../../../../api/urls'
import classNames from 'classnames'
import IconButton from '../../../../components/atomic/IconButton'
import useAlert from '../../../../hooks/useAlert'
import useSWRMutation from 'swr/mutation'
import { ITableAction } from '../../../../types/components/table'
import { IFloorDashboardItems } from '../../../../types/pages/floorDashboard'
import {
  activeIcon,
  applyIcon,
  autoIcon,
  dbInitializeIcon,
  dbSyncIcon,
  dbUpdateIcon,
  disableIcon,
  elevatedIcon,
  guardedIcon,
  highIcon,
  inactiveIcon,
  instantRecordIcon,
  lockDownIcon,
  lockIcon,
  lowIcon,
  mUnlockIcon,
  normalIcon,
  passthruIcon,
  probeIcon,
  rebootIcon,
  recordOffIcon,
  recordOnIcon,
  serveIcon,
  triggerIcon,
  unlockIcon,
} from '../../../../utils/icons'
import t from '../../../../utils/translator'

interface IProps {
  selectedDeviceType: keyof IFloorDashboardItems
  selected: string[]
  reloadButtonData: () => void
}

const DeviceActions = ({ selectedDeviceType, selected, reloadButtonData: mutate }: IProps) => {
  // hook to open alert dialog modal
  const { openAlertDialogWithPromise } = useAlert()

  // Node action -------------------------------------------------------------------
  // Define the mutation function to DB sync all selected
  const { trigger: DBSyncTrigger } = useSWRMutation(nodeApi.dbSync, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleDBSync = () => {
    if (selected.length) {
      const handleDBSyncTrigger = () =>
        DBSyncTrigger({
          NodeNo: selected,
        })

      openAlertDialogWithPromise(
        handleDBSyncTrigger,
        { success: t`DB Sync successful` },
        t('Do you really want to DB Sync of selected nodes?')
      )
    }
  }

  // Define the mutation function to reboot all selected nodes
  const { trigger: rebootTrigger } = useSWRMutation(nodeApi.reboot, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleReboot = () => {
    if (selected.length) {
      const handleRebootTrigger = () =>
        rebootTrigger({
          NodeNo: selected,
        })

      openAlertDialogWithPromise(
        handleRebootTrigger,
        { success: t`Reboot successful` },
        t('Do you really want to reboot the selected nodes?')
      )
    }
  }

  // Door Actions --------------------------------------------------------------
  // Define the mutation function to update doorStatus (Normal, Passthru, Lockdown, LockdownWithREX) all selected doors
  const { trigger: doorStatusTrigger } = useSWRMutation(doorApi.doorStatus, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleDoorStatus = (doorStatus: 'Normal' | 'Passthru' | 'Lockdown' | 'LockdownWithREX') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        doorStatusTrigger({
          DoorNos: selected,
          Status: doorStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Door ${doorStatus} Status Update successful` },
        t`Do you really want to update door status to ${doorStatus} for the selected doors?`
      )
    }
  }

  // Define the mutation function to update lockStatus (Lock, Unlock, MUnlock) all selected doors
  const { trigger: lockStatusTrigger } = useSWRMutation(doorApi.lockStatus, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleLockStatus = (lockStatus: 'Lock' | 'Unlock' | 'MUnlock') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        lockStatusTrigger({
          DoorNos: selected,
          Lock: lockStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Door ${lockStatus} Status Update successful` },
        t`Do you really want to update door lock status to ${lockStatus} for the selected doors?`
      )
    }
  }

  // input action --------------------------------------------------------------

  // Define the mutation function to probe all selected nodes
  const { trigger: probeTrigger } = useSWRMutation(inputApi.probe, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleProbe = () => {
    if (selected.length) {
      const handleProbeTrigger = () =>
        probeTrigger({
          InputNos: selected,
        })

      openAlertDialogWithPromise(
        handleProbeTrigger,
        { success: t`Probe successful` },
        t('Do you really want to Probe the selected inputs?')
      )
    }
  }

  // output action --------------------------------------------------------
  // Define the mutation function to update output status (Inactive, Active, Auto) all selected output
  const { trigger: outputStatusTrigger } = useSWRMutation(outputApi.action, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleOutputStatus = (outputStatus: 'Inactive' | 'Active' | 'Auto') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        outputStatusTrigger({
          OutputNos: selected,
          Action: outputStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Output ${outputStatus} Status Update successful` },
        t`Do you really want to update output status to ${outputStatus} for the selected output?`
      )
    }
  }

  // elevator action ------------------------------------------------------

  // Define the mutation function to update elevator status (Normal, Passthru, Lockdown) all selected elevator
  const { trigger: elevatorStatusTrigger } = useSWRMutation(elevatorApi.action, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleElevatorStatus = (elevatorStatus: 'Normal' | 'Passthru' | 'Lockdown') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        elevatorStatusTrigger({
          ElevatorNos: selected,
          Action: elevatorStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Elevator ${elevatorStatus} Status Update successful` },
        t`Do you really want to update elevator status to ${elevatorStatus} for the selected elevator?`
      )
    }
  }

  // relay action ---------------------------------------------------------

  // Define the mutation function to update relay status (Inactive, Active, Auto) all selected relay
  const { trigger: relayStatusTrigger } = useSWRMutation(relayApi.action, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleRelayStatus = (relayStatus: 'Inactive' | 'Active' | 'Auto') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        relayStatusTrigger({
          RelayNos: selected,
          Action: relayStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Relay ${relayStatus} Status Update successful` },
        t`Do you really want to update relay status to ${relayStatus} for the selected relay?`
      )
    }
  }

  // camera action -------------------------------------------------------
  // Define the mutation function to update camera state (Inactive, Active, Auto) all selected Camera
  const { trigger: cameraListActionTrigger } = useSWRMutation(cameraApi.action, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleCameraStatus = (cameraStatus: 'Inactive' | 'Active' | 'Auto') => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        cameraListActionTrigger({
          CameraNos: selected,
          Action: cameraStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Camera ${cameraStatus} Status Update successful` },
        t`Do you really want to update camera status to ${cameraStatus} for the selected camera?`
      )
    }
  }

  // lockset action -------------------------------------------------------

  // Define the mutation function to update list state (Lock, Unlock, M-Unlock Update, Initialize ,Setup) all selected lockset
  const { trigger: locksetListActionTrigger } = useSWRMutation(locksetApi.action, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleLocksetStatus = (
    lockStatus: 'Lock' | 'Unlock' | 'M-Unlock' | 'Update' | 'Initialize' | 'Setup'
  ) => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        locksetListActionTrigger({
          LocksetNos: selected,
          Action: lockStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Lockset ${lockStatus} Status Update successful` },
        t`Do you really want to update lockset status to ${lockStatus} for the selected lockset?`
      )
    }
  }

  // facegate actions ---------------------------------------------------------

  // Define the mutation function to update list state (Lock, Unlock, M-Unlock Update, Initialize ,Setup) all selected facegate
  const { trigger: facegateListActionTrigger } = useSWRMutation(
    facegateApi.action,
    sendPostRequest,
    {
      onSuccess: () => {
        mutate()
      },
    }
  )

  const handleFacegateLockStatus = (
    lockStatus: 'Lock' | 'Unlock' | 'M-Unlock' | 'Update' | 'Initialize' | 'Setup'
  ) => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        facegateListActionTrigger({
          FacegateNos: selected,
          Action: lockStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Facegate ${lockStatus} Status Update successful` },
        t`Do you really want to update facegate status to ${lockStatus} for the selected facegate?`
      )
    }
  }

  // intercom actions ---------------------------------------------------------

  // Define the mutation function to update list state (Lock, Unlock, M-Unlock Update, Initialize ,Setup) all selected facegate
  const { trigger: intercomListActionTrigger } = useSWRMutation(
    intercomApi.action,
    sendPostRequest,
    {
      onSuccess: () => {
        mutate()
      },
    }
  )

  const handleIntercomLockStatus = (
    lockStatus: 'Lock' | 'Unlock' | 'M-Unlock' | 'Update' | 'Initialize' | 'Setup'
  ) => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        intercomListActionTrigger({
          IntercomNos: selected,
          Action: lockStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Intercom ${lockStatus} Status Update successful` },
        t`Do you really want to update intercom status to ${lockStatus} for the selected intercom?`
      )
    }
  }

  // contlock action ------------------------------------------------

  // Define the mutation function to update list state (Lock, Unlock, M-Unlock Update, Initialize ,Setup) all selected contLock
  const { trigger: contlockListActionTrigger } = useSWRMutation(
    contLockApi.action,
    sendPostRequest,
    {
      onSuccess: () => {
        mutate()
      },
    }
  )

  const handleContLockLockStatus = (
    lockStatus: 'Lock' | 'Unlock' | 'M-Unlock' | 'Update' | 'Initialize' | 'Setup'
  ) => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        contlockListActionTrigger({
          ContLockNos: selected,
          Action: lockStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`ContLock ${lockStatus} Status Update successful` },
        t`Do you really want to update contLock status to ${lockStatus} for the selected contLock?`
      )
    }
  }

  // trigger action ----------------------------------------------

  // Define the mutation function to update trigger status triggers all selected triggers
  const { trigger: triggerStatusTrigger } = useSWRMutation(triggerApi.trigger, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleTriggerStatus = () => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        triggerStatusTrigger({
          TriggerNos: selected,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Trigger Status Update successful` },
        t`Do you really want to update trigger?`
      )
    }
  }

  // threat action --------------------------------------------------

  // Define the mutation function to update threat status (Disable, Low, Guarded, Elevated, High, Severe) all selected threat
  const { trigger: threatStatusTrigger } = useSWRMutation(threatApi.action, sendPostRequest, {
    onSuccess: () => {
      mutate()
    },
  })

  const handleThreatStatus = (
    relayStatus: 'Disable' | 'Low' | 'Guarded' | 'Elevated' | 'High' | 'Severe'
  ) => {
    if (selected.length) {
      const handleStatusTrigger = () =>
        threatStatusTrigger({
          ThreatNos: selected,
          Action: relayStatus,
        })

      openAlertDialogWithPromise(
        handleStatusTrigger,
        { success: t`Threat ${relayStatus} Status Update successful` },
        t`Do you really want to update threat status to ${relayStatus} for the selected threat?`
      )
    }
  }

  const tableActionsWithKeyName: { [key in keyof IFloorDashboardItems]: ITableAction[] } = {
    Node: [
      {
        icon: dbSyncIcon,
        tooltip: 'DB Sync',
        onClick: handleDBSync,
      },
      {
        icon: rebootIcon,
        tooltip: 'Reboot',
        onClick: handleReboot,
      },
    ],
    Door: [
      {
        icon: applyIcon,
        tooltip: 'Normal',
        onClick: () => handleDoorStatus('Normal'),
      },
      {
        icon: passthruIcon,
        tooltip: 'Passthru',
        onClick: () => handleDoorStatus('Passthru'),
      },
      {
        icon: lockDownIcon,
        tooltip: 'Lockdown',
        onClick: () => handleDoorStatus('Lockdown'),
      },
      {
        icon: lockIcon,
        tooltip: 'Lock',
        onClick: () => handleLockStatus('Lock'),
      },
      {
        icon: unlockIcon,
        tooltip: 'Unlock',
        onClick: () => handleLockStatus('Unlock'),
      },
      {
        icon: mUnlockIcon,
        tooltip: 'M-Unlock',
        onClick: () => handleLockStatus('MUnlock'),
      },
    ],
    Region: [
      // table actions for Region type
    ],
    Input: [
      // table actions for Input type
      {
        icon: probeIcon,
        tooltip: 'Probe',
        onClick: handleProbe,
      },
    ],
    Output: [
      // table actions for Output type
      {
        icon: inactiveIcon,
        tooltip: 'Inactive',
        onClick: () => handleOutputStatus('Inactive'),
      },
      {
        icon: activeIcon,
        tooltip: 'Active',
        onClick: () => handleOutputStatus('Active'),
      },
      {
        icon: autoIcon,
        tooltip: 'Auto',
        onClick: () => handleOutputStatus('Auto'),
      },
    ],
    Elevator: [
      // table actions for Elevator type
      {
        icon: normalIcon,
        tooltip: 'Normal',
        onClick: () => handleElevatorStatus('Normal'),
      },
      {
        icon: passthruIcon,
        tooltip: 'Passthru',
        onClick: () => handleElevatorStatus('Passthru'),
      },
      {
        icon: lockDownIcon,
        tooltip: 'Lockdown',
        onClick: () => handleElevatorStatus('Lockdown'),
      },
    ],
    Relay: [
      // table actions for Relay type
      {
        icon: inactiveIcon,
        tooltip: 'Inactive',
        onClick: () => handleRelayStatus('Inactive'),
      },
      {
        icon: activeIcon,
        tooltip: 'Active',
        onClick: () => handleRelayStatus('Active'),
      },
      {
        icon: autoIcon,
        tooltip: 'Auto',
        onClick: () => handleRelayStatus('Auto'),
      },
    ],
    Camera: [
      // table actions for Camera type
      {
        icon: recordOffIcon,
        tooltip: 'Record Off',
        onClick: () => handleCameraStatus('Inactive'),
      },
      {
        icon: recordOnIcon,
        tooltip: 'Record On',
        onClick: () => handleCameraStatus('Active'),
      },
      {
        icon: instantRecordIcon,
        tooltip: 'Instant Record',
        onClick: () => handleCameraStatus('Auto'),
      },
    ],
    Nvr: [
      // table actions for Nvr type
    ],
    Channel: [
      // table actions for Channel type
    ],
    Gateway: [
      // table actions for Gateway type
    ],
    Lockset: [
      // table actions for Lockset type
      {
        icon: lockIcon,
        tooltip: 'Lock',
        onClick: () => handleLocksetStatus('Lock'),
      },
      {
        icon: unlockIcon,
        tooltip: 'Unlock',
        onClick: () => handleLocksetStatus('Unlock'),
      },
      {
        icon: mUnlockIcon,
        tooltip: 'M-Unlock',
        onClick: () => handleLocksetStatus('M-Unlock'),
      },
      {
        icon: dbUpdateIcon,
        tooltip: 'DB Update',
        onClick: () => handleLocksetStatus('Update'),
      },
      {
        icon: dbInitializeIcon,
        tooltip: 'DB Initialize',
        onClick: () => handleLocksetStatus('Initialize'),
      },
    ],
    Facegate: [
      // table actions for Facegate type
      {
        icon: lockIcon,
        tooltip: 'Lock',
        onClick: () => handleFacegateLockStatus('Lock'),
      },
      {
        icon: unlockIcon,
        tooltip: 'Unlock',
        onClick: () => handleFacegateLockStatus('Unlock'),
      },
      {
        icon: mUnlockIcon,
        tooltip: 'M-Unlock',
        onClick: () => handleFacegateLockStatus('M-Unlock'),
      },
      {
        icon: dbUpdateIcon,
        tooltip: 'DB Update',
        onClick: () => handleFacegateLockStatus('Update'),
      },
      {
        icon: dbInitializeIcon,
        tooltip: 'DB Initialize',
        onClick: () => handleFacegateLockStatus('Initialize'),
      },
    ],
    Subnode: [
      // table actions for Subnode type
    ],
    Reader: [
      // table actions for Reader type
    ],
    ContGate: [
      // table actions for ContGate type
    ],
    ContLock: [
      // table actions for ContLock type
      {
        icon: lockIcon,
        tooltip: 'Lock',
        onClick: () => handleContLockLockStatus('Lock'),
      },
      {
        icon: unlockIcon,
        tooltip: 'Unlock',
        onClick: () => handleContLockLockStatus('Unlock'),
      },
      {
        icon: mUnlockIcon,
        tooltip: 'M-Unlock',
        onClick: () => handleContLockLockStatus('M-Unlock'),
      },
      {
        icon: dbUpdateIcon,
        tooltip: 'DB Update',
        onClick: () => handleContLockLockStatus('Update'),
      },
      {
        icon: dbInitializeIcon,
        tooltip: 'DB Initialize',
        onClick: () => handleContLockLockStatus('Initialize'),
      },
    ],

    Intercom: [
      // table actions for Intercom type
      {
        icon: lockIcon,
        tooltip: 'Lock',
        onClick: () => handleIntercomLockStatus('Lock'),
      },
      {
        icon: unlockIcon,
        tooltip: 'Unlock',
        onClick: () => handleIntercomLockStatus('Unlock'),
      },
      {
        icon: mUnlockIcon,
        tooltip: 'M-Unlock',
        onClick: () => handleIntercomLockStatus('M-Unlock'),
      },
      {
        icon: dbUpdateIcon,
        tooltip: 'DB Update',
        onClick: () => handleIntercomLockStatus('Update'),
      },
      {
        icon: dbInitializeIcon,
        tooltip: 'DB Initialize',
        onClick: () => handleIntercomLockStatus('Initialize'),
      },
    ],
    Trigger: [
      // table actions for Trigger type
      {
        icon: triggerIcon,
        tooltip: 'Trigger',
        onClick: handleTriggerStatus,
      },
    ],
    Threat: [
      // table actions for Threat type
      {
        icon: disableIcon,
        tooltip: 'Disable',
        onClick: () => handleThreatStatus('Disable'),
      },
      {
        icon: lowIcon,
        tooltip: 'Low',
        onClick: () => handleThreatStatus('Low'),
      },
      {
        icon: guardedIcon,
        tooltip: 'Guarded',
        onClick: () => handleThreatStatus('Guarded'),
      },
      {
        icon: elevatedIcon,
        tooltip: 'Elevated',
        onClick: () => handleThreatStatus('Elevated'),
      },
      {
        icon: highIcon,
        tooltip: 'High',
        onClick: () => handleThreatStatus('High'),
      },
      {
        icon: serveIcon,
        tooltip: 'Severe',
        onClick: () => handleThreatStatus('Severe'),
      },
    ],
  }

  const tableActions = tableActionsWithKeyName[selectedDeviceType]

  return (
    <div className="w-full h-10">
      <div className="overflow-x-scroll first-letter scrollbar-hide md:overflow-visible">
        <div className={classNames('flex items-center gap-3 md:gap-4 mr-3 sm:mr-3.5 md:mr-4')}>
          {tableActions?.map((button) => (
            <IconButton
              key={button.tooltip}
              icon={button.icon}
              tooltip={button.tooltip}
              color={button.color}
              iconClass={button.iconClass}
              disabled={selected.length ? button.disabled : true}
              disabledText="Select a button"
              link={button.link}
              onClick={button.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeviceActions
