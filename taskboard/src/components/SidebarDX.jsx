// src/components/SidebarDX.jsx
import React from "react";
import RecentSessions from "./RecentSessions";
import StatsPanel from "./StatsPanel";

import "./SidebarDX.css";

export default function SidebarDX() {
  return (
    <aside className="sidebar-dx p-3 vh-100">
      <RecentSessions />
      <h6 className="mt-4 text-secondary">Task Completion</h6>
      <StatsPanel />
      {/* …altre sezioni */}
    </aside>
  );
}
