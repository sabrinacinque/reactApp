import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

export default function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="app-header navbar navbar-expand-lg ">
      <div className="container-fluid">
         <NavLink to="/" className="navbar-brand d-flex align-items-center fs-2  ">
         TaskBoard
        </NavLink>

        <button
          className="navbar-toggler bg-light "
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
            {/* voglio dire che se sono loggato , posso vedere anche la dashboard, altrimenti solo help e about us */}
            {isLoggedIn && (
              <li className="nav-item ">
                <NavLink to="/dashboard" className="btn btn-outline-light btn-sm ">Dashboard</NavLink>
              </li>
            )} : {(
              
              <>
                <li className="nav-item mx-4">
                  <NavLink to="/help" className="btn btn-outline-light btn-sm">Help</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="btn btn-outline-light btn-sm">About us</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
);
}