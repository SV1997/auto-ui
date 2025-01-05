// MainWorkPlace.tsx
import React, { useCallback } from 'react';
import { Task } from '../Sidebar/data';
import Resizabletask from './ResizablecomponentProps';
import { useDispatch } from 'react-redux';
import { updateInitialElements } from '../../../store/elementsSlice';
interface MainWorkPlaceProps {
  tasks: Task[];
  column: { id: string; url: string }
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const MainWorkPlace: React.FC<MainWorkPlaceProps> = ({ tasks, column, setTasks }) => {
  const dispatch = useDispatch();
  const handleDragStop =  useCallback((id: number, x: number, y: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>{
        {
          let updatedTask
          if(task.tid === id && (task.x!==x ||  task.y!==y)){
            updatedTask={ ...task, x, y }
            dispatch(updateInitialElements({...updatedTask, content: "", icon: ""}))
            return updatedTask
          }
          return task;
        }
      }
      )
    );

  },[setTasks])
  const handleResizeStop = useCallback((id: number, width: number, height: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>{
        console.log(height);
        
        if(task.tid === id && (task.width!==width || task.height!==height)){
          const updatedTask = { ...task, width, height }
          dispatch(updateInitialElements({...updatedTask, content: "", icon: ""}))
          return updatedTask
        }
        return task;
      }
        // (task.id === id && (task.width !==width || task.height!==height)) ? { ...task, width, height } : task
      )
    );
  },[setTasks])
  return (
    <div
      className="flex flex-col mt-6 justify-between flex-1 w-full relative"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {tasks.map((task, index) => (
        <Resizabletask 
        key={task.tid}
        id={task.tid}
        x={task.x}
        y={task.y}
        width={task.width || 200}
        height={task.height || 100}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        task={task}
        >

        </Resizabletask>
      ))}
    </div>
  );
};

export default MainWorkPlace;
