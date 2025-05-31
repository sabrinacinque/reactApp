// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import Sidebar   from "../MainComponent/Sidebar";
import Board     from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTasks }            from "../hooks/useTasks";
import { useTaskNotifications } from "../hooks/useTaskNotifications";
import "./Dashboard.css";

export default function Dashboard() {
  const { tasks, fetchAll, addTask, deleteTask, updateTask } = useTasks();
  useTaskNotifications(tasks);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const interval = setInterval(() => fetchAll(), 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const token  = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) return null;

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.insertDate) - new Date(a.insertDate)
  );

  return (
    <div className="dashboard-wrapper">
      {/* ─────────────────────────── */}
      {/* Sidebar sinistra fissa su ≥ lg */}
      {/* Collapse su < lg (id="collapseSidebar") */}
      {/* ─────────────────────────── */}
      <div className="d-lg-none">
        {/* Bottone fluttuante per aprire/chiudere la Collapse della Sidebar */}
        <button
          className="sidebar-toggle-btn toggle-left"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseSidebar"
          aria-expanded="false"
          aria-controls="collapseSidebar"
        >
          <FiChevronRight size={40} />
        </button>

        {/* Collapse che contiene la Sidebar (visibile solo su < lg) */}
        <div className="collapse d-lg-none" id="collapseSidebar">
          <Sidebar />
        </div>
      </div>

      {/* Sidebar sinistra fissa (solo su ≥ lg) */}
      <div className="d-none d-lg-block sidebar-static">
        <Sidebar />
      </div>

      {/* ──────────────────────────────────────────── */}
      {/* Contenuto principale + Sidebar destra         */}
      {/* ──────────────────────────────────────────── */}
      <div className="main-area">
        <div className="d-lg-none">
          {/* Bottone fluttuante per aprire/chiudere la Collapse di SidebarDX */}
          <button
            className="sidebar-toggle-btn toggle-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidebarDX"
            aria-expanded="false"
            aria-controls="collapseSidebarDX"
          >
            <FiChevronLeft size={40} />
          </button>

          {/* Collapse per SidebarDX su < lg */}
          <div className="collapse d-lg-none" id="collapseSidebarDX">
            <SidebarDX tasks={sortedTasks} />
          </div>
        </div>

        {/* Contenuto centrale: Board (sempre visibile) */}
        <div className="board-area">
          <Board
            tasks={sortedTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            refreshTasks={fetchAll}
          />
        </div>
      </div>

      {/* SidebarDX fissa (solo su ≥ lg) */}
      <div className="d-none d-lg-block sideright-static">
        <SidebarDX tasks={sortedTasks} />
      </div>
    </div>
  );
}
