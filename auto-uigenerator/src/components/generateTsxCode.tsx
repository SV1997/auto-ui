import { Task, Tasks } from "./Ui_generator/Sidebar/data";
import reactElementToJSXString from 'react-element-to-jsx-string';
export const generateTsxCode = (taskInterim:Task[]) => {
    const tasks=Tasks.filter((task)=>{
       return taskInterim.some((Task)=>{
         console.log(Task.name===task.name, task.id, Task.id);
         return Task.name===task.name})
    })
    console.log(tasks);
    
    const componentNames=Array.from(new Set(tasks.map(task=>task.name)));
    const imports = componentNames.map((componentName) => {
        return "import "+ componentName + " from './components/" + componentName + "';"
    }).join('\n');
    const componentTsx= tasks.map((task)=>{
        const props=Object.entries(task.props).map(([key, value])=>{
            if(typeof value === 'string'){
                return `${key} + ": '" + ${value} + "'"`;
            }
            else if(typeof value === "number" || typeof value === "boolean"){
                return `${key} + ": " + ${value}`;
            }
            else{
                return `${key} + ": " + ${JSON.stringify(value)}`;
            }
        }).join("")

        const style= `style={{position: 'absolute', left: ${task.x}, top: ${task.y}, width: ${task.width}, height: ${task.height}}}`
        const content= reactElementToJSXString(task.content,{
            showFunctions: true,
            showDefaultProps: true,
            useBooleanShorthandSyntax: true,
        });
        console.log(content);
        return `<div ${style}>${content} ${props}</div>`
        
    }).join('\n');
    console.log(componentTsx);
    
    const appTsx=`import React from 'react';
    ${imports}
    const App:React.FC = () => {
    return (
    <div style={{position: 'relative',width: '100vw', height: '100vh'}}>
    ${componentTsx}
    </div>
    )
    }`
    console.log(appTsx);
    
    return appTsx;

}