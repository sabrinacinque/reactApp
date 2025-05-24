import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="app-header navbar navbar-expand-lg ">
      <div className="container-fluid">
         <NavLink to="/" className="navbar-brand d-flex align-items-center fs-2 ">
         <FiMenu className="me-2"  /> TaskBoard
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <NavLink to="/dashboard" className="btn btn-outline-light btn-sm">Dashboard</NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item me-2">
                  <NavLink to="/" className="nav-link">Help</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">About us</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
);
}
