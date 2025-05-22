// src/components/AddTaskModal.jsx
import React, { useState } from 'react';

export default function AddTaskModal({ show, onClose, state, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Legge l'userId salvato al login
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      console.error('Impossibile recuperare userId da localStorage');
      return;
    }

    // Costruisce il payload per la creazione del task
    const input = {
      userId,
      title,
      description,
      state
    };

    // Chiama il callback onSave per eseguire la POST
    await onSave(input);

    // Pulisce i campi e chiude il modal
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
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
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Inserisci un titolo"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrizione</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrizione (opzionale)"
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
