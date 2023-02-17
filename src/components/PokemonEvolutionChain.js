import React from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonEvolutionChainStyles.css";

export const PokemonEvolutionChain = ({ id, name, sprite, type }) => {
  const navigate = useNavigate();
  // const history = useHistory();
  // checks if the sprite url is safe
  const isSafe = (spriteUrl) => {
    if (spriteUrl.startsWith("http://") || spriteUrl.startsWith("https://")) {
      return spriteUrl;
    } else {
      return "https://" + spriteUrl;
    }
  };

  const showDetails = (id, name) => {
    // console.log(id, name);
    navigate(`/details/${id}`);
  };

  return (
    <div
      className={`evo-chain-thumbnail ${type}`}
      onClick={() => showDetails(id, name)}
    >
      <div>#{id}</div>
      <img src={isSafe(sprite)} className="evo-sprite" />
      <h3>{name}</h3>
      <p className="poke-type">{type}</p>
    </div>
  );
};
