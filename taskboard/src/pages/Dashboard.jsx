import React from "react";
import Sidebar from "../MainComponent/Sidebar";
import Board from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      {/* area principale + sidebar destra */}
      <div className="row d-flex justify-conter-space-between flex-grow-1 vh-100">
        <div className="col-10 px-0 vh-100 dashboard-background">
          <Board />
        </div>
        <div className="col-2 overflow-auto px-0 ">
          <SidebarDX />
        </div> 
      </div>
    </div>
  );
}
