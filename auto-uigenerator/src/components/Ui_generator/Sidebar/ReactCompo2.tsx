// ReactCompo.tsx
import React, {useEffect, useRef} from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from './data';
import DeleteItem from '../../DeleteItem';
import {Rnd} from 'react-rnd';
interface TaskCardProps {
  task: Task;
  index: number;
}

const ReactCompo: React.FC<TaskCardProps> = ({ task, index }) => {

  {console.log(task)}
  return (
    <DeleteItem task={task}>      
 {task.content}
    </DeleteItem>
  );
};

export default ReactCompo;
