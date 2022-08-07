import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokeApi } from "../utils/usePokeApi";
import "./PokemonDetailsStyles.css";
import axios from "axios";
import { PokemonEvolutionChain } from "./PokemonEvolutionChain";

export const PokemonDetails = () => {
  const { id } = useParams();
  const [idd, setIdd] = useState(id);
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
  let pokemonUrll = "";

  // ----------------------------------------------------------------------
  // const [pokemonDetails, pokemonSpecies, pokemonEvolutionChain] = usePokeApi(
  //   pokemonUrl,
  //   id
  // );

  const [pokemonDetails, setPokemonDetails] = useState();
  const [pokemonSpecies, setPokemonSpecies] = useState();
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState();

  // 3 Get pokemon evolution chain
  const getPokemonEvolutionChain = async (data) => {
    const pokemonEvolutionChainUrl = data.evolution_chain.url;
    let pokemonEvolutionChainResponse;
    try {
      pokemonEvolutionChainResponse = await axios.get(pokemonEvolutionChainUrl);
      setPokemonEvolutionChain(pokemonEvolutionChainResponse.data);
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
      setPokemonSpecies(pokemonSpeciesResponse.data);

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
      pokemonDetailsResposne = await axios.get(pokemonUrll);
      setPokemonDetails(pokemonDetailsResposne.data);

      if (pokemonDetailsResposne.status === 200) {
        getPokemonSpecies(pokemonDetailsResposne.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      pokemonUrll = pokemonUrl + id;
      getPokemonDetails();
    }
  }, [idd]);

  // ----------------------------------------------------------------------

  const [bio, setBio] = useState("");
  const [evolutionChainName, setEvolutionChainName] = useState([]);
  const [evolutionChainList, setEvolutionChainList] = useState([]);

  const url = `https://pokeapi.co/api/v2/pokemon/`;

  // For getting the name of each pokemon name in evolution stages
  const createEvolutionChain = () => {
    setEvolutionChainName([]);
    const chain = pokemonEvolutionChain.chain;

    setEvolutionChainName((list) => [...list, chain.species.name]);

    chain.evolves_to.length > 0 &&
      setEvolutionChainName((list) => [
        ...list,
        chain.evolves_to[0].species.name,
      ]);
    chain.evolves_to[0].evolves_to.length > 0 &&
      setEvolutionChainName((list) => [
        ...list,
        chain.evolves_to[0].evolves_to[0].species.name,
      ]);
  };

  // For getting data on each pokemon in evolution chain
  const getEvolutionChainList = async () => {
    setEvolutionChainList([]);
    // console.log("-----------------------------------------------------------");
    let count = evolutionChainName.length;

    try {
      const response0 = await axios.get(url + evolutionChainName[0]);
      if (response0.status === 200) {
        setEvolutionChainList((list) => [...list, response0.data]);
        count--;
        if (count > 0) {
          const response1 = await axios.get(url + evolutionChainName[1]);
          if (response1.status === 200) {
            setEvolutionChainList((list) => [...list, response1.data]);
            count--;
            if (count > 0) {
              const response2 = await axios.get(url + evolutionChainName[2]);
              if (response2.status === 200) {
                setEvolutionChainList((list) => [...list, response2.data]);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error.name);
    }
  };

  // For setting bio details
  const setBioDetails = () => {
    let gotBio = false;
    pokemonSpecies.flavor_text_entries.map(
      (data) =>
        data.language.name == "en" &&
        !gotBio &&
        (setBio(data.flavor_text), (gotBio = true))
    );
  };

  useEffect(() => {
    if (pokemonSpecies) {
      setBioDetails();
    }
  }, [pokemonSpecies, bio]);

  useEffect(() => {
    if (pokemonEvolutionChain) {
      createEvolutionChain();
    }
  }, [pokemonEvolutionChain]);

  useEffect(() => {
    if (pokemonEvolutionChain && evolutionChainName.length > 0) {
      getEvolutionChainList();
    }
  }, [evolutionChainName]);

  useEffect(() => {
    setIdd(id);
    // console.log("ID changed -----------------------", id);
  }, [id]);

  return (
    <div className="details-container">
      {
        console.log(pokemonDetails)
        // console.log(pokemonSpecies),
        // console.log(pokemonEvolutionChain))
        // console.log(evolutionChainList)
      }
      <div className="pokemon-details-container">
        <div className="grid-item thumbnail">
          {pokemonDetails && (
            <div
              className={`thumbnail-enclose ${pokemonDetails.types[0].type.name}`}
            >
              <h2>#{pokemonDetails.id}</h2>

              <img
                src={pokemonDetails.sprites.other.dream_world.front_default}
              />

              <h2>{pokemonDetails.name}</h2>
            </div>
          )}
        </div>
        <div className="grid-item bio">
          {pokemonSpecies && (
            <div>
              <h3>Bio</h3>
              {pokemonDetails && (
                <span>
                  {pokemonDetails.name}
                  {pokemonDetails.types.map((data, index) => (
                    <span key={index}> - {data.type.name} </span>
                  ))}
                  type pokemon.
                </span>
              )}
              <p>{bio && bio}</p>
            </div>
          )}
          {pokemonDetails && pokemonSpecies && (
            <div className="grid-item details-table">
              <div className="grid-detail">Genus</div>
              <div className="grid-detail">
                {pokemonSpecies.genera[7]?.genus}
              </div>
              <div className="grid-detail">Height</div>
              <div className="grid-detail">{pokemonDetails.height}</div>
              <div className="grid-detail">Weight</div>
              <div className="grid-detail">{pokemonDetails.weight}</div>
              <div className="grid-detail">Abilities</div>
              <div>
                {pokemonDetails.abilities.map((data, index) => (
                  <div key={index} className="grid-detail">
                    {data.ability.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3>Training</h3>
          {pokemonDetails && pokemonSpecies && (
            <div className="grid-item training-container">
              <div className="grid-training">Base Exp</div>
              <div className="grid-training">
                {pokemonDetails.base_experience}
              </div>
              <div className="grid-training">Base Hapiness</div>
              <div className="grid-training">
                {pokemonSpecies.base_happiness}
              </div>
              <div className="grid-training">Catch Rate</div>
              <div className="grid-training">{pokemonSpecies.capture_rate}</div>
              <div className="grid-training">Growth Rate</div>
              <div className="grid-training">
                {pokemonSpecies.growth_rate.name}
              </div>
            </div>
          )}
        </div>

        <div className="grid-item evolution-chain">
          <h2>Evolution</h2>

          <div className="evolution-chain-container">
            {evolutionChainList.length > 0 ? (
              // (pokemonList.sort((a, b) => a.id - b.id),
              evolutionChainList.map((pokemon, index) => (
                <PokemonEvolutionChain
                  key={index}
                  id={pokemon.id}
                  name={pokemon.name}
                  sprite={pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                ></PokemonEvolutionChain>
              ))
            ) : (
              <div>Data not found</div>
            )}
          </div>
        </div>
        <div className="grid-item stats">
          <h3>stats</h3>
          <table className="stats-table">
            <thead>
              <tr>
                {pokemonDetails?.stats.map((data, index) => (
                  <td key={index}>{data.stat.name}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {pokemonDetails?.stats.map((data, index) => (
                  <td key={index}>{data.base_stat}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
