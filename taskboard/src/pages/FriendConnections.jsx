import React, { useState } from "react";
import { useFriends } from "../hooks/useFriends";
import { useTasks } from "../hooks/useTasks";
import AddTaskModal from "../components/AddTaskModal";
import Swal from "sweetalert2";
import "./FriendConnections.css";

export default function FriendConnections() {
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

  const { addTask, fetchAll: refreshTasks } = useTasks();

  const [emailToSearch, setEmail] = useState("");
  const [sendTo, setSendTo] = useState(null);

  const handleSearch = () => {
    if (!emailToSearch) return;
    searchByEmail(emailToSearch);
  };

  const handleSendRequest = async () => {
    await sendRequest(foundUser.id);
    await Swal.fire({
      title: "Request sent!",
      text: `You sent a task to ${foundUser.username}.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const relationStatus = () => {
    if (!foundUser) return null;
    if (connections.some(c => c.id === foundUser.id)) return "connected";
    if (outgoing.some(p => p.target.id === foundUser.id)) return "pending_out";
    if (incoming.some(p => p.requester.id === foundUser.id)) return "pending_in";
    return "none";
  };

  const openSendTaskModal = user => setSendTo(user);

  // Riceve dal modal un oggetto { title, description, state, insertDate, previousEndDate, recipientId }
  const handleSendTask = async payload => {
    try {
      await addTask(payload);
    } catch (err) {
      console.error("addTask failed:", err);
    } finally {
      setSendTo(null);
      refreshTasks();
    }
  };

  return (
    <div className="container-fluid background text-white vh-100 p-3 p-md-4 overflow-y-scroll">
      <div className="pt-3 pt-md-5">
        <h2 className="mb-4">Find & Connect</h2>
        
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="User email"
                value={emailToSearch}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        {searchError && <div className="alert alert-danger">{searchError}</div>}

        {foundUser && (
          <div className="card mb-4 bg-dark text-white border-secondary" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <h5 className="card-title">User Found</h5>
              <p className="card-text">
                <strong>{foundUser.username}</strong> ({foundUser.email})
              </p>

              {relationStatus() === "none" && (
                <button className="btn btn-success" onClick={handleSendRequest}>
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
          </div>
        )}

        <h2 className="my-4">Incoming Requests</h2>
        {incoming.length === 0 ? (
          <p className="pb-4">No pending requests.</p>
        ) : (
          <ul className="list-group mb-4">
            {incoming.map(req => (
              <li
                key={req.id}
                className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center bg-dark bg-opacity-25 text-white border-0 border-bottom py-3"
              >
                <span className="mb-2 mb-sm-0">
                  <strong>{req.requester.username}</strong> wants to connect
                </span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => respond(req.id, true)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => respond(req.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <hr className="my-4" />

        <h2 className="my-4">Your Connections</h2>
        {connections.length === 0 ? (
          <p>You have no connections yet.</p>
        ) : (
          <ul className="list-group">
            {connections.map(user => (
              <li
                key={user.id}
                className="list-group-item bg-dark bg-opacity-25 text-white border-0 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center"
              >
                <span className="mb-2 mb-sm-0">
                  {user.username} ({user.email})
                </span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => openSendTaskModal(user)}
                >
                  Send Task
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {sendTo && (
        <AddTaskModal
          show
          state="incoming"
          recipientId={sendTo.id}
          onClose={() => setSendTo(null)}
          onSave={handleSendTask}
        />
      )}
    </div>
  );
}