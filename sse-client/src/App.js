import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = (event) => {
        console.log( event.data);

        setFacts((facts) => facts.concat(event.data));
      };

      setListening(true);
    }
  }, []);

  return (
    <table className="stats-table">
      <thead>
      <tr>
        <th>Fact</th>
        <th>Source</th>
      </tr>
      </thead>
      <tbody>
      {
        facts.map((fact, i) =>
          <tr key={i}>
            <td>{'update'}</td>
            <td>{fact}</td>
          </tr>
        )
      }
      </tbody>
    </table>
  );
}

export default App;
