// src/components/AddProjectTaskModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddProjectTaskModal({
  show,
  onClose,
  members,
  onSave
}) {
  const [description, setDescription] = useState("");
  // inizializziamo il select sul primo membro, se presente
  const [recipientId, setRecipientId] = useState(
    members.length > 0 ? members[0].user.id : ""
  );

  if (!show) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // qui mando SOLO description e recipientId al wrapper
      await onSave({ description, recipientId });
      await Swal.fire("Added!", "Task creato con successo.", "success");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Errore in AddProjectTaskModal:", err);
      await Swal.fire("Error", "Impossibile aggiungere il task.", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content bg-dark text-light" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Project Task</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Assign to</label>
                <select
                  className="form-select"
                  value={recipientId}
                  onChange={e => setRecipientId(Number(e.target.value))}
                  required
                >
                  {members.map(m => (
                    <option key={m.id} value={m.user.id}>
                      {m.user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
