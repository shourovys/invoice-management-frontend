interface IProps {
  progress: number
  backgroundColor?: string
  foregroundColor?: string
}

function ProgressBar({
  progress,
  backgroundColor = 'bg-gray-300',
  foregroundColor = 'bg-primary',
}: IProps) {
  const percentage = `${progress}%`

  return (
    <div className={`relative h-2 rounded-full ${backgroundColor}`}>
      <div
        className={`absolute inset-y-0 left-0 ${foregroundColor} rounded-full`}
        style={{ width: percentage }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
        {percentage}
      </span>
    </div>
  )
}

export default ProgressBar
