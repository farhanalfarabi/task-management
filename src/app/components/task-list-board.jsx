"use client";

import { useState } from "react";
import {
  ListProvider,
  ListGroup,
  ListHeader,
  ListItems,
  ListItem,
} from "./task-list";

// Sample data untuk task list board
const initialStatuses = [
  { id: "todo", name: "To Do", color: "#94a3b8" },
  { id: "in-progress", name: "In Progress", color: "#3b82f6" },
  { id: "review", name: "Review", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" },
];

const initialTasks = {
  todo: [
    { id: "1", name: "Setup project structure", status: initialStatuses[0] },
    { id: "2", name: "Design database schema", status: initialStatuses[0] },
    { id: "3", name: "Create wireframes", status: initialStatuses[0] },
  ],
  "in-progress": [
    { id: "4", name: "Implement authentication", status: initialStatuses[1] },
    { id: "5", name: "Build API endpoints", status: initialStatuses[1] },
  ],
  review: [
    { id: "6", name: "Code review for login feature", status: initialStatuses[2] },
    { id: "7", name: "UI/UX review", status: initialStatuses[2] },
  ],
  done: [
    { id: "8", name: "Setup development environment", status: initialStatuses[3] },
    { id: "9", name: "Write documentation", status: initialStatuses[3] },
  ],
};

export function TaskListBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    // over.id bisa dari ListGroup atau ListItems, keduanya menggunakan status.id
    let newStatusId = String(over.id);
    
    // Jika drop ke ListItems, id-nya sama dengan status.id
    // Jika drop ke ListGroup, id-nya juga status.id
    // Pastikan kita mendapatkan status.id yang benar
    const targetStatusId = initialStatuses.find(s => s.id === newStatusId) ? newStatusId : null;
    
    if (!targetStatusId) return;

    const oldStatusId = active.data.current?.parent ? String(active.data.current.parent) : null;

    if (oldStatusId === targetStatusId) return;

    // Find the task
    let taskToMove = null;
    let taskIndex = -1;

    for (const statusId in tasks) {
      const index = tasks[statusId].findIndex((t) => t.id === taskId);
      if (index !== -1) {
        taskToMove = tasks[statusId][index];
        taskIndex = index;
        break;
      }
    }

    if (!taskToMove) return;

    // Update task status
    const updatedTask = {
      ...taskToMove,
      status: initialStatuses.find((s) => s.id === targetStatusId) || taskToMove.status,
    };

    // Remove from old status
    const newTasks = { ...tasks };
    if (oldStatusId && newTasks[oldStatusId]) {
      newTasks[oldStatusId] = newTasks[oldStatusId].filter((t) => t.id !== taskId);
    }

    // Add to new status
    if (!newTasks[targetStatusId]) {
      newTasks[targetStatusId] = [];
    }
    newTasks[targetStatusId] = [...newTasks[targetStatusId], updatedTask];

    setTasks(newTasks);
  };

  return (
    <div className="mx-auto w-full ">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-8 px-4 lg:px-6">
        <h1 className="text-foreground text-xl font-semibold md:text-2xl">Today's To-Do List</h1>
      </div>

      {/* Board */}
      <div className=" bg-background rounded-lg border border-border/50  shadow-sm m-6">
        <ListProvider onDragEnd={handleDragEnd}>
          <div className="flex flex-col">
            {initialStatuses.map((status, index) => (
              <ListGroup 
                key={status.id} 
                id={status.id} 
                className=" overflow-hidden  bg-background"
              >
                <ListHeader name={status.name} color={status.color} />
                <ListItems id={status.id} className="min-h-[100px]">
                  {tasks[status.id]?.map((task, taskIndex) => (
                    <ListItem
                      key={task.id}
                      id={task.id}
                      name={task.name}
                      index={taskIndex}
                      parent={status.id}
                    />
                  ))}
                  {(!tasks[status.id] || tasks[status.id].length === 0) && (
                    <div className="text-muted-foreground text-center text-sm py-8">
                      No tasks
                    </div>
                  )}
                </ListItems>
              </ListGroup>
            ))}
          </div>
        </ListProvider>
      </div>
    </div>
  );
}

