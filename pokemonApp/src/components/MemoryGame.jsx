import React, { useEffect, useState } from "react";
import "./MemoryGame.css";

export default function MemoryGame() {
  const [pokemons, setPokemons] = useState([]);
  const [cards, setCards] = useState([]);
  const [firstFlip, setFirst] = useState(null);
  const [lockBoard, setLock] = useState(false);
  const [showConfetti, setConfetti] = useState(false);

  // 1) Carico i dati
  useEffect(() => {
    fetch("/dati/pokemons.json")
      .then((r) => r.json())
      .then((data) => {
        setPokemons(data);
        initGame(data);
      });
  }, []);

  // 2) Inizializza il board
  function initGame(data) {
    const sample = shuffle(data).slice(0, 8);
    const pairs = shuffle(
      [...sample, ...sample].map((p, i) => ({
        uid: i,
        name: p.name,
        image: p.image,
        matched: false,
        flipped: false,
      }))
    );
    setCards(pairs);
    setFirst(null);
    setLock(false);
    setConfetti(false);
  }

  // Fisher–Yates shuffle
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // 3) Click su una carta
  function handleFlip(card) {
    if (lockBoard || card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    if (!firstFlip) {
      setFirst(card);
    } else {
      setLock(true);
      checkForMatch(firstFlip, card, newCards);
    }
  }

  // 4) Controlla match
  function checkForMatch(c1, c2, board) {
    if (c1.name === c2.name) {
      // permanenza match
      setCards(
        board.map((c) => (c.name === c1.name ? { ...c, matched: true } : c))
      );
      resetTurn();
    } else {
      // rigira indietro
      setTimeout(() => {
        setCards(
          board.map((c) =>
            c.uid === c1.uid || c.uid === c2.uid ? { ...c, flipped: false } : c
          )
        );
        resetTurn();
      }, 600);
    }
  }

  function resetTurn() {
    setFirst(null);
    setLock(false);
  }

  // 5) Vittoria: tutte matchate
  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      // accendi coriandoli
      setConfetti(true);
      setTimeout(() => {
        alert("🎉 Complimenti, hai vinto! 🎉");
      }, 100);
    }
  }, [cards]);

  // URL del retro carta (sostituisci col tuo file in public/images)
  const backImageUrl = "/images/card-back.png";

  return (
    <div className="memory-container container my-4 position-relative">
      

      {showConfetti && (
        <div className="confetti-wrapper">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="confetti"
              style={{
                "--random-x": Math.random(),
                "--random-speed": Math.random(),
                "--random-delay": Math.random(),
              }}
            >
              🎉
            </span>
          ))}
        </div>
      )}

      <h1 className="text-center my-5 text-warning">Memory Pokémon</h1>
      <div className="row row-cols-4 g-3 mt-5">
        {cards.map((card) => (
          <div className="col d-flex justify-content-center" key={card.uid}>
            <div
              className={`memory-card ${
                card.flipped || card.matched ? "flipped" : ""
              }`}
              onClick={() => handleFlip(card)}
            >
              <div className="front">
                <img src={card.image} alt={card.name} className="img-fluid" />
              </div>
              <div
                className="back"
                style={{ backgroundImage: `url(${backImageUrl})` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-success mb-3"
        onClick={() => initGame(pokemons)}
      >
        🔄 Restart
      </button>
    </div>
  );
}
