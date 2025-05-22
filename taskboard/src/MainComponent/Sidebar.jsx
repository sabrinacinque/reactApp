// src/MainComponent/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiFolder,
  FiUsers,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';
import './Sidebar.css';

export default function Sidebar() {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <aside className="sidebar pt-5 d-flex flex-column">
      <nav className="nav flex-column px-3 fs-5">
        <NavLink
          end to="/"
          className="nav-link d-flex align-items-center mb-2"
        >
          <FiHome className="me-2" /> Home
        </NavLink>
        <NavLink
          to="/projects"
          className="nav-link d-flex align-items-center mb-2"
        >
          <FiFolder className="me-2" /> Projects
        </NavLink>
        <NavLink
          to="/teams"
          className="nav-link d-flex align-items-center mb-2"
        >
          <FiUsers className="me-2" /> Teams
        </NavLink>
        <NavLink
          to="/settings"
          className="nav-link d-flex align-items-center"
        >
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
