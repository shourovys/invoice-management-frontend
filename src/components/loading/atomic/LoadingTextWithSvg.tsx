import { TSize } from 'types/components/common'
import LoadingSvg from './LoadingSvg'

interface IProps {
  size?: TSize
}

function LoadingTextWithSvg({ size }: IProps) {
  return (
    <>
      <LoadingSvg size={size} />
      Loading...
    </>
  )
}

export default LoadingTextWithSvg
