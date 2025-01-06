// Draggable.tsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'; 
import { Task } from './Ui_generator/Sidebar/data';
interface DraggableProps {
  id: string;                
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
  const {
    attributes,     
    listeners,      
    setNodeRef,   
    transform,     
    isDragging,     
  } = useDraggable({
    id, 
  });

  
  const style: React.CSSProperties = {
    transform: transform
      ? CSS.Translate.toString(transform)
      : undefined,
    
    opacity: isDragging ? 0.8 : 1,
    transition: 'transform 200ms ease',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
