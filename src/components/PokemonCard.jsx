import React, { useEffect, useState } from "react";
import { getPokemon } from "../services";
import "../App.css";
import PokemonTabs from "./PokemonTabs";
export default function PokemonCard({ pokemonFetchInfo }) {
  const [pokemon, setPokemon] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const { name } = pokemonFetchInfo;
  useEffect(() => {
    getPokemon(name).then((pokemon) => {
      setPokemon(pokemon);
    });
  }, []);

  // if (!pokemon) {
  //   return <></>;
  // }
  return (
    <>
      <div>
        <div className="pokemonCard" onClick={toggleModal}>
          <img src={pokemon?.photo} alt={pokemon?.name} />
          <p>{pokemon?.name}</p>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <img src={pokemon?.photo} alt={pokemon?.name} />
            <PokemonTabs pokemon={pokemon} />
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
