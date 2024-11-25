// MainWorkPlace.tsx
import React from 'react';
import ReactCompo from '../Sidebar/ReactCompo';
import { Task } from '../Sidebar/data';

interface MainWorkPlaceProps {
  tasks: Task[];
  column: { id: string; url: string };
}

const MainWorkPlace: React.FC<MainWorkPlaceProps> = ({ tasks, column }) => {
  return (
    <div
      className="flex flex-col mt-6 justify-between flex-1"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {tasks.map((task, index) => (
        <ReactCompo task={task} index={index} key={task.id} />
      ))}
    </div>
  );
};

export default MainWorkPlace;
