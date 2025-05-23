// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import Sidebar from "../MainComponent/Sidebar";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeUsernameModal from "../components/ChangeUsernameModal";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const username = localStorage.getItem("username");
 

  return (
    <div className="page-layout d-flex">
      {/* side nav sempre presente */}
      <Sidebar />

      {/* contenuto centrale */}
      <div className="container-fluid settings">
        <div className="row flex-column flex-grow-1 p-5 settings-conten text-white text-center mb-5">
          <div className="col">
            <h1>Settings</h1>
          </div>
        </div>
        <div className="row d-flex flex-column text-white">
          <div className="col-8 mx-auto my-5 d-flex justify-content-between border-bottom">
            <h2>Change Password</h2>
            <div className="d-flex align-items-center gap-4 py-3">
              <h4>Password ************</h4>
              <button
                className="btn btn-outline-warning text-warning me-3"
                onClick={() => setShowPwd(true)}
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="col-8 mx-auto my-5 d-flex justify-content-between border-bottom">
            <h2>Change Username</h2>
            <div className="d-flex align-items-center gap-4 py-3">
              <h4>Username : {username}</h4>
              <button
              className="btn btn-outline-warning text-warning me-3"
              onClick={() => setShowUser(true)}
            >
              Change Username
            </button>
            </div>
          </div>

        </div>
      </div>

      {/* modali */}
      <ChangePasswordModal show={showPwd} onClose={() => setShowPwd(false)} />
      <ChangeUsernameModal show={showUser} onClose={() => setShowUser(false)} />
    </div>
  );
}
