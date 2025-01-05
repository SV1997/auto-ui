import React from 'react'
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { Task } from './Ui_generator/Sidebar/data';
import { useContext } from 'react';
import tasksContext from './tasksContext';
import axios from 'axios';
interface DeleteItemProps {
  children: React.ReactNode;
  className?: string;
  task: Task
}
function DeleteItem({ children,task }: DeleteItemProps) {
        const taskContext=useContext(tasksContext)
        console.log(task, taskContext);
        const domain = import.meta.env.VITE_APP_DOMAIN;
     
  return (
    <div className='relative w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-1'>
                <button
                onClick={async()=>{
                  console.log(task);
                  if(task.id!==0){
                    const res=await axios.post(`${domain}/api/v1/code/delete`,{elementId:task.id, workshopId:taskContext?.workShopId},{
                      headers:{
                        'Content-Type': 'application/json',
                      },
                      withCredentials: true
                    })
                    console.log(res);
                  }
                    taskContext?.setTasks(taskContext.tasks.filter((t)=>t.tid!==task.tid))
                }}
          className="absolute z-10 top-1 right-1 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
                      <HiX className="w-5 h-5" />
        </button>
        {children}
    </div>
  )
}

export default DeleteItem