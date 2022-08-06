import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Pokemon } from "./components/Pokemon";
import { PokemonDetails } from "./components/PokemonDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/details/:id" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
