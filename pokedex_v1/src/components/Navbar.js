import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className="home">
        PokeDex
      </NavLink>
      <div className="menu-container">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <a
          href="https://github.com/JojuGeorge/PokeDex_v1"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </nav>
  );
};
