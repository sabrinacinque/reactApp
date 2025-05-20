// src/components/Card.jsx
import React, { useState } from 'react';

function Card({
  titolo,
  descrizione,
  imgsrc,
  prezzo,
  onAdd,
  onLess,
  children
}) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(c => c + 1);
    onAdd();//invoco la funzione che mi ha passato il genitore che in quest caso è Vetrina
  };

  const handleLess = () => {
    setCount(c => c - 1);
    onLess();
  };

  return (
    <div className="card h-100 position-relative">
      {children && (
        <div className="position-absolute top-0 end-0 p-2">
          {children}
        </div>
      )}

      <img src={imgsrc} className="card-img-top h-75" alt={titolo} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titolo}</h5>
        <p className="card-text flex-grow-1">{descrizione}</p>
        <p className="card-text">{prezzo.toFixed(2)} €</p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Aggiungi
          </button>
          <button className="btn btn-danger" onClick={handleLess}  disabled={count === 0}  >
            Sottrai
          </button>
        </div>

      
          <div className="mt-2">
            <small>
              Hai aggiunto {count} {count === 1 ? 'pezzo' : 'pezzi'} a questo prodotto
            </small>
          </div>
       
      </div>
    </div>
  );
}

export default Card;