import React from 'react'
import { useDroppable } from '@dnd-kit/core'
interface DroppableContainerProps {
    id: string,
    children: React.ReactNode
}
function DroppableContainer({ id, children }: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
  })
  return (
    <div ref={setNodeRef} style={{height:'100%', width: '100%'}}>{children}</div>
  )
}

export default DroppableContainer