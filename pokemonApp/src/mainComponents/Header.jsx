import React, { useState } from 'react'
import { Link } from 'react-router-dom';



function Header({ onSearch }) {
  const [searchText, setSearchText] = useState('')

  const handleChange = e => {//e è l’oggetto evento (l’istanza di SyntheticEvent
    setSearchText(e.target.value.toLowerCase())//e.target è l’elemento DOM che ha scatenato l’evento (cioè l <input>).
  }//In pratica, ad ogni battuta dentro l’<input> ,catturiamo il testo digitato, lo rendi tutto minuscolo e lo salvi in searchText

  const handleSubmit = e => {
    e.preventDefault()//previene il comportamento di default del form, che sarebbe quello di ricaricare la pagina
    onSearch(searchText)// chiama la funzione onSearch (che ti è stata passata via prop da App) e le passa il testo già salvato in searchText. In questo modo “sali” lo stato fino ad App, che aggiornerà searchTerm e farà filtrare la lista dei Pokémon.       
  }

  const pikachu = "/images/pikachu.png";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 mb-5">
      <div className="container-fluid">
    <a class="navbar-brand" href="/"><img src={pikachu} alt="immagine di pikachiu" height={100} /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Poke-Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/gioca">Gioca</a>
        </li>
      </ul>
      
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca..."
              aria-label="Search"
              value={searchText}
              onChange={handleChange}
            />
            <button className="btn btn-outline-danger" type="submit">
              Search
            </button>
          </form>
    </div>
  </div>
</nav>
  );
}

export default Header;

