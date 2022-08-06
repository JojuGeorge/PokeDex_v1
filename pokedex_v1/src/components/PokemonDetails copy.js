import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePokeApi } from "../utils/usePokeApi";
import "./PokemonDetailsStyles.css";

export const PokemonDetails = () => {
  const { id } = useParams();

  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonDetails, pokemonSpecies, pokemonEvolutionChain] = usePokeApi(
    pokemonUrl,
    id
  );

  return (
    <div className="details-container">
      <div className="pokemon-details-container">
        <div className="grid-item thumbnail">
          {pokemonDetails && (
            <img src={pokemonDetails.sprites.other.dream_world.front_default} />
          )}
        </div>
        <div className="grid-item bio">
          <p>
            Evolution chains are essentially family trees. They start with the
            lowest stage within a family and d.Evolution chains are essentially
            family trees.
          </p>
          <div className="grid-item details">
            <table>
              <tbody>
                <tr>
                  <td>Genus:1</td>
                  <td>Seed Pokemon</td>
                </tr>
                <tr>
                  <td>Genus:2</td>
                  <td>Seed Pokemon</td>
                </tr>
                <tr>
                  <td>Genus:3</td>
                  <td>Seed Pokemon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid-item training">
          <h3>Training</h3>
          <table>
            <tbody>
              <tr>
                <td>Genus:1</td>
                <td>Seed Pokemon</td>
              </tr>
              <tr>
                <td>Genus:2</td>
                <td>Seed Pokemon</td>
              </tr>
              <tr>
                <td>Genus:3</td>
                <td>Seed Pokemon</td>
              </tr>
              <tr>
                <td>Genus:2</td>
                <td>Seed Pokemon</td>
              </tr>
              <tr>
                <td>Genus:3</td>
                <td>Seed Pokemon</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid-item evolution-chain">
          {pokemonDetails && (
            <div className="img">
              <img
                src={pokemonDetails.sprites.other.dream_world.front_default}
              />
              <img
                src={pokemonDetails.sprites.other.dream_world.front_default}
              />
              <img
                src={pokemonDetails.sprites.other.dream_world.front_default}
              />
            </div>
          )}
        </div>
        <div className="grid-item stats">
          <table>
            <thead>
              <tr>
                <td>ab</td>
                <td>ab</td>
                <td>ab</td>
                <td>ab</td>
                <td>ab</td>
                <td>ab</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11</td>
                <td>22</td>
                <td>11</td>
                <td>22</td>
                <td>11</td>
                <td>22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
