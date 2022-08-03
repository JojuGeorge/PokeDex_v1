import React from "react";

export const PokemonThumbnail = ({ id, name, sprite, type }) => {
  return (
    <div className={`pokemon-thumbnail ${type}`}>
      <div>#{id}</div>
      <img src={sprite} className="sprite" />
      <div>
        <h3>{name}</h3>
        <p>{type}</p>
      </div>
    </div>
  );
};
