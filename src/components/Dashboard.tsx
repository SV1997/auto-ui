// Dashboard.tsx
import React, { useRef } from 'react';
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

type Column = {
  id: string;
  url: string;
};

function Dashboard() {
  const [tasks, setTasks] = React.useState<Task[]>(Tasks);
  const activeTaskId = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle drag start to track the active task ID
  const handleDragStart = (event: DragStartEvent) => {
    activeTaskId.current = event.active.id as string;
  };

  // Handle drag end to update the task's position
  const handleDragEnd = (event: DragEndEvent) => {
    if (activeTaskId.current && containerRef.current) {
      const taskId = activeTaskId.current;
      const containerRect = containerRef.current.getBoundingClientRect();

      const activeRect = event.active.rect.current.translated;

      if (activeRect) {
        // Calculate the new position relative to the container
        const newX = activeRect.left - containerRect.left;
        const newY = activeRect.top - containerRect.top;

        // Update the task's position and column
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            String(task.id) === String(taskId)
              ? { ...task, x: newX, y: newY, column: 'color-shade-generator' }
              : task
          )
        );
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

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="grid grid-cols-12 gap-4 h-screen">
        {columns.map((column) => {
          return column.id === 'exporter' ? (
            <div className="col-span-3" key={column.id}>
              <Sidebar
                tasks={tasks.filter((task) => task.column === 'exporter')}
                column={column}
              />
            </div>
          ) : (
            <div
              className="col-span-9 w-full h-full border-black border-2"
              key={column.id}
              ref={containerRef}
              style={{ position: 'relative' }} // Ensure the container is positioned relative
            >
              <MainWorkPlace
                tasks={tasks.filter(
                  (task) => task.column === 'color-shade-generator'
                )}
                column={column}
              />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}

export default Dashboard;
