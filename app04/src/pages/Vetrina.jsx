// src/fragments/Vetrina.jsx
import React, { useEffect, useState } from 'react';
import Grid  from '../fragments/Grid';
import Row   from '../fragments/Row';
import Cell  from '../fragments/Cell';
import Card  from '../components/Card';
import Badge from '../components/Badge';

export default function Vetrina() {
  const [prodotti, setProdotti]  = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetch('/dati/prodotti.json')
      .then(res => res.json())
      .then(setProdotti);
  }, []);

  const handleAddGlobal  = () => setTotalCount(c => c + 1);
  const handleLessGlobal = () => setTotalCount(c => c - 1);
   

  return (
    <>
      <div className="container my-3">
        <h5>
          Articoli nel carrello: <span className="badge bg-primary">{totalCount}</span>
        </h5>
      </div>

      <Grid>
        <Row>
          {prodotti.map((p, i) => (
            <Cell key={i}>
              <Card
                titolo={p.nome}
                descrizione={p.descrizione}
                prezzo={p.prezzo}
                imgsrc={p.img}
                onAdd={handleAddGlobal}
                onLess={handleLessGlobal}
              >
                {/* Qui gli dico che se ilprezzo del prodott è meno di 40 euro , allora mostriamo il badge */}
                {p.prezzo < 40 && <Badge text="Offerta" />}  
              </Card>
            </Cell>
          ))}
        </Row>
      </Grid>
    </>
  );
}
