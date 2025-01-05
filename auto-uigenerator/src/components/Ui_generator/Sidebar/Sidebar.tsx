// Sidebar.tsx
import React, { useEffect } from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import ReactCompo from './ReactCompo';
import { Task } from './data';
import { useGlobalContext } from './Context';

interface ColumnProps {
  id: string;
  url: string;

}

interface SidebarProps {
  column: ColumnProps;
  tasks: Task[];
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ column, tasks, className }) => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  const [displayTasks, setDisplayTasks] = React.useState<Task[]>(tasks);
  const [search,setSearch] = React.useState<string>("");
  //debouncing logic
  useEffect(() => {
    const timeout= setTimeout(() => {
      setDisplayTasks(tasks.filter((task)=>task.name.toLowerCase().includes(search.toLowerCase())))
    },100)
    return ()=>clearTimeout(timeout)
  })
  return (
    <div
      className={`transition-all duration-500 flex-col top-0 ${
        isSidebarOpen ? 'left-0' : '-left-64'
      } ${className}`}
    >
      <div className="flex h-screen flex-col bg-white w-64 px-4 py-8 border-r min-h-screen relative">

        <div className="relative mt-6">
          <label
            className="absolute inset-y-0 left-0 pl-3 flex items-center"
            htmlFor="searchP"
          >
            <HiOutlineSearch className="w-5 h-5 text-gray-400 hover:text-gray-500" />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 hover:border-gray-400 pl-10 py-3 pr-4 text-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-6 justify-between flex-1">
          <div className="text">
            {displayTasks.map((task, index) => (
              <ReactCompo key={task.tid} task={task} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
