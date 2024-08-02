// src/App.js
import React, { useState } from 'react';
import { LOTERIA_CARDS } from './cards';
import './App.css';

function App() {
  const [numTables, setNumTables] = useState(1);
  const [tables, setTables] = useState([]);
  const [tableColors, setTableColors] = useState([]);

  const generateTables = () => {
    const generatedTables = new Set();
    const colors = [];

    while (generatedTables.size < numTables) {
      const shuffledCards = shuffleArray([...LOTERIA_CARDS]);
      const table = shuffledCards.slice(0, 16);
      const tableKey = table.join(',');

      if (!generatedTables.has(tableKey)) {
        generatedTables.add(tableKey);
        colors.push(getRandomColor());
      }
    }

    setTables(Array.from(generatedTables).map(key => key.split(',')));
    setTableColors(colors);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="App">
      <h1>Generador de Tablas de Lotería</h1>
      <label>
        Número de tablas:
        <input
          type="number"
          value={numTables}
          onChange={(e) => setNumTables(Number(e.target.value))}
          min="1"
          max="100"
        />
      </label>
      <button onClick={generateTables}>Generar Tablas</button>
      <article className="tables-container">
        <div className="tables">
          {tables.map((table, index) => (
            <div
              key={index}
              className="table"
              style={{ backgroundColor: tableColors[index] }}
            >
              {table.map((card, cardIndex) => (
                <div key={cardIndex} className="card">{card}</div>
              ))}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export default App;
