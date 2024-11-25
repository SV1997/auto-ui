import React from 'react'
import Sidebar from './Ui_generator/Sidebar/Sidebar'
import { Tasks,Task } from './Ui_generator/Sidebar/data';
import MainWorkPlace from './Ui_generator/Workplace/MainWorkPlace';
import { DragEndEvent,DndContext } from '@dnd-kit/core';
function Dashboard() {
  const [tasks, setTasks] = React.useState<Task[]>(Tasks);
console.log(tasks);

  type column={
    id:string,
    url:string,
  }
  
  const columns:column[]=[
    {id:"exporter",
      url:"<></>"
    },
    {id:"color-shade-generator",
      url:"<></>"
    },
  ]
   function handleDrag(event: DragEndEvent){
		const {active,over, delta}= event;
		if(!over){
			return;
		}
//console.log(active,over);

		const taskId= active.id as string;
		const newColumn = over.id as string;
    const task = tasks.find(task=> String(task.id)===String(taskId));
    const newx = task ? task.x + delta?.x : 0;
    const newy= task?task.y+delta.y:0;
    // //console.log(task ? task.x + delta?.x : 0);
    
    // //console.log(newx,newy,delta.x,delta.y,"newx,newy");
		setTasks(()=>{return tasks.map(task=>{
      // //console.log(task.id,taskId, String(task.id)===taskId);
      return String(task.id)===String(taskId)?{...task,column:newColumn,x:newx,y:newy}:task})})
	}
  return (
    <DndContext onDragEnd={handleDrag}>
    <div className='grid grid-cols-12 gap-4 h-screen'> {/* Adjust the number of cols as needed */}
        {columns.map((column) => {
          return (column.id === "exporter") ? 
          (
          <div className='col-span-3'>
            <Sidebar tasks={tasks.filter((task)=>task.column==="exporter")} column={column}/>
        </div>):
        <div className='col-span-9 w-full h-full border-black border-2'>
                        <MainWorkPlace tasks={tasks.filter((task)=>task.column==="color-shade-generator")} column={column} />
                    </div>
        })}
    </div>
</DndContext>
  )
}

export default Dashboard