// src/components/AddTaskModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddTaskModal({
  show,
  onClose,
  state,
  onSave,
  recipientId: propRecipientId, // <- se passato, questo è chi riceve
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = Number(localStorage.getItem("userId"));
    const recipientId = propRecipientId != null ? propRecipientId : creatorId;

    if (!creatorId) {
      Swal.fire("Error", "You must be logged in to create a task.", "error");
      return;
    }

    try {
      // qui costruiamo il DTO InputTask che Spring si aspetta:
      const payload = {
        recipientId, // <-- nuovo campo
        title,
        description,
        state,
        insertDate: null,
        previousEndDate: dueDate || null,
      };
      await onSave(payload);

      const modalTitle = state === "incoming" ? "Task sent!" : "Task added!";
      const modalText =
        state === "incoming"
          ? `"${title}" has been sent to the recipient.`
          : `"${title}" has been created.`;

      await Swal.fire({
        title: modalTitle,
        text: modalText,
        icon: "success",
        confirmButtonText: "OK",
      });

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not add task.", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">New Task (“{state}”)</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date & Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
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
      </div>
    </>
  );
}
