import React, { useEffect } from "react";
import Sidebar from "../MainComponent/Sidebar";
import Board from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import { useTasks } from "../hooks/useTasks";
import { useTaskNotifications } from "../hooks/useTaskNotifications";
import "./Dashboard.css";

export default function Dashboard() {
  // unico hook per tutti i task
  const { tasks, fetchAll, addTask, deleteTask, updateTask } = useTasks();
  
  // Hook per le notifiche dei nuovi task (solo per avviare il sistema)
  useTaskNotifications(tasks);

  // carico all'avvio
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Polling ogni 30 secondi per controllare nuovi task
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Polling for new tasks...");
      fetchAll();
    }, 30000); // 30 secondi

    return () => clearInterval(interval);
  }, [fetchAll]);

  // Verifica se l'utente è ancora autenticato DOPO aver chiamato tutti gli hooks
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  // Se non c'è token o userId, non mostrare nulla
  if (!token || !userId) {
    return null;
  }

  // Ordina i task dal più recente al meno recente
  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(b.insertDate) - new Date(a.insertDate);
  });

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <div className="row d-flex justify-content-between flex-grow-1 vh-100">
        <div className="col-10 px-0 vh-100 dashboard-background">
          <Board
            tasks={sortedTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            refreshTasks={fetchAll}
          />
        </div>
        <div className="col-2 overflow-auto px-0 vh-100">
          <SidebarDX tasks={sortedTasks} />
        </div>
      </div>
    </div>
  );
}