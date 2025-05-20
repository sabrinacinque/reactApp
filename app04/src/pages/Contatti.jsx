// src/pages/Contatti.jsx
import React from 'react';

export default function Contatti() {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Contatti</h1>
      <form className="border p-4 rounded shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Il tuo nome"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="cognome" className="form-label">Cognome</label>
            <input
              type="text"
              className="form-control"
              id="cognome"
              placeholder="Il tuo cognome"
            />
          </div>
        </div>

        <div className="mb-3 mt-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="nome@esempio.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="messaggio" className="form-label">Messaggio</label>
          <textarea
            className="form-control"
            id="messaggio"
            rows="5"
            placeholder="Scrivi qui il tuo messaggio"
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={() => alert('Messaggio inviato!')}>
          Invia
        </button>
      </form>
    </div>
  );
}
