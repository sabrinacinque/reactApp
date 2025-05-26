// src/components/AddProjectTaskModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddProjectTaskModal({
  show,
  onClose,
  onSave,
  members = []
}) {
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId]   = useState(
    members.length > 0 ? members[0].user.id : ""
  );

  if (!show) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!description.trim()) {
        await Swal.fire("Errore", "Descrizione obbligatoria", "error");
        return;
      }
      // costruisco il payload ridotto
      await onSave({
        recipientId: assigneeId,
        description,
        title: description,      // se il backend vuole un titolo, glielo passiamo uguale
        state: "incoming",       // o lo stato che preferisci
        insertDate: null,
        previousEndDate: null,
        projectId: null          // lo mettiamo nel parent
      });
      await Swal.fire("Fatto!", "Task aggiunto con successo.", "success");
      setDescription("");
      onClose();
    } catch (err) {
      console.error(err);
      await Swal.fire("Errore", "Non è stato possibile aggiungere il task.", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content bg-dark text-light" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Assegna a</label>
                <select
                  className="form-select"
                  value={assigneeId}
                  onChange={e => setAssigneeId(Number(e.target.value))}
                  required
                >
                  {members.map(m => (
                    <option key={m.id} value={m.user.id}>
                      {m.user.username} ({m.user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Descrizione</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
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
              <button type="submit" className="btn btn-primary">
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
