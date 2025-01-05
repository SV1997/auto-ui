// ReactCompo.tsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from './data';

interface TaskCardProps {
  task: Task;
  index: number;
}

const ReactCompo: React.FC<TaskCardProps> = ({ task, index }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.tid,
  });

  const style: React.CSSProperties = {
    position: task.column !== 'exporter' ? 'absolute' : 'relative',
    left: task.column !== 'exporter' ? task.x : undefined,
    top: task.column !== 'exporter' ? task.y : undefined,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`capitalize flex items-center px-4 py-2 ${
        index === 0 ? 'bg-gray-200 text-gray-700' : ''
      } ${
        index > 0
          ? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
          : ''
      } rounded-md`}
    >
      {task.icon}
      <span className="mx-4 font-medium">{task.name}</span>
    </div>
  );
};

export default ReactCompo;
