import React, { useEffect } from "react";
import Sidebar from "../MainComponent/Sidebar";
import Board from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import { useTasks } from "../hooks/useTasks";
import "./Dashboard.css";

export default function Dashboard() {
  // unico hook per tutti i task
  const { tasks, fetchAll, addTask, deleteTask, updateTask } = useTasks();

  // carico all’avvio
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <div className="row d-flex justify-content-between flex-grow-1 vh-100">
        <div className="col-10 px-0 vh-100 dashboard-background">
          <Board
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            refreshTasks={fetchAll}
          />
        </div>
        <div className="col-2 overflow-auto px-0 vh-100">
          <SidebarDX tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
