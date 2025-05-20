import React, { useEffect, useState } from 'react'

export default function QuizGame() {
  const [pokemons, setPokemons]     = useState([])
  const [questions, setQuestions]   = useState([])
  const [current, setCurrent]       = useState(0)
  const [score, setScore]           = useState(0)
  const [showResult, setShowResult] = useState(false)

  // 1️⃣ Carica i dati e genera le domande
  useEffect(() => {
    fetch('/dati/pokemons.json')
      .then(r => r.json())
      .then(data => {
        setPokemons(data)
        setQuestions(buildQuestions(data, 10))
      })
      .catch(console.error)
  }, [])

  // 2️⃣ Funzione per generare N domande
  function buildQuestions(data, num) {
    const q = []
    for (let i = 0; i < num; i++) {
      // pesca un Pokémon come risposta corretta
      const correct = data[Math.floor(Math.random() * data.length)]
      // pesca 3 nomi sbagliati diversi
      const choices = new Set([correct.name])
      while (choices.size < 4) {
        const pick = data[
          Math.floor(Math.random() * data.length)
        ].name
        choices.add(pick)
      }
      // mescola le 4 opzioni
      const options = Array.from(choices).sort(() => Math.random() - 0.5)
      q.push({ 
        pokemon: correct, 
        options 
      })
    }
    return q
  }

  // 3️⃣ Rispondi a una domanda
  function handleAnswer(name) {
    const q = questions[current]
    if (name === q.pokemon.name) setScore(s => s + 1)
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
    } else {
      setShowResult(true)
    }
  }

  if (!questions.length) {
    return <div className="container my-4 text-light">Caricamento quiz…</div>
  }

  if (showResult) {
    return (
      <div className="container my-4 text-center text-light">
        <h2>Hai completato il quiz!</h2>
        <p>Il tuo punteggio: <strong>{score} / {questions.length}</strong></p>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setScore(0)
            setCurrent(0)
            setShowResult(false)
            setQuestions(buildQuestions(pokemons, 10))
          }}
        >
          🔄 Riprova
        </button>
      </div>
    )
  }

  const { pokemon, options } = questions[current]

  return (
    <div className="container my-4 text-light">
      <h2 className="mb-3">Qual è il nome di questo pokemon?</h2>
      <p>Domanda {current + 1} di {questions.length}</p>

      <div className="card bg-dark my-3 mx-auto" style={{maxWidth: '300px'}}>
        <img 
          src={pokemon.image} 
          alt={pokemon.name} 
          className="card-img-top" 
          style={{objectFit:'cover', height:200}} 
        />
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-3 my-5">
        {options.map(opt => (
          <div className="col" key={opt}>
            <button 
              className="btn btn-outline-danger w-100" 
              onClick={() => handleAnswer(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
