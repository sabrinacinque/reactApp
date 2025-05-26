// src/components/AddMemberModal.jsx
import React, { useState } from "react";

export default function AddMemberModal({
  show,
  onClose,
  onSave,
  connections = []
}) {
  const [selectedId, setSelectedId] = useState(null);

  if (!show) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedId) return;
    await onSave(selectedId);
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content bg-dark text-light" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Member</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              {connections.length === 0 ? (
                <p>No connections to add.</p>
              ) : (
                <select
                  className="form-select"
                  value={selectedId || ""}
                  onChange={e => setSelectedId(Number(e.target.value))}
                  required
                >
                  <option value="" disabled>
                    -- select a user --
                  </option>
                  {connections.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.username} ({u.email})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={!selectedId}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
