// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../MainComponent/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="page-layout d-flex">
      <Sidebar />

      <main className="dashboard-main flex-grow-1 p-4">
        <h1>Benvenuto nella tua dashboard!</h1>
        <p>Qui poi potrai mostrare i task, i messaggi, ecc.</p>
      </main>
    </div>
  );
}
