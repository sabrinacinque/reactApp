import React, { useState } from "react";
import Sidebar from "../MainComponent/Sidebar";
import { useFriends } from "../hooks/useFriends";
import { useTasks }   from "../hooks/useTasks";
import AddTaskModal   from "../components/AddTaskModal";
import Swal           from "sweetalert2";
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
  const [sendTo,       setSendTo] = useState(null);

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
      await Swal.fire({
        title: "Task sent!",
        text: `You sent a task to ${sendTo.username}.`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("addTask failed:", err);
      await Swal.fire({
        title: "Error",
        text: "Impossible to send the task.",
        icon: "error"
      });
    } finally {
      setSendTo(null);
      refreshTasks();
    }
  };

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <h2>Find & Connect</h2>
        <div className="input-group mb-4 w-25 my-5">
          <input
            type="email"
            className="form-control rounded-2"
            placeholder="User email"
            value={emailToSearch}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn btn-success ms-2" onClick={handleSearch}>
            Search
          </button>
        </div>

        {searchError && <div className="text-danger mb-3">{searchError}</div>}

        {foundUser && (
          <div className="card mb-4 p-3 w-25 bg-dark text-white">
            <h5 className="card-title">User Found</h5>
            <p>
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
        )}

        <h2 className="my-5">Incoming Requests</h2>
        {incoming.length === 0 ? (
          <p className="pb-4">No pending requests.</p>
        ) : (
          <ul className="list-group mb-4">
            {incoming.map(req => (
              <li
                key={req.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark bg-opacity-25 text-white fs-5 py-3 border-0 border-bottom"
              >
                <span>
                  <strong>{req.requester.username}</strong> wants to connect
                </span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-success fs-4 fw-bold me-2"
                    onClick={() => respond(req.id, true)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger fs-4 fw-bold"
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

        <h2 className="my-5">Your Connections</h2>
        {connections.length === 0 ? (
          <p>You have no connections yet.</p>
        ) : (
          <ul className="list-group">
            {connections.map(user => (
              <li
                key={user.id}
                className="list-group-item bg-dark bg-opacity-25 text-white border-0 d-flex justify-content-between align-items-center"
              >
                <span>
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
