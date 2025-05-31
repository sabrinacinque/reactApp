import React, { useEffect, useState } from "react";
import Sidebar from "../MainComponent/Sidebar";
import Board from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { useTaskNotifications } from "../hooks/useTaskNotifications";
import "./Dashboard.css";

export default function Dashboard() {
  // Hook per i task
  const { tasks, fetchAll, addTask, deleteTask, updateTask } = useTasks();
  useTaskNotifications(tasks);

  // Stati per tracking sidebar aperte/chiuse
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const interval = setInterval(() => fetchAll(), 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Controllo autenticazione
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) return null;

  // Ordina i task
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.insertDate) - new Date(a.insertDate)
  );

  // Funzioni per gestire apertura/chiusura sidebar
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  return (
    <div className="dashboard-wrapper d-flex">
      {/* ─────────────────────────── */}
      {/* Sidebar sinistra fissa su ≥ lg */}
      {/* Collapse su < lg con animazione da sinistra */}
      {/* ─────────────────────────── */}
      <div className="d-lg-none">
        <button
          className="sidebar-toggle-btn toggle-left btn btn-outline-secondary position-fixed top-50 start-0 translate-middle-y ms-2 bg-dark border border-3 rounded-5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseSidebar"
          aria-expanded={leftSidebarOpen}
          aria-controls="collapseSidebar"
          onClick={toggleLeftSidebar}
        >
          {leftSidebarOpen ? (
            <ChevronsLeft size={30} className="text-white" />
          ) : (
            <ChevronsRight size={30} className="text-white" />
          )}
        </button>

        <div 
          className={`collapse d-lg-none ${leftSidebarOpen ? 'show' : ''}`} 
          id="collapseSidebar"
          style={{
            position: 'fixed',
            top: 0,
            left: leftSidebarOpen ? 0 : '-300px',
            height: '100vh',
            width: '300px',
            zIndex: 1040,
            transition: 'left 0.3s ease-in-out',
            backgroundColor: 'white',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
          }}
        >
          <Sidebar />
        </div>
      </div>

      <div className="d-none d-lg-block sidebar-static">
        <Sidebar />
      </div>

      {/* ─────────────────────────────────── */}
      {/* Contenuto principale + Sidebar destra */}
      {/* ─────────────────────────────────── */}
      <div className="main-area flex-grow-1 d-flex flex-column vh-100">
        <div className="d-lg-none">
          <button
            className="sidebar-toggle-btn toggle-right btn btn-outline-secondary position-fixed top-50 end-0 translate-middle-y me-2 bg-dark border border-3 rounded-5"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidebarDX"
            aria-expanded={rightSidebarOpen}
            aria-controls="collapseSidebarDX"
            onClick={toggleRightSidebar}
          >
            {rightSidebarOpen ? (
              <ChevronsRight size={30} className="text-white" />
            ) : (
              <ChevronsLeft size={30} className="text-white" />
            )}
          </button>

          <div 
            className={`collapse d-lg-none ${rightSidebarOpen ? 'show' : ''}`} 
            id="collapseSidebarDX"
            style={{
              position: 'fixed',
              top: 0,
              right: rightSidebarOpen ? 0 : '-300px',
              height: '100vh',
              width: '300px',
              zIndex: 1040,
              transition: 'right 0.3s ease-in-out',
              backgroundColor: 'white',
              boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'
            }}
          >
            <SidebarDX tasks={sortedTasks} />
          </div>
        </div>

        <div className="board-area flex-grow-1 overflow-auto ">
          <Board
            tasks={sortedTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            refreshTasks={fetchAll}
          />
        </div>
      </div>

      <div className="d-none d-lg-block sideright-static">
        <SidebarDX tasks={sortedTasks} />
      </div>
    </div>
  );
}
