// src/components/SidebarDX.jsx
import React from "react";
import RecentSessions from "./RecentSessions";
import StatsPanel      from "./StatsPanel";
import "./SidebarDX.css";

export default function SidebarDX({ tasks }) {
  return (
    <aside className="sidebar-dx p-3 vh-100">
      <RecentSessions />
      <h6 className="mt-4 text-secondary">Quick Stats</h6>
      <StatsPanel tasks={tasks} />
      {/* …altre sezioni se serve */}
    </aside>
  );
}
