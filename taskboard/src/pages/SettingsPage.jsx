import React, { useState } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeUsernameModal from "../components/ChangeUsernameModal";
import ChangeAvatarModal from "../components/ChangeAvatarModal";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  const username = localStorage.getItem("username") || "";

  return (
    <div className="container-fluid settings min-vh-100 d-flex flex-column">
      <div className="row p-3 p-md-5 text-white text-center mb-3 mb-md-5">
        <div className="col">
          <h1 className="h2 h1-md">Settings</h1>
        </div>
      </div>

      <div className="row text-white flex-grow-1">
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          
          {/* Change Password */}
          <div className="my-3 my-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom pb-3">
            <h2 className="h4 h3-md mb-2 mb-sm-0">Change Password</h2>
            <button
              className="btn btn-outline-warning btn-sm btn-md-normal"
              onClick={() => setShowPwd(true)}
            >
              Change
            </button>
          </div>

          {/* Change Username */}
          <div className="my-3 my-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom pb-3">
            <div className="mb-2 mb-sm-0">
              <h2 className="h4 h3-md mb-1">Change Username</h2>
              <span className="small">Current: <strong>{username}</strong></span>
            </div>
            <button
              className="btn btn-outline-warning btn-sm btn-md-normal"
              onClick={() => setShowUser(true)}
            >
              Change
            </button>
          </div>

          {/* Change Avatar */}
          <div className="my-3 my-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom pb-3">
            <h2 className="h4 h3-md mb-2 mb-sm-0">Change Avatar</h2>
            <button
              className="btn btn-outline-warning btn-sm btn-md-normal"
              onClick={() => setShowAvatar(true)}
            >
              Change
            </button>
          </div>

        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal show={showPwd} onClose={() => setShowPwd(false)} />
      <ChangeUsernameModal show={showUser} onClose={() => setShowUser(false)} />
      <ChangeAvatarModal show={showAvatar} onClose={() => setShowAvatar(false)} />
    </div>
  );
}