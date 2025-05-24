// src/pages/Teams.jsx
import React, { useState } from "react";
import Sidebar from "../MainComponent/Sidebar";
import { useFriends } from "../hooks/useFriends";
import Swal from "sweetalert2";

export default function TeamsPage() {
  const {
    incoming,
    outgoing,
    connections,
    foundUser,
    searchError,
    searchByEmail,
    sendRequest,
    respond
  } = useFriends();

  const [emailToSearch, setEmail] = useState("");

  const handleSearch = () => {
    if (!emailToSearch) return;
    searchByEmail(emailToSearch);
  };

  // determina lo stato del rapporto
  const relationStatus = () => {
    if (!foundUser) return null;
    if (connections.some(c => c.id === foundUser.id)) return "connected";
    if (outgoing.some(p => p.target.id === foundUser.id)) return "pending_out";
    if (incoming.some(p => p.requester.id === foundUser.id)) return "pending_in";
    return "none";
  };

  const handleSendRequest = async () => {
    await sendRequest(foundUser.id);
    await Swal.fire({
      title: "Request sent!",
      text: `Hai inviato una richiesta a ${foundUser.username}.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  return (
    <div className="page-layout d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4">
        <h2>Find & Connect</h2>
        <div className="input-group mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="User email"
            value={emailToSearch}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {searchError && <div className="text-danger mb-3">{searchError}</div>}

        {foundUser && (
          <div className="card mb-4 p-3">
            <p>
              <strong>{foundUser.username}</strong> ({foundUser.email})
            </p>

            {relationStatus() === "none" && (
              <button
                className="btn btn-success"
                onClick={handleSendRequest}
              >
                Send Connection Request
              </button>
            )}

            {relationStatus() === "pending_out" && (
              <button className="btn btn-warning" disabled>
                Request pending
              </button>
            )}

            {relationStatus() === "pending_in" && (
              <span className="text-info">They asked to connect</span>
            )}

            {relationStatus() === "connected" && (
              <span className="text-success">You are connected</span>
            )}
          </div>
        )}

        <h2>Incoming Requests</h2>
        {incoming.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <ul className="list-group mb-4">
            {incoming.map(req => (
              <li
                key={req.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{req.requester.username}</strong> wants to connect
                </span>
                <div>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => respond(req.id, true)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => respond(req.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <hr />

        <h2>Your Connections</h2>
        {connections.length === 0 ? (
          <p>You have no connections yet.</p>
        ) : (
          <ul className="list-group">
            {connections.map(user => (
              <li key={user.id} className="list-group-item">
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
