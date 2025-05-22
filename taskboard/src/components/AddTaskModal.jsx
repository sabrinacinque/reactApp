// src/components/AddTaskModal.jsx
import React, { useState } from 'react';

export default function AddTaskModal({ show, onClose, state, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await onSave({ userId: /* prendi da context/session */, title, description, state });
    setTitle('');
    setDescription('');
    onClose();
  };

  // Quando “show” è false, non renderizzi nulla
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal stesso */}
      <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Nuovo task (“{state}”)</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
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
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
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
