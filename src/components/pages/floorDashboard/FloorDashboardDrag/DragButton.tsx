import classNames from 'classnames'
import Button from '../../../../components/atomic/Button'
import React from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { THandleFilterInputChange } from '../../../../types/components/common'
import { IDragButton } from '../../../../types/pages/floorDashboard'
import Icon, { warningIcon } from '../../../../utils/icons'

interface ButtonProps {
  button: IDragButton
  onPositionChange: (No_Type: string, newPosition: { x: number; y: number }) => void
  isEditMode: boolean
  selectedFloorItemNo: string
  handleInputChange: THandleFilterInputChange
}

const DragButton: React.FC<ButtonProps> = ({
  button,
  onPositionChange,
  isEditMode,
  selectedFloorItemNo,
  handleInputChange,
}) => {
  const handleDrag = (event: DraggableEvent, { x, y }: DraggableData) => {
    onPositionChange(button.No_Type, { x, y })
  }

  return (
    <Draggable
      bounds="parent"
      onDrag={isEditMode ? handleDrag : undefined}
      onStart={!isEditMode ? () => false : undefined}
      position={{
        x: button.Position.x,
        y: button.Position.y,
      }}
    >
      <Button
        color={selectedFloorItemNo === button.No_Type.toString() ? 'primary' : 'danger'}
        onClick={() => {
          handleInputChange('DeviceType', { label: button.Type, value: button.Type })
          handleInputChange('Device', { label: button.Name, value: button.No_Type.toString() })
        }}
        className={classNames(isEditMode ? 'cursor-move' : 'cursor-pointer')}
      >
        <Icon icon={button.Icon} className={classNames(button.Status && 'text-green-500')} />
        <span>{button.Name}</span>
        {button.Alert ? (
          <Icon icon={warningIcon} className="text-yellow-400 h-2.w-2.5 w-2.5 font-bold" />
        ) : (
          ''
        )}
      </Button>
    </Draggable>
  )
}

export default DragButton
