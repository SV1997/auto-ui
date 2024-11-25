import React, { useCallback, useEffect, useState } from 'react'
import { useDroppable } from '@dnd-kit/core';
import ReactCompo from "../Sidebar/ReactCompo";
import { Task,coordinates } from '../Sidebar/data';
import { useRef } from 'react';
type MainWorkPlaceProps={
  tasks: Task[]
  column: {id:string,url:string},
}

function MainWorkPlace({tasks,column}:MainWorkPlaceProps) {
  //console.log(tasks,"map");
  const [coordinates, setCoordinates]= useState<coordinates|null>(null)
  const[currentNode, setCurrentNode]= useState<HTMLDivElement|null>(null)
  const { isOver,setNodeRef } = useDroppable({
    id: column.id,
  });  

// const columnTasks= tasks.filter(task=>task.url === column.id)
const combinedRef =useCallback((node: HTMLDivElement) => {
  if(node === null) return;
  setNodeRef(node);
  setCurrentNode(node);
  //console.log(node,"node");
  
  const rect= node.getBoundingClientRect();
  setCoordinates({
    topLeft: {x: rect.left, y: rect.top},
    topRight: {x: rect.right, y: rect.top},
    bottomLeft: {x: rect.left, y: rect.bottom},
    bottomRight: {x: rect.right, y: rect.bottom}
  })
},[setNodeRef]);

useEffect(() => {
  const handleSize=()=>{
    if(currentNode?.getBoundingClientRect()){
      const rect= currentNode.getBoundingClientRect();
      setCoordinates({
        topLeft: {x: rect.left, y: rect.top},
        topRight: {x: rect.right, y: rect.top},
        bottomLeft: {x: rect.left, y: rect.bottom},
        bottomRight: {x: rect.right, y: rect.bottom}
      })
    }

  }
  window.addEventListener('resize', handleSize);
  return ()=> window.removeEventListener('resize', handleSize);
})
const style:React.CSSProperties = {
  backgroundColor: isOver ? 'gray' : undefined,
  opacity: isOver ? 0.5 : 1,
  position: 'relative' as const, // Ensure children can be absolutely positioned
  width: '100%',
  height: '100%',
};
  return (
    <div ref={combinedRef} style={style} className="flex flex-col mt-6  justify-between flex-1 relative">
					<div className="text">
            {tasks.map((task, index) => {
              //console.log(task,"map");
              
              return (
                <ReactCompo coordinates={coordinates} task={task} index={index} key= {task.id} />
              );
            })}
						
					</div>
          </div>
  )
}

export default MainWorkPlace