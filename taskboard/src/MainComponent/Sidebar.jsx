// src/MainComponent/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  FiHome,
  FiFolder,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import "./Sidebar.css";

export default function Sidebar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    });

    if (!result.isConfirmed) return;

    try {
      // 1) Chiama il back-end per disattivare la sessione
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/v1/sessions/logout", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      // 2) Rimuovi il token dal client
      localStorage.removeItem("token");

      // 3) Conferma visiva e redirect
      await Swal.fire({
        title: "Logged out!",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Non sono riuscito a disconnetterti", "error");
    }
  };

  return (
    <aside className="sidebar pt-5 d-flex flex-column">
      <nav className="nav flex-column px-3 fs-5">
        <NavLink end to="/"       className="nav-link d-flex align-items-center mb-2">
          <FiHome className="me-2" /> Home
        </NavLink>
        <NavLink to="/projects"  className="nav-link d-flex align-items-center mb-2">
          <FiFolder className="me-2" /> Projects
        </NavLink>
        <NavLink to="/teams"     className="nav-link d-flex align-items-center mb-2">
          <FiUsers className="me-2" /> Teams
        </NavLink>
        <NavLink to="/settings"  className="nav-link d-flex align-items-center">
          <FiSettings className="me-2" /> Settings
        </NavLink>
      </nav>

      {isLoggedIn && (
        <div className="logout-section mt-auto px-3 pb-4">
          <button
            onClick={handleLogout}
            className="logout-btn d-flex align-items-center fs-5"
          >
            <FiLogOut className="me-2" /> Logout
          </button>
        </div>
      )}
    </aside>
  );
}
