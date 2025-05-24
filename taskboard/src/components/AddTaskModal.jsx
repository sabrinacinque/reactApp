// src/components/AddTaskModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddTaskModal({
  show,
  onClose,
  state,
  onSave,
  recipientId: propRecipientId // <- se passato, questo è chi riceve
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const creatorId   = Number(localStorage.getItem("userId"));
    const recipientId = propRecipientId != null ? propRecipientId : creatorId;

    if (!creatorId) {
      await Swal.fire("Error", "Devi essere loggato per creare un task.", "error");
      return;
    }

    try {
      // costruiamo il DTO InputTask che Spring si aspetta:
      const payload = {
        recipientId, // <-- nuovo campo
        title,
        description,
        state,
        insertDate: null,
        previousEndDate: dueDate || null
      };

      // questa è la chiamata vera:
      await onSave(payload);

      // ora che onSave è finito senza errori, prepariamo alert di successo
      const modalTitle = state === "incoming" ? "Task inviato!" : "Task aggiunto!";
      const modalText =
        state === "incoming"
          ? `"${title}" sent!.`
          : `"${title}" has been created.`;

      await Swal.fire({
        title: modalTitle,
        text: modalText,
        icon: "success",
        confirmButtonText: "OK"
      });

      // reset del form
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();

    } catch (err) {
      console.error("Errore in AddTaskModal:", err);
      // questo catch ora scatta solo se onSave ha fallito davvero
      await Swal.fire("Error", "Impossible add task.", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">

            <div className="modal-header">
              <h5 className="modal-title">
                {state === "incoming" ? "Invia Task" : `Nuovo Task (“${state}”)`}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titolo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrizione</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Data e ora di scadenza</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={onClose}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-success">
                  Salva
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
