// src/components/PokemonDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PokemonDetails() {
  const { id } = useParams();        // ora prendi l'id dalla route
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pokemons/${id}`)
      .then(res => res.json())
      .then(setPokemon)
      .catch(console.error);
  }, [id]);

  if (!pokemon) {
    return <div className="container my-4 text-light">Caricamento dettagli…</div>;
  }

  return (
    <div className="container my-4 text-light">
      <Link to="/" className="btn btn-danger my-5 fs-4 text-light">← Torna alla lista</Link>

      <div className="row g-4 mt-5">
        <div className="col-md-4 text-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="img-fluid rounded h-100"
          />
        </div>
        <div className="col-md-8">
          <h1 className="text-capitalize">{pokemon.name}</h1>
          <h3>Esperienza base: {pokemon.experience}</h3>
          <h3>{pokemon.description}</h3>

          <h3>Tipi:</h3>
          {pokemon.types.map(t => (
            <span
              key={t.id}
              className="badge bg-info text-dark me-1 text-capitalize fs-4"
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
