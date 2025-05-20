// src/App.jsx
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header            from './mainComponents/Header'
import Footer            from './mainComponents/Footer'
import PokemonList       from './components/PokemonList'
import PokemonDetails    from './components/PokemonDetails'
import Gioca            from './components/Gioca'
import MemoryGame        from './components/MemoryGame'
import QuizGame          from './components/QuizGame'
import './App.css'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onSearch={setSearchTerm} />
      <main className="flex-grow-1 overflow-auto">
        <Routes>
          <Route path="/" element={<PokemonList searchTerm={searchTerm} />} />{/*qua passo la callback del search a header*/ }
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/gioca" element={<Gioca />} />
          <Route path="/gioca/memory" element={<MemoryGame />} />
          <Route path="/gioca/quiz" element={<QuizGame />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
