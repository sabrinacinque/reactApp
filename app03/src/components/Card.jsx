// src/components/Card.jsx
import React from 'react';

export default function Card({ titolo, descrizione, imgsrc }) {
  return (
    <div className="card h-100">
      <img src={imgsrc} className="card-img-top" alt={titolo} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titolo}</h5>
        <p className="card-text flex-grow-1">{descrizione}</p>
        <a href="#" className="btn btn-primary mt-auto">
          Ulteriori info…
        </a>
      </div>
    </div>
  );
}

