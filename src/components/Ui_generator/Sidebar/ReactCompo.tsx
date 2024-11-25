import React, { useEffect } from 'react'
import { Task, coordinates } from './data';
import { useDraggable } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialCoordinates, updateInitialCoordinates } from '../../../store/coordinatesSlice';
type TaskCardProps={
    task:Task
    index:number
    coordinates: coordinates|null,
    // setRefState: (node:React.RefObject<HTMLDivElement>[] | null)=>void |null,
    // refState: HTMLDivElement | null
}

function ReactCompo({coordinates,task, index}:TaskCardProps) {
    // //console.log(task);
    // 
    // const ref = React.useRef<HTMLDivElement>(null);
    const [refState, setRefState] = React.useState<HTMLDivElement | null>(null);
    const initialcoord= useSelector((state:any)=>state.coordinates.initialCoordinaes);
    console.log(initialcoord);  
    const dispatch = useDispatch();
    useEffect(() => {
        const isPresent=initialcoord.coordinates.find((coord:any)=>coord.id===task.id);        
    if(task.column==="exporter"&&!isPresent&& refState){
        console.log("first");
           
            dispatch(setInitialCoordinates({id:task.id, x:refState?.getBoundingClientRect().x, y:refState?.getBoundingClientRect().y, column: 'exporter', exported:false}))
    }
    if(!initialcoord.exported &&task.column!=="exporter"){
        
        dispatch(updateInitialCoordinates({id:task.id, column: 'exporter', exported:true}))
    }
},[refState])
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.id
    })
    // if(coordinates){
    //     if(coordinates.topLeft.x<task.x)
    // }
    let     initialCoordinates = null
    if(refState){
        initialCoordinates = {x:refState.getBoundingClientRect().x, y:refState.getBoundingClientRect().y};

    }
    const currentTask=initialcoord.coordinates.find((coord:any)=>coord.id===task.id);
    console.log(task.x, coordinates?.topLeft?.x ?? 0, currentTask?.x ,task.y,currentTask?.y, coordinates?.topLeft?.y ?? 0);
    
const style: React.CSSProperties = {
    position: task.column!=="exporter"?'absolute':'relative',
    left: (task.column!=="exporter"?task.x - (coordinates?.topLeft?.x ?? 0)+ (currentTask?.x ?? 0):0),
    top: (task.column!=="exporter"?task.y+(currentTask?.y ?? 0):0),
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
};

// console.log(task);
const customref= (node:HTMLDivElement)=>{  
    setNodeRef(node)
    setRefState(node);
}


  return (
    <div
    key={task.id}
    ref= {customref}
    {...listeners}
    {...attributes}
    style={style}
    className={`capitalize flex items-center px-4 py-2 ${
        index === 0
            ? 'bg-gray-200 text-gray-700'
            : null
    } ${
        index > 0
            ? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
            : null
    } rounded-md`}
>
    {task.icon}
    <span className="mx-4 font-medium">
        {task.text}
    </span>
</div>
  )
}

export default ReactCompo