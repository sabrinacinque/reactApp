// src/components/PokemonList.jsx
import React, { useEffect, useState } from 'react'
import { Link }                       from 'react-router-dom'
import Layout                         from './Layout'

export default function PokemonList({ searchTerm }) {
  const [pokemons, setPokemons]   = useState([])
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    fetch('/dati/pokemons.json')
      .then(res => res.json())
      .then(setPokemons)
      .catch(err => console.error('Errore nel caricamento dei Pokémon:', err))
  }, [])


  const allTypes = Array.from(//questo crea un array a partire da un oggetto iterabile
    new Set(pokemons.flatMap(p => p.types))//il set si usa per eliminare i duplicati quindi ottengo un array con tutti i tipi che però si ripetono una volta sola
  ).sort()

  // 2) Applico i due filtri: name _e_ tipo
  const filtered = pokemons.filter(p => {
    const matchesName = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())//searchTerm è l'input da tastiera e vediamo se è incluso nel nome del pokemon
    // Se non c'è un filtro di tipo, lo ignoro
    // Se c'è un filtro di tipo, verifico se il Pokémon ha quel tipo
    const matchesType = typeFilter === '' 
      ? true 
      : p.types.includes(typeFilter)
    return matchesName && matchesType
  })

  if (pokemons.length === 0) {
    return <div className="container my-4">Caricamento in corso…</div>
  }

  return (
    <div className="container my-4">
      {/* qusto è il select per i filtr dei tipi  */}
      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="typeFilter" className="form-label">
            Filtra per tipo:
          </label>
          <select
            id="typeFilter"
            className="form-select bg-dark text-light"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}//aggiorna il valore del filtro
          >
            <option value="">🎲 Tutti i tipi</option>
            {allTypes.map(type => (//alltypes è un array di stringhe che abbiamo ottenuto sopra e che contiene i tipi dei pokemon,senza ripetizioni
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4) Messaggio se non trovo nulla */}
      {filtered.length === 0 && searchTerm !== '' && (
        <div className="alert alert-warning">
          Nessun Pokémon trovato per “{searchTerm}”
          {typeFilter && <> e tipo “{typeFilter}”</>}
        </div>
      )}

      {/* 5) Griglia dei risultati */}
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {filtered.map(p => (
          <div className="col d-flex" key={p.name}>
            <Link
              to={`/pokemon/${p.name}`}
              className="w-100 text-decoration-none"
            >
              <Layout
                name={p.name}
                image={p.image}
                experience={p.experience}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
