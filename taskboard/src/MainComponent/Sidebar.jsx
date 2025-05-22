// src/MainComponent/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiUsers, FiSettings } from 'react-icons/fi';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar pt-5">
      <nav className="nav flex-column px-3 fs-5">
        <NavLink end to="/"       className="nav-link d-flex align-items-center mb-2">
          <FiHome className="me-2" /> Home
        </NavLink>
        <NavLink to="/projects"   className="nav-link d-flex align-items-center mb-2">
          <FiFolder className="me-2" /> Projects
        </NavLink>
        <NavLink to="/teams"      className="nav-link d-flex align-items-center mb-2">
          <FiUsers className="me-2" /> Teams
        </NavLink>
        <NavLink to="/settings"   className="nav-link d-flex align-items-center">
          <FiSettings className="me-2" /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
