import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PokemonThumbnail } from "./PokemonThumbnail";
import "./PokemonStyles.css";

export const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getAllPokemon();
  }, []);

  // Get all pokemon - result contain name and url which has data on that pokemon
  const getAllPokemon = async () => {
    let res = "";
    try {
      res = await axios.get(loadMoreUrl);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    }

    // Based on above obtained url get all data
    const createPokemonList = (data) => {
      data.forEach(async (pokemon) => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          setPokemonList((list) => [...list, response.data]);
        } catch (error) {
          console.log(error.message);
          setErrorMsg(error.message);
        }
      });
    };

    if (res.status === 200) {
      createPokemonList(res.data.results);
      setLoadMoreUrl(res.data.next);
    }
  };

  return (
    <div className="container">
      <h1>PokeDex</h1>
      <div className="pokemon-container">
        <div className="pokemon-thumnail-container">
          {pokemonList.length > 0 ? (
            (pokemonList.sort((a, b) => a.id - b.id),
            pokemonList.map((pokemon, index) => (
              <PokemonThumbnail
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                sprite={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
              ></PokemonThumbnail>
            )))
          ) : (
            <div>Data not found</div>
          )}
        </div>
      </div>
      <button onClick={getAllPokemon}>Load More</button>
    </div>
  );
};
