// src/fragments/Vetrina.jsx
import React, { useEffect, useState } from 'react';
import Grid  from './Grid';
import Row   from './Row';
import Cell  from './Cell';
import Card  from '../components/Card';

export default function Vetrina() {
  const [citta, setCitta] = useState([]);

  useEffect(() => {
    fetch('/dati/citta.json')
      .then(res => res.json())
      .then(setCitta);
  }, []);

  return (
    <Grid>
      <Row>
        {citta.map((ct, i) => (
          <Cell key={i}>
            <Card 
              titolo={ct.titolo} 
              descrizione={ct.descrizione} 
              imgsrc={ct.imgsrc} 
            />
          </Cell>
        ))}
      </Row>
    </Grid>
  );
}

/*let righe = []  // righe é un array vuoto
    let i = 0;     // i servirà a scorrere l'array citta LO PONGO A ZERO
    while (i < citta.length) {  // fino a che, avanzando i, non supero la lunghezza dell'array citta ... procedi
        
        let riga = citta.slice(i, i + 3); // nella riga i (all'inzio 0) prendo i tre elementi successivi (i, i+1, i+2)
        righe.push(riga);
        i += 3;
    }

 //         righe = [
 //             [citta[0], citta[1], citta[2]], 
 //             [citta[3], citta[4], citta[5]]
 //              [citta[6], citta[7], citta[8]],
 //         ]  
 
Laddove ciascuna citta è del tipo:
{
    "titolo": "Roma",
    "descrizione": "La capitale d'Italia",
    "imgsrc": "/immagini/roma.jpg"
}

quindi ce la possiamo immaginare, per esteso così

righe = [
                    [
                        {
                            "titolo": "Roma",
                            "descrizione": "La capitale d'Italia",
                            "imgsrc": "/immagini/roma.jpg"
                        },
                        {
                            "titolo": "Milano",
                            "descrizione": "La capitale della moda",
                            "imgsrc": "/immagini/milano.jpg"
                        },
                        {
                            "titolo": "Napoli",
                            "descrizione": "La capitale della pizza",
                            "imgsrc": "/immagini/napoli.jpg"
                        }
                    ],
    
    
                    [
                        {
                            "titolo": "Torino",
                            "descrizione": "La capitale dell'auto",
                            "imgsrc": "/immagini/torino.jpg"
                        },
                        {
                            "titolo": "Firenze",
                            "descrizione": "La capitale dell'arte",
                            "imgsrc": "/immagini/firenze.jpg"
                        },
                        {
                            "titolo": "Bologna",
                            "descrizione": "La capitale del cibo",
                            "imgsrc": "/immagini/bologna.jpg"
                        }
                    ]
            ....
                ]



  return (
            <Grid>
               {righe.map((riga, index) => (

                    <Row key={index}>
                        {riga.map((citta, index) => (
                            <Cell key={index}>
                                <Card titolo={citta.titolo} descrizione={citta.descrizione} imgsrc={citta.imgsrc} />
                            </Cell>
                        ))}
                    </Row>
                ))}
                
            </Grid>
            
  )*/
 