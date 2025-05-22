import React from "react";
import Sidebar from "../MainComponent/Sidebar";
import Board from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="page-layout d-flex">
      <Sidebar />

      {/* area principale + sidebar destra */}
      <div className="flex-grow-1 d-flex">
        <div className="flex-grow-1 overflow-auto">
          <Board />
        </div>
        <SidebarDX />
      </div>
    </div>
  );
}
