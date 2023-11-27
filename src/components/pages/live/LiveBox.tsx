import { useEffect, useRef } from 'react'

interface IProps {
  streamUrl: string | null
  isLoading: boolean
}

function LiveBox({ streamUrl, isLoading }: IProps) {
  const videoEl = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoEl.current) {
      videoEl.current.src = streamUrl ?? ''
      // videoEl.current.loop = true;
      videoEl.current.muted = true
      videoEl.current.controls = true
      videoEl.current.play().catch((error) => {
        console.error('Error attempting to play', error)
      })
    }
  }, [streamUrl])

  return (
    <div className="h-full p-4 border rounded-md min-h-fit">
      {isLoading ? (
        'loading...'
      ) : (
        <video
          style={{
            maxWidth: '100%',
            width: '100%',
            margin: '0 auto',
          }}
          playsInline
          ref={videoEl}
        >
          <track kind="captions" />
        </video>
      )}
    </div>
  )
}

export default LiveBox
