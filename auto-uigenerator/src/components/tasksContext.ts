import React, { Dispatch, SetStateAction } from "react";
import { Task } from "./Ui_generator/Sidebar/data";
interface TasksContextType {

    tasks: Task[];
  
    setTasks: Dispatch<SetStateAction<Task[]>>;

    workShopId: string|null;
  
  }

 const tasksContext = React.createContext<TasksContextType | null>(null);
export default tasksContext;