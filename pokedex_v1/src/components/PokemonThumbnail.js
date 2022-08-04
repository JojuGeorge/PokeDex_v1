import React from "react";

export const PokemonThumbnail = ({ id, name, sprite, type }) => {
  // checks if the sprite url is safe
  const isSafe = (spriteUrl) => {
    if (spriteUrl.startsWith("http://") || spriteUrl.startsWith("https://")) {
      return spriteUrl;
    } else {
      return "https://" + spriteUrl;
    }
  };

  return (
    <div
      className={`pokemon-thumbnail ${type}`}
      onClick={() => console.log("clicked ", name)}
    >
      <div>#{id}</div>
      <img src={isSafe(sprite)} className="sprite" />
      <div>
        <h3>{name}</h3>
        <p>{type}</p>
      </div>
    </div>
  );
};
