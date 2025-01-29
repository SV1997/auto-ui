// Dashboard.tsx
import React, { useEffect, useRef } from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
} from '@dnd-kit/core';
import Sidebar from './Ui_generator/Sidebar/Sidebar';
import MainWorkPlace from './Ui_generator/Workplace/MainWorkPlace';
import { Tasks, Task } from './Ui_generator/Sidebar/data';
import Button from './Ui_generator/Sidebar/button';
import { generateTsxCode } from './generateTsxCode';
import axios from 'axios';
import { setInitialElements, firstelement } from '../store/elementsSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DroppableContainer from './DroppableContainer';
import TasksContext from './tasksContext';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}
type Column = {
  id: string;
  url: string;
};

function Dashboard() {
  const domain = import.meta.env.VITE_APP_DOMAIN;
  const state = useSelector((state:any) => state.elements.initialElements.elements);
  // const ids1=state.map((task:Task)=>task.id);
  const [tasks, setTasks] = React.useState<Task[]>(Tasks);
  // useEffect(()=>{setTasks(Tasks.map((task:Task)=>{
  //   if(ids1.includes(task.id)){
  //     return state.find((task1:Task)=>task1.id===task.id)
  //   }
  //   return task;
  // }))},[])
  const activeTaskId = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch=useDispatch();
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle drag start to track the active task ID
  const handleDragStart = (event: DragStartEvent) => {
    activeTaskId.current = event.active.id as string;
  };
  const workShopId=useQuery().get('id');
  const userId=useQuery().get('userid');
  const name=useQuery().get('name');
  //console.log(workShopId, userId);
  
  let elements:any;
  useEffect(() => 
 { 
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const getElements=async ()=>{elements= await axios.post(`${domain}/api/v1/code/getElements`,{workshopId:workShopId, userId:userId, signal:signal}, {
      headers:{
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    const generateUniqueId = () => {
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    //console.log(elements);
    setTasks((prevTasks) => {
      const prevTasksMap = new Map(prevTasks.map(task => [task.name, task]));
    
      const updatedTasks = elements.data.map((element:any) => {
        const existingTask = prevTasksMap.get(element.name);
    
        if (existingTask) {
          return {
            ...existingTask,
            ...element,
            tid: generateUniqueId(),
            column: 'color-shade-generator',
          };
        } else {
          return {
            ...element,
            column: 'color-shade-generator',
            id: prevTasks.length + 1,
          };
        }
      });
      //console.log(updatedTasks);
      const recentTasks=updatedTasks.map((task:Task)=>{
        return {...task, content: "", icon: ""}
      });
      dispatch(firstelement(recentTasks))
      return [...updatedTasks, ...prevTasks];
    });
  
  }
    getElements();
    return ()=>{
      controller.abort();
    } 
  } catch (error) {
    if(axios.isCancel(error)){
      console.log('cancelled');
    }
    console.log(error);
    
  }

}, [])
  // Handle drag end to update the task's position
  const handleDragEnd = (event: DragEndEvent) => {
    const over= event.over;
    if(!over){
      console.log(over);
      activeTaskId.current = null;
      return;
    }
    if (activeTaskId.current && containerRef.current) {
      const taskId = activeTaskId.current;
      const containerRect = containerRef.current.getBoundingClientRect();

      const activeRect = event.active.rect.current.translated;

      if (activeRect) {
        // Calculate the new position relative to the container
        const newX = activeRect.left - containerRect.left;
        const newY = activeRect.top - containerRect.top;
        const currentTask = tasks?.find((task) => String(task.tid) === String(taskId));
        // Update the task's position and column
        console.log(newX, newY);
        
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            {
              let updatedTask: Task;
              if(String(task.tid) === String(taskId)){
                updatedTask= { ...task, x: newX, y: newY, column: 'color-shade-generator' };
                console.log(updatedTask);
                
                dispatch(setInitialElements({...updatedTask, content: "", icon : ""}));
              }
              else{
                updatedTask=task;
              }
              
              return updatedTask;
            }
          )
          
        );
        if (currentTask) {
          setTasks((prevTasks) => [...prevTasks, {...currentTask, id: (prevTasks.length > 0 ? prevTasks[prevTasks.length - 1].tid + 1 : 1)}]);
        }
      }
    }

    // Reset the active task ID
    activeTaskId.current = null;
  };

  const columns: Column[] = [
    {
      id: 'exporter',
      url: '<></>',
    },
    {
      id: 'color-shade-generator',
      url: '<></>',
    },
  ];
  const downloadCode=async ()=>{
    const generatedCode=generateTsxCode(state);
    //console.log(state);
    if(generatedCode){
      const res=await axios.post(`${domain}/api/v1/file/download`, {code:generatedCode,elements:state, workShopId:workShopId},{
        responseType: 'blob',
        headers:{
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href=url;
      link.setAttribute('download', `zipFile${userId}.zip`)
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }

  }

const saveCode=()=>{
    axios.post(`${domain}/api/v1/code/saveCode`, {elements:state, workShopId:workShopId, userId:userId, name:name},{
      headers:{
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
  }


  return (
    <DndContext
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    sensors={sensors}
  >
    {/* Header Section with Buttons */}
    
    {/* Main Grid Layout */}
    <div className="grid grid-cols-12 gap-4 h-screen">
      {columns.map((column) => {
        // Check if the column is 'exporter'
        if (column.id === 'exporter') {
          return (
            <div className="col-span-3" key={column.id}>
              <Sidebar
              className=' bg-white rounded-lg shadow-lg p-4'
                tasks={(tasks || []).filter((task) => task.column === 'exporter')}
                column={column}
              />
            </div>
          );
        }

        // For other columns
        return (
          <div className='col-span-9 w-full h-full p-4' key={column.id}>
            <div className="bg-gradient-to-r from-indigo-50 border-2 to-indigo-100 p-6 flex items-center justify-end space-x-4 shadow-md rounded-lg shadow-lg">
      <Button
        onClick={downloadCode}
        style={{ width: '30%' }} // Consider using Tailwind classes instead
        className="w-1/4 py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md"
      >
        Download
      </Button>
      <Button
        onClick={saveCode}
        style={{ width: '30%' }} // Consider using Tailwind classes instead
        className="w-1/4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md"
      >
        Save
      </Button>
    </div>
          <div
            className=" w-full h-full border-2 border-gray-300 relative rounded-lg shadow-2xl"
            // key={column.id}
            ref={containerRef}
          >
            

            <DroppableContainer id={column.id}>
            <TasksContext.Provider value={{tasks, setTasks, workShopId}}>
              <MainWorkPlace
                tasks={(tasks || []).filter(
                  (task) => task.column === 'color-shade-generator'
                )}
                column={column}
                setTasks={setTasks}
              />
              </TasksContext.Provider>
            </DroppableContainer>
          </div>
          </div>
        );
      })}
    </div>
  </DndContext>
  );
}

export default Dashboard;
