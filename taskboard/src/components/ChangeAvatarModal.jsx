// src/components/ChangeAvatarModal.jsx
import React from "react";
import Swal from "sweetalert2";
import { FiUser, FiSmile, FiZap, FiHeart } from "react-icons/fi";

const ICONS = [
  { id: "user",   icon: <FiUser size={24}/> },
  { id: "smile",  icon: <FiSmile size={24}/> },
  { id: "zap",    icon: <FiZap size={24}/> },
  { id: "heart",  icon: <FiHeart size={24}/> },
];

export default function ChangeAvatarModal({ show, onClose }) {
  if (!show) return null;

  const handlePick = async avatarId => {
    const userId = localStorage.getItem("userId");
    // invia PUT a /api/v1/users/{userId}/avatar
    await fetch(`http://localhost:8080/api/v1/users/${userId}/avatar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: avatarId }),
    });
    localStorage.setItem("avatarId", avatarId);
    await Swal.fire("Success", "Avatar updated!", "success");
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose Avatar</h5>
              <button type="button" className="btn-close" onClick={onClose}/>
            </div>
            <div className="modal-body d-flex justify-content-around">
              {ICONS.map(a => (
                <div
                  key={a.id}
                  className="p-3 avatar-choice"
                  onClick={() => handlePick(a.id)}
                  style={{ cursor: "pointer" }}
                >
                  {a.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
