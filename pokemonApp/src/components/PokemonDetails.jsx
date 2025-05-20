// src/components/PokemonDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function PokemonDetails() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    fetch('/dati/pokemons.json')
      .then(res => res.json())
      .then(list => setPokemon(list.find(x => x.name === name)))
      .catch(console.error)
  }, [name])

  if (!pokemon) {
    return <div className="container my-4">Caricamento dettagli…</div>
  }

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-warning my-5">&larr; Torna indietro</Link>

      
      <div className="row g-4 align-items-center">
       
        <div className="col-md-6 text-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="img-fluid rounded"
            style={{ height: '500px', objectFit: 'cover' }}
          />
        </div>

        
        <div className="col-md-6">
          <div className="card h-100 bg-transparent border-0 p-0">
            <div className="card-body p-0">
              <h1 className="card-title text-capitalize mb-5">
                {pokemon.name}
              </h1>
              <h3 className="mb-3">
                <strong>Esperienza base:</strong> {pokemon.experience}
              </h3>
              <h3 className="mb-3">
                <strong>Descrizione:</strong><br/>
                {pokemon.description}
              </h3>
              <h3>
                <strong>Tipo:</strong>{' '}
                {pokemon.types.map(t => (
                  <span
                    key={t}
                    className="badge bg-info text-dark me-1 mt-5 text-capitalize"
                  >
                    {t}
                  </span>
                ))}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
