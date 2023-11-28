import { fetcher } from '../../../api/swrConfig'
import { systemApi } from '../../../api/urls'
import Button from '../../../components/atomic/Button'
import LoadingSvg from '../../../components/loading/atomic/LoadingSvg'
import useAuth from '../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import Icon, { applyIcon } from '../../../utils/icons'
import t from '../../../utils/translator'

interface IProps {
  setOpenModal: (openModal: boolean) => void
}

const LicenseEula = ({ setOpenModal }: IProps) => {
  const [eulaText, setEulaText] = useState('')

  const { license } = useAuth()

  const oemNo = license?.OemNo

  const isOemNoPresent = (_oemNo: number | undefined): boolean => {
    return typeof _oemNo !== 'undefined' && !Number.isNaN(_oemNo)
  }

  useEffect(() => {
    isOemNoPresent(oemNo) &&
      fetch(`/oem/${oemNo}/eula.txt`)
        .then((r) => r.text())
        .then((text) => {
          // replace \n to <br />
          text = text.replace(/\n/g, '<br />')
          setEulaText(text)
        })
  }, [oemNo])

  // Define the mutation function for accept eula
  const { trigger, isMutating } = useSWRMutation(systemApi.acceptEula, fetcher, {
    onSuccess: () => {
      setOpenModal(false)
    },
  })

  if (!eulaText) {
    return (
      <div className="flex items-center justify-center w-full h-full" style={{ height: '80vh' }}>
        <LoadingSvg size="extraLarge" color="primary" />
      </div>
    )
  }

  return (
    <div className="px-4 py-2 pb-4 space-y-4" style={{ minHeight: '80vh' }}>
      <p
        className="text-base leading-7 text-justify"
        dangerouslySetInnerHTML={{ __html: eulaText }}
      />
      <div className="flex justify-center">
        <Button size="large" onClick={() => trigger()} isLoading={isMutating}>
          <Icon icon={applyIcon} />
          <span>{t`Accept`}</span>
        </Button>
      </div>
    </div>
  )
}

export default LicenseEula
