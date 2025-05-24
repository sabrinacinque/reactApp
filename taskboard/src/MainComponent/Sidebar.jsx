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
  FiUser,
  FiSmile,
  FiStar
} from "react-icons/fi";
import "./Sidebar.css";

// mappa delle chiavi avatar → componente
const AVATAR_MAP = {
  user:  FiUser,
  users: FiUsers,
  smile: FiSmile,
  star:  FiStar,
};

export default function Sidebar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const username   = localStorage.getItem("username");
  const avatarKey  = localStorage.getItem("avatar");              // recupera la chiave
  const navigate   = useNavigate();

  // trova il componente, altrimenti di default FiUser
  const AvatarIcon = AVATAR_MAP[avatarKey] || FiUser;

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
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/v1/sessions/logout", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("avatar");

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
      Swal.fire("Error", "Could not log you out. Please try again.", "error");
    }
  };

  return (
    <aside className="sidebar pt-5 d-flex flex-column">
      <nav className="nav flex-column px-3 fs-5">
        <NavLink end to="/"      className="nav-link d-flex align-items-center mb-2">
          <FiHome className="me-2" /> Home
        </NavLink>
        <NavLink to="/projects" className="nav-link d-flex align-items-center mb-2">
          <FiFolder className="me-2" /> Projects
        </NavLink>
       
        {isLoggedIn && (
          <>
            <NavLink to="/settings" className="nav-link d-flex align-items-center">
              <FiSettings className="me-2" /> Settings
            </NavLink>
            <NavLink to="/teams" className="nav-link d-flex align-items-center mb-2">
              <FiUsers className="me-2" /> Teams
            </NavLink>
          </>
        )}
      </nav>

      {isLoggedIn && (
        <>
          {/* Avatar + saluto */}
          <div className="user-section mt-auto px-3 pb-3 d-flex align-items-center">
            <div
              className="user-avatar d-flex justify-content-center align-items-center me-2"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#646cff",
                color: "white",
                fontSize: "1.2rem"
              }}
            >
              <AvatarIcon />
            </div>
            <div className="text-white">
              Hello,<br/> <strong>{username}</strong>!
            </div>
          </div>

          {/* Logout */}
          <div className="logout-section px-3 pb-4">
            <button
              onClick={handleLogout}
              className="logout-btn d-flex align-items-center fs-5"
            >
              <FiLogOut className="me-2" /> Logout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
