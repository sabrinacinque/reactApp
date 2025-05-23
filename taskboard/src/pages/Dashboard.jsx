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
      <div className="row d-flex justify-conter-space-between flex-grow-1">
        <div className="col-10 overflow-auto px-0">
          <Board />
        </div>
        <div className="col-2 px-0">
          <SidebarDX />
        </div> 
      </div>
    </div>
  );
}
