import { useState, useEffect } from "react";
import axios from "axios";

export const usePokeApi = (pokemonUrl, id) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState([]);

  // 3 Get pokemon evolution chain
  const getPokemonEvolutionChain = async (data) => {
    const pokemonEvolutionChainUrl = data.evolution_chain.url;
    let pokemonEvolutionChainResponse;
    try {
      pokemonEvolutionChainResponse = await axios.get(pokemonEvolutionChainUrl);
      setPokemonEvolutionChain(pokemonEvolutionChainResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  // 2 Get pokemon species details and get pokemon evolution chain details i.e url
  const getPokemonSpecies = async (data) => {
    const pokemonSpeciesUrl = data.species.url;
    let pokemonSpeciesResponse;
    try {
      pokemonSpeciesResponse = await axios.get(pokemonSpeciesUrl);
      setPokemonSpecies(pokemonSpeciesResponse);

      if (pokemonSpeciesResponse.status === 200) {
        getPokemonEvolutionChain(pokemonSpeciesResponse.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // 1 Get pokemon details and get pokemon species detaile i.e url
  const getPokemonDetails = async () => {
    let pokemonDetailsResposne;

    try {
      pokemonDetailsResposne = await axios.get(pokemonUrl);
      setPokemonDetails(pokemonDetailsResposne);

      if (pokemonDetailsResposne.status === 200) {
        getPokemonSpecies(pokemonDetailsResposne.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      pokemonUrl += id;
      getPokemonDetails();
    }
  }, []);

  return [pokemonDetails.data, pokemonSpecies.data, pokemonEvolutionChain.data];
};
