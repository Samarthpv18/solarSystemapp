import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [planet, setPlanet] = useState(null);

  const fetchPlanet = async () => {
    if (!number || number < 1 || number > 8) {
      alert("Please enter a number between 1 and 8");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/planet/${number}`);
      setPlanet(res.data);
    } catch (err) {
      console.error("Error fetching planet:", err);
      setPlanet(null);
      alert("Planet not found");
    }
  };

  return (
    <div className="app">
      <h1>🌌 Solar System Explorer</h1>
      <input
        type="number"
        min="1"
        max="8"
        placeholder="Enter number (1-8)"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={fetchPlanet}>Show Planet</button>
      {planet && (
        <div className="planet">
          <h2>{planet.name}</h2>
          <img
            src={`/${planet.image}`}
            alt={planet.name}
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;


