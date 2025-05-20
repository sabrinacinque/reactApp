// src/components/PokemonList.jsx
import React, { useEffect, useState } from 'react';
import { Link }                   from 'react-router-dom';
import Layout                     from './Layout';

export default function PokemonList({ searchTerm }) {
  const [pokemons, setPokemons]     = useState([]);
  const [allTypes, setAllTypes]     = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  // 1️⃣ Carica la lista completa di tipi per popolare la select
  useEffect(() => {
    fetch('http://localhost:8080/api/types')
      .then(res => res.json())
      .then(setAllTypes)
      .catch(console.error);
  }, []);

  // 2️⃣ Carica i Pokémon, filtrati per nome se searchTerm non è vuoto
  useEffect(() => {
    const url = searchTerm
      ? `http://localhost:8080/api/pokemons?name=${searchTerm}`
      : 'http://localhost:8080/api/pokemons';

    fetch(url)
      .then(res => res.json())
      .then(setPokemons)
      .catch(console.error);
  }, [searchTerm]);

  // 3️⃣ Applica anche il filtro per tipo lato client
  const filtered = pokemons.filter(p =>
    typeFilter === '' || p.types.some(t => t.name === typeFilter)
  );

  if (!pokemons.length) {
    return <div className="container my-4 text-light">Caricamento in corso…</div>;
  }

  return (
    <div className="container my-4">
      {/* Filtro per tipo */}
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">🎲 Tutti i tipi</option>
            {allTypes.map(type => (
              <option key={type.id} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Griglia di risultati */}
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {filtered.map(p => (
          <div className="col d-flex" key={p.id}>
            <Link to={`/pokemon/${p.id}`} className="w-100 text-decoration-none">
              <Layout
                name={p.name}
                image={p.image}
                experience={p.experience}
              >
                {/* badge dei tipi */}
                {p.types.map(t => (
                  <span
                    key={t.id}
                    className="badge bg-info text-dark me-1 text-capitalize"
                  >
                    {t.name}
                  </span>
                ))}
              </Layout>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
