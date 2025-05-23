// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import Sidebar from "../MainComponent/Sidebar";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeUsernameModal from "../components/ChangeUsernameModal";
import ChangeAvatarModal from "../components/ChangeAvatarModal"; // ← IMPORT
import "./SettingsPage.css";

export default function SettingsPage() {
  const [showPwd, setShowPwd]       = useState(false);
  const [showUser, setShowUser]     = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  const username = localStorage.getItem("username") || "";

  return (
    <div className="page-layout d-flex">
      {/* sidebar sempre visibile */}
      <Sidebar />

      {/* contenuto principale */}
      <div className="container-fluid settings">
        <div className="row p-5 text-white text-center mb-5">
          <div className="col">
            <h1>Settings</h1>
          </div>
        </div>

        {/* Change Password */}
        <div className="row text-white">
          <div className="col-8 mx-auto my-4 d-flex justify-content-between border-bottom pb-3">
            <h2>Change Password</h2>
            <button
              className="btn btn-outline-warning"
              onClick={() => setShowPwd(true)}
            >
              Change
            </button>
          </div>

          {/* Change Username */}
          <div className="col-8 mx-auto my-4 d-flex justify-content-between border-bottom pb-3">
            <h2>Change Username</h2>
            <div className="d-flex align-items-center">
              <span className="me-3">Current: <strong>{username}</strong></span>
              <button
                className="btn btn-outline-warning"
                onClick={() => setShowUser(true)}
              >
                Change
              </button>
            </div>
          </div>

          {/* Change Avatar */}
          <div className="col-8 mx-auto my-4 d-flex justify-content-between border-bottom pb-3">
            <h2>Change Avatar</h2>
            <button
              className="btn btn-outline-warning"
              onClick={() => setShowAvatar(true)}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* I modali */}
      <ChangePasswordModal show={showPwd}   onClose={() => setShowPwd(false)}   />
      <ChangeUsernameModal show={showUser} onClose={() => setShowUser(false)} />
      <ChangeAvatarModal  show={showAvatar} onClose={() => setShowAvatar(false)} />
    </div>
  );
}
