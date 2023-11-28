import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { homeApi } from '../../api/urls'
import Page from '../../components/HOC/Page'
import TableContainer from '../../components/HOC/style/table/TableContainer'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import PlaybackTableToolbar from '../../components/pages/playback/CameraTableToolbar'
import CameraTimeSelector from '../../components/pages/playback/CameraTimeSelector'
import PlaybackViewBox from '../../components/pages/playback/PlaybackViewBox'
import { useDefaultChannelOption } from '../../hooks/useDefaultOption'
import routeProperty from '../../routes/routeProperty'
import { THandleFilterInputChange } from '../../types/components/common'
import { ICommandResponse } from '../../types/pages/common'
import { IPlaybackFilters } from '../../types/pages/playback'
import { promiseToast } from '../../utils/toast'
import t from '../../utils/translator'

function Playback() {
  // apply property use for apply filter. filter will apply when apply is true
  const initialFilterState: IPlaybackFilters = {
    Apply: false,
    Channel: null,
    Time: null,
    Stream: null,
  }
  // state to store the filter values
  const [filterState, setFilterState] = useState(initialFilterState)
  const [selectedTimeDates, setSelectedTimeDates] = useState<string[]>([])
  const [selectedRecordedTime, setSelectedRecordedTime] = useState<string>('')

  // State to store the selected hour and minute
  const [selectedHour, setSelectedHour] = useState<string>('')
  const [selectedMinute, setSelectedMinute] = useState<string>('')

  // Set default Channel
  useDefaultChannelOption<IPlaybackFilters>(setFilterState)

  // ref to store the applied filter values
  const filterStateRef = useRef(filterState)

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // apply will false in every filter state change
    setFilterState((state) => ({ ...state, Apply: false, [name]: value }))
  }

  const handleFilterInputChangeWithApply: THandleFilterInputChange = async (name, value) => {
    // apply will true in every filter state change
    setFilterState((state) => ({
      ...state,
      Apply: false,
      [name]: value,
    }))
    filterStateRef.current = {
      ...filterState,
      Apply: false,
      [name]: value,
    }
    handleFilterInputChange('Apply', true)
  }

  const { isLoading, data, mutate, isValidating } = useSWR<ICommandResponse<string[]>>(
    filterState.Channel ? homeApi.playback(`ChannelNo=${filterState.Channel.value}`) : null
  )

  const handleReloadData = () => {
    promiseToast(mutate(), { success: `Playback Reload successful` })
  }

  useEffect(() => {
    if (data?.cgi?.data?.length) {
      const lastDate = data?.cgi.data[data?.cgi.data.length - 1].split(' ')[0]
      handleFilterInputChange('Time', {
        label: lastDate,
        value: lastDate,
      })
    }
  }, [data])

  useEffect(() => {
    if (data?.cgi?.data?.length) {
      const recordedDates =
        data?.cgi?.data?.filter((recordedTime) =>
          recordedTime.includes(filterState.Time?.value || '')
        ) || []
      setSelectedTimeDates(recordedDates)
      const firstRecordedTime = recordedDates[0]
      if (firstRecordedTime) {
        setSelectedHour(firstRecordedTime.slice(11, 13))
        setSelectedMinute(firstRecordedTime.slice(14, 16))
      }
    }
  }, [filterState.Time?.value])

  useEffect(() => {
    if (selectedTimeDates.length) {
      const firstRecordedTime = selectedTimeDates.find((recordedTime) =>
        recordedTime.includes(`${filterState.Time?.value} ${selectedHour}`)
      )
      if (firstRecordedTime) {
        setSelectedMinute(firstRecordedTime.slice(14, 16))
      }
    }
  }, [selectedHour])

  const isNotFound = !data?.cgi?.data?.length && !isLoading && !isValidating

  return (
    <Page>
      <Breadcrumbs
        pageRoutes={[
          {
            href: routeProperty.playback.path(),
            text: t`Playback`,
          },
        ]}
      />
      <TableContainer>
        <PlaybackTableToolbar
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
          filterState={filterState}
          handleInputChange={handleFilterInputChangeWithApply}
          recordedDates={data?.cgi.data || []}
          selectedDateRecordedTimes={selectedTimeDates}
          handleReloadData={handleReloadData}
          isLoading={false}
        />
        <div className="hidden lg:block">
          <CameraTimeSelector
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
            selectedMinute={selectedMinute}
            setSelectedMinute={setSelectedMinute}
            selectedDateRecordedTimes={selectedTimeDates}
            selectedRecordedTime={selectedRecordedTime}
            setSelectedRecordedTime={setSelectedRecordedTime}
          />
        </div>
        <div className="max-w-5xl mx-auto">
          {isNotFound ? (
            <div className="flex items-center justify-center h-64">
              <h1 className="text-2xl font-semibold text-gray-500">{t('No Record Found!')}</h1>
            </div>
          ) : (
            <PlaybackViewBox
              name={filterState.Channel?.label}
              deviceId={filterState.Channel?.value}
              setSelectedHour={setSelectedHour}
              setSelectedMinute={setSelectedMinute}
              selectedDateRecordedTimes={selectedTimeDates}
              selectedRecordedTime={selectedRecordedTime}
              setSelectedRecordedTime={setSelectedRecordedTime}
              isLoading={isLoading}
            />
          )}
        </div>
      </TableContainer>
    </Page>
  )
}

export default Playback
