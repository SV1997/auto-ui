// src/components/ResizableComponent.tsx
import React from 'react';
import { Rnd } from 'react-rnd';
import { Task } from '../Sidebar/data';
import ReactCompo2 from '../Sidebar/ReactCompo2';
interface ResizableComponentProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onDragStop: (id: number, x: number, y: number) => void;
  onResizeStop: (id: number, width: number, height: number) => void;
  task: Task
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  id,
  x,
  y,
  width,
  height,
  minWidth = 50,
  minHeight = 50,
  maxWidth = 400,
  maxHeight = 400,
  onDragStop,
  onResizeStop,
  task
}) => {
  return (
    <Rnd
    size={{ width, height }}
    position={{ x, y }}
      onDragStop={(e, data) => {
        onDragStop(id, data.x, data.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResizeStop(id, parseInt(ref.style.width), parseInt(ref.style.height));
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      bounds="parent"
      className="resizable-component"
    >
      <ReactCompo2 task={task} index={task.tid} />
    </Rnd>
  );
};

export default ResizableComponent;
